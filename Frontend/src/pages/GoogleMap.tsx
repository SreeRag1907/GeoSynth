import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import locationData from './data.json'; // Import the JSON file
import storeData from './data1.json'; // Store data

const GOOGLE_API_KEY = 'AIzaSyAI_O0v5aCYbOeTriXuQjxgglTcQZNce8w'; // Replace with your Google Maps API key

export default function GoogleMap({ opacity }: { opacity: number }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const heatmapLayer = useRef<google.maps.visualization.HeatmapLayer | null>(null);

  useEffect(() => {
    const heatmapData = locationData.map((item) => ({
      lat: item["Location (Latitude)"],
      lng: item["Location (Longitude)"],
    }));

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
              scaledSize: new google.maps.Size(32, 32), // Scale size of the icon
            },
          });

          const circle = new google.maps.Circle({
            map: mapInstance.current,
            center: { lat: item.Latitude, lng: item.Longitude },
            radius: 1000, // 5 km radius
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
            infoWindow.open(mapInstance.current, marker);
          });

          marker.addListener('mouseout', () => {
            infoWindow.close();
          });
        });
      }
    };

    if (!window.google) {
      window.initMap = initMap;
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=visualization&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      if (heatmapLayer.current) {
        heatmapLayer.current.setMap(null);
      }
      mapInstance.current = null;
    };
  }, [opacity]);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Google Maps Heatmap</CardTitle>
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