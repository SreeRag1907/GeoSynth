import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DataManagement() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Data Management</h2>
        <p className="text-muted-foreground">
          Upload and manage your data sources
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Data Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Order Data</p>
                  <p className="text-sm text-muted-foreground">
                    Upload and manage order data
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Customer Data</p>
                  <p className="text-sm text-muted-foreground">
                    Upload and manage customer data
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Location Data</p>
                  <p className="text-sm text-muted-foreground">
                    Upload and manage location data
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Data Validation</p>
                  <p className="text-sm text-muted-foreground">
                    Validate data quality and completeness
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Data Cleaning</p>
                  <p className="text-sm text-muted-foreground">
                    Clean and standardize data
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