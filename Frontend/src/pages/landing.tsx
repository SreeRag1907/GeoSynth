import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Brain, BarChart3, Store } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link to="/" className="flex items-center justify-center">
          <MapPin className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold">GeoSynth</span>
        </Link>
        <nav className="ml-auto flex gap-4">
          <Link to="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  AI-Powered Location Intelligence Platform
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Make data-driven decisions for your retail locations using advanced heatmap analytics and AI-powered recommendations.
                </p>
              </div>
              <Link to="/dashboard">
                <Button size="lg" className="mt-4">Get Started</Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-4 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <MapPin className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Location Analytics</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Advanced heatmaps and location intelligence for optimal store placement.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Brain className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">AI-Powered Insights</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Machine learning algorithms for predictive analytics and recommendations.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <BarChart3 className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Advanced Analytics</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Comprehensive reports and insights for data-driven decisions.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Store className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Competitor Analysis</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Stay ahead with detailed competitor insights and market analysis.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 GeoSynth. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="/docs">
            Documentation
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="/support">
            Support
          </Link>
        </nav>
      </footer>
    </div>
  );
}