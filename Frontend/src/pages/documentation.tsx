import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Documentation() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Documentation</h2>
        <p className="text-muted-foreground">
          Learn how to use GeoSynth effectively to optimize your store placement with advanced heatmap analytics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Quick Start Guide</p>
                  <p className="text-sm text-muted-foreground">
                    Learn the basics of using GeoSynth to analyze store placement and visualize data with heatmaps.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Data Upload Guide</p>
                  <p className="text-sm text-muted-foreground">
                    Learn how to upload and manage your data to generate accurate heatmaps and insights.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Advanced Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">API Documentation</p>
                  <p className="text-sm text-muted-foreground">
                    Learn about our API endpoints and how to integrate GeoSynth with your existing systems.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Best Practices</p>
                  <p className="text-sm text-muted-foreground">
                    Tips and tricks for optimizing store placement and making data-driven decisions.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Heatmap Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Understanding Heatmaps</p>
                  <p className="text-sm text-muted-foreground">
                    Learn how to interpret heatmaps and use them to identify high and low-density areas.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Customizing Heatmaps</p>
                  <p className="text-sm text-muted-foreground">
                    Learn how to customize heatmaps to highlight specific data points and trends.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Store Placement Strategies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Identifying Underserved Areas</p>
                  <p className="text-sm text-muted-foreground">
                    Learn how to use GeoSynth to identify underserved areas and optimize store placement.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Optimizing Delivery Routes</p>
                  <p className="text-sm text-muted-foreground">
                    Learn how to optimize delivery routes to reduce delivery times and improve customer satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}