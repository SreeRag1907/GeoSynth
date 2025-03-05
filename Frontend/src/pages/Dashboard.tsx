import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart3,
  Users,
  Clock,
  Building2,
  User,
  LogOut,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleMap from './GoogleMap';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import banerMonthlyAnalysis from './data/baner_monthly_analysis.json'; // Import the JSON file
import hinjewadiMonthlyAnalysis from './data/hinjewadi_monthly_analysis.json'; // Import the JSON file 
import koregaonMonthlyAnalysis from './data/koregaon_park_monthly_analysis.json'; // Import the JSON file
import kothrudMonthlyAnalysis from './data/kothrud_monthly_analysis.json'; // Import the JSON file
import vimananagarMonthlyAnalysis from './data/viman_nagar_monthly_analysis.json'; // Import the JSON file

const cityNames = ["Baner", "Hinjewadi", "Koregaon Park", "Kothrud", "Viman Nagar"]; // Add your city names here

interface Stat {
  name: string;
  value: string;
  icon: React.ComponentType<any>;
  change: string;
  changeType: 'positive' | 'negative';
}

export default function Dashboard() {
  const [selectedCity, setSelectedCity] = useState<string>("Baner");
  const [stats, setStats] = useState<Stat[]>([]);
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName'); // Retrieve the user's name from local storage

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
  };

  const getSelectedCityData = () => {
    switch (selectedCity) {
      case "Baner":
        return banerMonthlyAnalysis;
      case "Hinjewadi":
        return hinjewadiMonthlyAnalysis;
      case "Koregaon Park":
        return koregaonMonthlyAnalysis;
      case "Kothrud":
        return kothrudMonthlyAnalysis;
      case "Viman Nagar":
        return vimananagarMonthlyAnalysis;
      default:
        return [];
    }
  };

  const calculateStats = (data: any[]) => {
    const totalOrders = data.reduce((sum: number, item: any) => sum + item["Orders per Day"], 0);
    const activeStores = data.length;
    const customerReach = data.reduce((sum: number, item: any) => sum + item["Orders per Day"], 0); // Assuming customer reach is the total orders
    const avgDeliveryTime = (data.reduce((sum: number, item: any) => sum + item["Average Delivery Time (minutes)"], 0) / data.length).toFixed(1);

    return [
      {
        name: 'Total Orders',
        value: totalOrders.toLocaleString(),
        icon: BarChart3,
        change: '+12.3%', // Placeholder value
        changeType: 'positive', // Placeholder value
      },
      {
        name: 'Active Stores',
        value: activeStores.toString(),
        icon: Building2,
        change: '+2', // Placeholder value
        changeType: 'positive', // Placeholder value
      },
      {
        name: 'Customer Reach',
        value: customerReach.toLocaleString(),
        icon: Users,
        change: '+15.3%', // Placeholder value
        changeType: 'positive', // Placeholder value
      },
      {
        name: 'Avg. Delivery Time',
        value: `${avgDeliveryTime}m`,
        icon: Clock,
        change: '-2.3m', // Placeholder value
        changeType: 'positive', // Placeholder value
      },
    ];
  };

  useEffect(() => {
    const cityData = getSelectedCityData();
    const calculatedStats = calculateStats(cityData);
    setStats(calculatedStats);
  }, [selectedCity]);

  const selectedCityData = getSelectedCityData();

  const handleLogout = () => {
    // Clear authentication state and local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    navigate('/');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Your store placement analytics overview
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <User className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium">{userName}</span> {/* Display the user's name */}
          </div>
          <button onClick={handleLogout} className="flex items-center space-x-2 text-red-500">
            <LogOut className="h-6 w-6" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
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
            <Select onValueChange={handleCityChange} defaultValue="Baner">
              <SelectTrigger>
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                {cityNames.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={selectedCityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Orders per Day" stroke="#8884d8" />
                <Line type="monotone" dataKey="Orders Delayed per Day" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Total Revenue Generated (INR)" stroke="#ffc658" />
                <Line type="monotone" dataKey="Average Delivery Time (minutes)" stroke="#ff7300" />
                <Line type="monotone" dataKey="Active Delivery Partners" stroke="#387908" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Hot Zones</CardTitle>
          </CardHeader>
          <CardContent>
            <GoogleMap />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}