import { useState, useEffect } from "react";
import { Outlet, Navigate, Link, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  BarChart3, 
  LogOut, 
  Menu, 
  Bell 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavItem({ to, icon, label, active, onClick }: NavItemProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
        active ? "bg-accent text-accent-foreground" : "text-muted-foreground"
      )}
      onClick={onClick}
    >
      {icon}
      {label}
    </Link>
  );
}

export function DashboardLayout() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Handle scroll for navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { to: "/dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { to: "/dashboard/analytics", icon: <BarChart3 size={18} />, label: "Analytics" },
    { to: "/dashboard/users", icon: <Users size={18} />, label: "Users" },
    { to: "/dashboard/settings", icon: <Settings size={18} />, label: "Settings" },
  ];

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Navbar */}
      <header 
        className={cn(
          "sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6",
          isScrolled && "shadow-sm"
        )}
      >
        <div className="flex items-center gap-2 md:gap-4 lg:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="px-2 py-6">
                <Link 
                  to="/dashboard" 
                  className="flex items-center gap-2 font-bold text-xl mb-8"
                  onClick={closeMobileMenu}
                >
                  <LayoutDashboard className="h-6 w-6" />
                  <span>App Name</span>
                </Link>
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <NavItem
                      key={item.to}
                      to={item.to}
                      icon={item.icon}
                      label={item.label}
                      active={location.pathname === item.to}
                      onClick={closeMobileMenu}
                    />
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <Link to="/dashboard" className="flex items-center gap-2 font-bold text-lg">
            <LayoutDashboard className="h-5 w-5" />
            <span className="hidden md:inline-block">App Name</span>
          </Link>
        </div>
        
        <div className="hidden lg:flex">
          <Link to="/dashboard" className="flex items-center gap-2 font-bold text-xl">
            <LayoutDashboard className="h-6 w-6" />
            <span>App Name</span>
          </Link>
        </div>
        
        <div className="flex-1" />
        
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive" />
          </Button>
          
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.image} alt={user?.name || "User"} />
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar (desktop only) */}
        <aside className="hidden lg:flex w-64 flex-col border-r bg-card">
          <div className="flex flex-col gap-2 p-4">
            <nav className="grid gap-2 px-2">
              {navItems.map((item) => (
                <NavItem
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  active={location.pathname === item.to}
                />
              ))}
            </nav>
          </div>
        </aside>
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}