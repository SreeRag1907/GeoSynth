import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export function AuthLayout() {
  const { isAuthenticated } = useAuthStore();

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
      <footer className="py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
}