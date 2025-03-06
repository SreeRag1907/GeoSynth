import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';

const GOOGLE_API_KEY = 'AIzaSyAI_O0v5aCYbOeTriXuQjxgglTcQZNce8w'; // Replace with your Google Maps API key

declare global {
  interface Window {
    initMap: () => void;
  }
}

interface Customer {
  location: {
    coordinates: [number, number];
  };
  name: string;
  orders: any[];
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

interface Store {
  Latitude: number;
  Longitude: number;
  'Store Name': string;
}

export default function GoogleMap({ opacity }: { opacity: number }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const heatmapLayer = useRef<google.maps.visualization.HeatmapLayer | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [predictedStoreLocations, setPredictedStoreLocations] = useState<google.maps.LatLng[]>([]);
  const [storeData, setStoreData] = useState<Store[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/get-customers');
        const res: Customer[] = response.data.data; // Access the data property of the response
        setCustomers(res);
        console.log(res);
        initMap(res);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    const fetchPredictedLocations = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/predict_stores');
        const responseData = response.data;
        const predictedStoresArray = responseData.predicted_stores;
        const predictedLatLng = predictedStoresArray.map(loc => new google.maps.LatLng(loc.latitude, loc.longitude));
        setPredictedStoreLocations(predictedLatLng);
      } catch (error) {
        console.error("Error fetching predicted store locations:", error);
        setPredictedStoreLocations([]);
      }
    };

    const fetchStoreData = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/get-stores');
        const res: Store[] = response.data.data; // Access the data property of the response
        setStoreData(res);
        console.log(res);
      } catch (error) {
        console.error('Error fetching store data:', error);
      }
    };

    const initMap = (res: Customer[]) => {
      if (mapRef.current && !mapInstance.current) {
        mapInstance.current = new google.maps.Map(mapRef.current, {
          zoom: 12,
          center: { lat: 18.5204, lng: 73.8567 }, // Default center (Pune)
          mapTypeId: 'roadmap',
        });

        heatmapLayer.current = new google.maps.visualization.HeatmapLayer({
          data: res.map((point) => new google.maps.LatLng(point.location.coordinates[1], point.location.coordinates[0])),
          opacity: 0.6, // Adjusted opacity for more prominent red marks
          radius: 50, // Increased radius for larger heatmap points
          dissipating: true,
        });

        heatmapLayer.current.setMap(mapInstance.current);

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

        storeData.forEach((item) => {
          new google.maps.Marker({
            position: { lat: item.Latitude, lng: item.Longitude },
            map: mapInstance.current,
            title: item['Store Name'],
            icon: {
              url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', // Green marker for stores
              scaledSize: new google.maps.Size(32, 32),
            },
          });

          new google.maps.Circle({
            map: mapInstance.current,
            center: { lat: item.Latitude, lng: item.Longitude },
            radius: 1000, // 1 km radius
            strokeColor: '#0000FF',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#0000FF',
            fillOpacity: 0.1,
          });
        });
      }
    };

    if (!window.google) {
      window.initMap = () => {
        fetchCustomers();
        fetchPredictedLocations();
        fetchStoreData();
      };
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=visualization&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);
    } else {
      fetchCustomers();
      fetchPredictedLocations();
      fetchStoreData();
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