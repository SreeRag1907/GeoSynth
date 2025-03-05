import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

export default function UploadPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Upload Data</h2>
        <p className="text-muted-foreground">
          Upload your data files for analysis
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Order Density Data</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="w-full h-32 border-2 border-dashed rounded-lg flex items-center justify-center">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Choose File
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Upload CSV file with order data
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivery Delays Data</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="w-full h-32 border-2 border-dashed rounded-lg flex items-center justify-center">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Choose File
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Upload CSV file with delivery timing data
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Demographics Data</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="w-full h-32 border-2 border-dashed rounded-lg flex items-center justify-center">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Choose File
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Upload CSV file with population data
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}