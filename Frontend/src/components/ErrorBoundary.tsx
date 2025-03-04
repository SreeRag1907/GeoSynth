import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
          <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-destructive">Something went wrong</h2>
            <p className="text-card-foreground">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <div className="p-4 bg-muted rounded-md overflow-auto max-h-40 text-left">
              <pre className="text-xs">{this.state.error?.stack}</pre>
            </div>
            <Button 
              onClick={() => window.location.reload()}
              variant="default"
            >
              Reload Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}