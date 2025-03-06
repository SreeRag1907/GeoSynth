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

export default function GoogleMap({ opacity }: { opacity: number }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const heatmapLayer = useRef<google.maps.visualization.HeatmapLayer | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);

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
      }
    };

    if (!window.google) {
      window.initMap = () => fetchCustomers();
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=visualization&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);
    } else {
      fetchCustomers();
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