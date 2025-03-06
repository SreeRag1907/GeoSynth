import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import dashboardScreenshot from './dashboard-screenshot.png'; // Import the image
import { Link } from 'react-router-dom';
import { Globe } from '@/components/globe';

export default function Hero() {
  return (
    <section className="container flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-2 py-10 text-center md:py-28">
      <div className="space-y-4">
        <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          Optimize Your Store Placement
          <br />
          with Heatmap Analytics
        </h1>
        <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Leverage advanced heatmap visualization to analyze order density,
          delivery delays, and population demographics. Identify underserved
          areas and make data-driven decisions for new store locations.
        </p>

        <div className="relative flex items-center justify-center overflow-hidden rounded-lg border bg-background p-8 md:p-16 h-[20rem] w-full">
          <Globe className="w-full h-auto max-w-lg" />
          <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
        </div>
      </div>
      <div className="flex gap-4">
        <Link to="/login">
          <Button size="lg">
            Explore Solutions
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="mt-8 w-full">
        <div className="rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Explore Our Heatmap</h2>
          <img
            src={dashboardScreenshot}
            alt="Dashboard Screenshot"
            className="w-[60%] mx-auto h-auto rounded-lg shadow-lg block"
          />
        </div>
      </div>
    </section>
  );
}