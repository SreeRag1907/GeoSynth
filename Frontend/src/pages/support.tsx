import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Support() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Support</h2>
        <p className="text-muted-foreground">
          Get help and support for GeoSynth
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Email Support</p>
                  <p className="text-sm text-muted-foreground">
                    Get help via email
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Live Chat</p>
                  <p className="text-sm text-muted-foreground">
                    Chat with our support team
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>FAQs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Common Questions</p>
                  <p className="text-sm text-muted-foreground">
                    Find answers to common questions
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Troubleshooting</p>
                  <p className="text-sm text-muted-foreground">
                    Solve common issues
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