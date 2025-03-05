import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart3,
  MapPin,
  Users,
  Clock,
  TrendingUp,
  Building2,
} from 'lucide-react';
import { useState } from 'react';
import GoogleMap from './GoogleMap';

const stats = [
  {
    name: 'Total Orders',
    value: '2,345',
    icon: BarChart3,
    change: '+12.3%',
    changeType: 'positive',
  },
  {
    name: 'Active Stores',
    value: '45',
    icon: Building2,
    change: '+2',
    changeType: 'positive',
  },
  {
    name: 'Customer Reach',
    value: '98.5k',
    icon: Users,
    change: '+15.3%',
    changeType: 'positive',
  },
  {
    name: 'Avg. Delivery Time',
    value: '24.5m',
    icon: Clock,
    change: '-2.3m',
    changeType: 'positive',
  },
];



export default function Dashboard() {

  const [opacity, setOpacity] = useState([0.7]);

  const [heatmapData, setHeatmapData] = useState([
      { lat: 18.5204, lng: 73.8567, value: 0.8 }, // Pune City Center
      { lat: 18.5314, lng: 73.8446, value: 0.6 }, // Koregaon Park
      { lat: 18.5167, lng: 73.8414, value: 0.7 }, // Camp Area
      { lat: 18.5679, lng: 73.9143, value: 0.9 }, // Viman Nagar
      { lat: 18.5018, lng: 73.8636, value: 0.5 }, // Swargate
    ]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Your store placement analytics overview
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.name}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p
                  className={`text-xs ${
                    stat.changeType === 'positive'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Store Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Chart will be implemented here
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Hot Zones</CardTitle>
          </CardHeader>
          <CardContent>
                    <GoogleMap heatmapData={heatmapData} opacity={opacity[0]} />
                    </CardContent>
        </Card>
      </div>
    </div>
  );
}