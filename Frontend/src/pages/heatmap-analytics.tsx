import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { MapPin } from 'lucide-react';

import GoogleMap from './GoogleMap';

export default function HeatmapAnalytics() {
  const [opacity, setOpacity] = useState([0.7]);

  
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
              <div className="grid gap-4 md:grid-cols-3">
                {['High Density Areas', 'Growth Zones', 'Underserved Regions'].map((pattern) => (
                  <Card key={pattern}>
                    <CardHeader>
                      <CardTitle className="text-sm">{pattern}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Analysis details for {pattern.toLowerCase()} will be shown here.
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="trends">
              Trend analysis will be implemented here
            </TabsContent>
            <TabsContent value="anomalies">
              Anomaly detection results will be implemented here
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}