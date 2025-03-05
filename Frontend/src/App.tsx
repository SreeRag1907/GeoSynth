import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Layouts
import { AuthLayout } from "@/layouts/AuthLayout";

// Pages
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { NotFound } from "@/pages/NotFound";

import Layout from '@/components/layout';
import LandingPage from '@/pages/landing';
import HeatmapAnalytics from '@/pages/heatmap-analytics';
import CompetitorAnalysis from '@/pages/competitor-analysis';
import LocationExplorer from '@/pages/location-explorer';
import AIInsightsHub from '@/pages/ai-insights';
import DataManagement from '@/pages/data-management';
import ReportsAnalytics from '@/pages/reports';
import Settings from '@/pages/settings';
import Documentation from '@/pages/documentation';
import Support from '@/pages/support';
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <Routes>
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Dashboard Routes */}
            <Route path="/" element={<LandingPage />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/heatmap" element={<HeatmapAnalytics />} />
            <Route path="/competitors" element={<CompetitorAnalysis />} />
            <Route path="/locations" element={<LocationExplorer />} />
            <Route path="/ai-insights" element={<AIInsightsHub />} />
            <Route path="/data" element={<DataManagement />} />
            <Route path="/reports" element={<ReportsAnalytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/support" element={<Support />} />
            </Route>

            {/* Redirect root to login */}
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;