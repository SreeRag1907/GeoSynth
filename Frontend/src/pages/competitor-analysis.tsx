import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CompetitorAnalysis() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Competitor Analysis</h2>
        <p className="text-muted-foreground">
          Analyze competitor locations and market share
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Competitor Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
              Interactive competitor map will be implemented here
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market Share</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] flex items-center justify-center text-muted-foreground">
              Market share chart will be implemented here
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}