import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { MapPin } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

import GoogleMap from './GoogleMap';

export default function HeatmapAnalytics() {
  const [opacity, setOpacity] = useState([0.7]);

  const highDensityAreas = [
    { name: 'Mumbai', orders: 4000 },
    { name: 'Delhi', orders: 3500 },
    { name: 'Bangalore', orders: 3000 },
  ];

  const growthZones = [
    { name: 'Pune', growth: 20 },
    { name: 'Hyderabad', growth: 25 },
    { name: 'Chennai', growth: 15 },
  ];

  const underservedRegions = [
    { name: 'Nagpur', value: 10 },
    { name: 'Jaipur', value: 15 },
    { name: 'Lucknow', value: 20 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Heatmap Analytics</h2>
        <p className="text-muted-foreground">
          Analyze spatial patterns with interactive heatmaps
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-3">
          <GoogleMap opacity={opacity[0]} />
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Layer Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Heatmap Opacity</label>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(opacity[0] * 100)}%
                  </span>
                </div>
                <Slider
                  value={opacity}
                  onValueChange={setOpacity}
                  max={1}
                  step={0.1}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hotspots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((spot) => (
                  <div
                    key={spot}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Hotspot {spot}</p>
                        <p className="text-xs text-muted-foreground">
                          Intensity: {90 - spot * 10}%
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analysis Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="patterns">
            <TabsList>
              <TabsTrigger value="patterns">Patterns</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
            </TabsList>
            <TabsContent value="patterns" className="space-y-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={highDensityAreas}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="trends" className="space-y-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={growthZones}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="growth" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="anomalies" className="space-y-4">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={underservedRegions}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {underservedRegions.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}