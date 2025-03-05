import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import locationData from './data.json'; // Import the JSON file

const GOOGLE_API_KEY = 'AIzaSyAI_O0v5aCYbOeTriXuQjxgglTcQZNce8w'; // Replace with your Google Maps API key

export default function GoogleMap({ opacity }: { opacity: number }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const heatmapLayer = useRef<google.maps.visualization.HeatmapLayer | null>(null);

  useEffect(() => {
    const heatmapData = locationData.map((item) => ({
      lat: item.latitude,
      lng: item.longitude,
      value: item.foot_traffic, // Optional weight for intensity
    }));

    const initMap = () => {
      if (mapRef.current && !mapInstance.current) {
        mapInstance.current = new google.maps.Map(mapRef.current, {
          zoom: 5,
          center: { lat: 20.5937, lng: 78.9629 }, // Default center (India)
          mapTypeId: 'roadmap',
        });

        heatmapLayer.current = new google.maps.visualization.HeatmapLayer({
          data: heatmapData.map((point) => new google.maps.LatLng(point.lat, point.lng)),
          opacity,
          radius: 30,
          dissipating: true,
        });

        heatmapLayer.current.setMap(mapInstance.current);

        // Add Store Markers and Circles
        locationData.forEach((item) => {
          const marker = new google.maps.Marker({
            position: { lat: item.latitude, lng: item.longitude },
            map: mapInstance.current,
            title: `Store ${item.store_id}`,
          });

          const circle = new google.maps.Circle({
            map: mapInstance.current,
            center: { lat: item.latitude, lng: item.longitude },
            radius: 500, // 5 km radius
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
