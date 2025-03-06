import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import locationData from '../pages/data.json'; // Corrected path to locationData
import storeData from './data1.json'; // Store data

const GOOGLE_API_KEY = 'AIzaSyAI_O0v5aCYbOeTriXuQjxgglTcQZNce8w'; // **REPLACE WITH YOUR ACTUAL API KEY**

export default function GoogleMap({ opacity }: { opacity: number }) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<google.maps.Map | null>(null);
    const heatmapLayer = useRef<google.maps.visualization.HeatmapLayer | null>(null);
    const [predictedStoreLocations, setPredictedStoreLocations] = useState<google.maps.LatLng[]>([]);

    useEffect(() => {
        const heatmapData = locationData.map((item) => ({
            lat: item["Location (Latitude)"],
            lng: item["Location (Longitude)"],
        }));

        const fetchPredictedLocations = async () => { // Function to fetch data from API
            try {
                const response = await fetch('http://127.0.0.1:5000/api/predict_stores'); // API endpoint URL
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const responseData = await response.json(); // Get the JSON response object
                console.log("Parsed JSON data:", responseData); // Log the entire response

                // **Correctly access the predicted_stores array from the response object**
                const predictedStoresArray = responseData.predicted_stores;
                console.log("Predicted stores array:", predictedStoresArray); // Log the array

                // **Now map over the predictedStoresArray (the array, not the whole object)**
                const predictedLatLng = predictedStoresArray.map(loc => new google.maps.LatLng(loc.latitude, loc.longitude));
                setPredictedStoreLocations(predictedLatLng);

            } catch (error) {
                console.error("Error fetching predicted store locations:", error);
                setPredictedStoreLocations([]);
            }
        };


        const initMap = () => {
            if (mapRef.current && !mapInstance.current) {
                mapInstance.current = new google.maps.Map(mapRef.current, {
                    zoom: 12,
                    center: { lat: 18.5204, lng: 73.8567 }, // Default center (Pune)
                    mapTypeId: 'roadmap',
                });

                heatmapLayer.current = new google.maps.visualization.HeatmapLayer({
                    data: heatmapData.map((point) => new google.maps.LatLng(point.lat, point.lng)),
                    opacity,
                    radius: 30,
                    dissipating: true,
                });

                heatmapLayer.current.setMap(mapInstance.current);

                storeData.forEach((item) => {
                    const marker = new google.maps.Marker({
                        position: { lat: item.Latitude, lng: item.Longitude },
                        map: mapInstance.current,
                        title: item['Store Name'],
                        icon: {
                            url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', // URL to the location icon
                            scaledSize: new google.maps.Size(32, 32),
                        },
                    });

                    const circle = new google.maps.Circle({
                        map: mapInstance.current,
                        center: { lat: item.Latitude, lng: item.Longitude },
                        radius: 1000, // 1 km radius
                        strokeColor: '#0000FF',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#0000FF',
                        fillOpacity: 0.1,
                    });

                    const infoWindow = new google.maps.InfoWindow({
                        content: `<div style="color: black;">
                                            <h3>${item['Store Name']}</h3>
                                            <p>Orders per Day: ${item['Orders per Day']}</p>
                                            <p>Orders Delayed per Day: ${item['Orders Delayed per Day']}</p>
                                            <p>Average Delivery Time: ${item['Average Delivery Time (minutes)']} minutes</p>
                                            <p>Active Delivery Partners: ${item['Active Delivery Partners']}</p>
                                        </div>
                                        <style>
                                            .gm-style-iw-c {
                                                display: none;
                                            }
                                        </style>`
                    });

                    marker.addListener('mouseover', () => {
                        infoWindow.open({
                            anchor: marker,
                            map: mapInstance.current,
                        });
                    });

                    marker.addListener('mouseout', () => {
                        infoWindow.close();
                    });
                });

                //  Display Predicted Store Locations from State (API Data)
                predictedStoreLocations.forEach(location => { // Now using predictedStoreLocations from state
                    new google.maps.Marker({
                        position: location,
                        map: mapInstance.current,
                        title: 'Predicted Store Location',
                        icon: {
                            url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png', // Different icon for predicted locations
                            scaledSize: new google.maps.Size(32, 32),
                        },
                    });
                });
            }
        };

        if (!window.google) {
            (window as any).initMap = initMap;
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=visualization&callback=initMap`;
            script.async = true;
            document.head.appendChild(script);
        } else {
            initMap();
        }

        fetchPredictedLocations(); // Call fetchPredictedLocations when component mounts (or opacity changes)

        return () => {
            if (heatmapLayer.current) {
                heatmapLayer.current.setMap(null);
            }
            mapInstance.current = null;
        };
    }, [opacity]); // opacity dependency remains

    useEffect(() => { // Separate useEffect to handle predictedStoreLocations state changes and marker updates
        if (mapInstance.current && predictedStoreLocations.length > 0) {
            // Clear existing predicted location markers (if needed, based on your desired behavior)
            // ... (Code to clear existing markers if you want to re-render markers every time locations update) ...

            // Display Predicted Store Locations from State (API Data) - Moved here
            predictedStoreLocations.forEach(location => {
                new google.maps.Marker({
                    position: location,
                    map: mapInstance.current,
                    title: 'Predicted Store Location',
                    icon: {
                        url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
                        scaledSize: new google.maps.Size(32, 32),
                    },
                });
            });
        }
    }, [predictedStoreLocations, mapInstance.current]); // React to changes in predictedStoreLocations and mapInstance


    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Google Maps Heatmap with Store and Predicted Locations</CardTitle>
                </CardHeader>
                <CardContent>
                    <div
                        ref={mapRef}
                        className="h-[600px] rounded-lg border-2 border-dashed"
                    ></div>
                </CardContent>
            </Card>
        </div>
    );
}