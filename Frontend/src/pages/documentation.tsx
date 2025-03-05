import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Documentation() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Documentation</h2>
        <p className="text-muted-foreground">
          Learn how to use GeoSynth effectively
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
                    Learn the basics of using GeoSynth
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Data Upload Guide</p>
                  <p className="text-sm text-muted-foreground">
                    Learn how to upload and manage your data
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
                    Learn about our API endpoints and integration
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Best Practices</p>
                  <p className="text-sm text-muted-foreground">
                    Tips and tricks for optimal usage
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