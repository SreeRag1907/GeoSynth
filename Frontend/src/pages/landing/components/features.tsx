import { Brain, MapPin, Users, Clock, Shield, TrendingUp } from "lucide-react";

const features = [
  {
    name: "AI-Powered Analytics",
    description: "Harness the power of machine learning to derive actionable insights from your data.",
    icon: Brain,
  },
  {
    name: "Heatmap Visualization",
    description: "Visualize order density, delivery delays, and population demographics with advanced heatmaps.",
    icon: MapPin,
  },
  {
    name: "Customer Reach",
    description: "Identify underserved areas and optimize your store placement to reach more customers.",
    icon: Users,
  },
  {
    name: "Performance Tracking",
    description: "Monitor and analyze key performance metrics to ensure your business is running efficiently.",
    icon: TrendingUp,
  },
  {
    name: "Delivery Time Optimization",
    description: "Reduce delivery times and improve customer satisfaction with optimized delivery routes.",
    icon: Clock,
  },
  {
    name: "Enterprise-Grade Security",
    description: "State-of-the-art security measures to protect your most valuable assets.",
    icon: Shield,
  },
];

export default function Features() {
  return (
    <section className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Transform Your Business with Heatmap Analytics</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Discover how GeoSynth can help you optimize store placement and improve performance with our innovative technologies.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.name} className="relative overflow-hidden rounded-lg border bg-background p-8">
            <div className="flex items-center gap-4">
              <feature.icon className="h-8 w-8 text-primary" />
              <h3 className="font-bold">{feature.name}</h3>
            </div>
            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}