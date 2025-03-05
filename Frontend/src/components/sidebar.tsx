import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  MapPin,
  Settings,
  Upload,
  Brain,
  FileText,
  Store,
  MessageSquare,
  BarChart3,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Heatmap Analytics', href: '/heatmap', icon: MapPin },
  { name: 'AI Insights Hub', href: '/ai-insights', icon: Brain },
  { name: 'Data Management', href: '/data', icon: Upload },
  { name: 'Reports & Analytics', href: '/reports', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Documentation', href: '/docs', icon: FileText },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4 dark:bg-gray-950 dark:border-gray-800">
        <div className="flex h-16 shrink-0 items-center">
          <Link to="/" className="flex items-center">
            <MapPin className="h-6 w-6 text-primary" />
            <span className="ml-2 text-xl font-bold">GeoSynth</span>
          </Link>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          location.pathname === item.href
                            ? 'bg-gray-50 text-primary dark:bg-gray-800'
                            : 'text-gray-700 hover:text-primary hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}
                      >
                        <Icon
                          className={cn(
                            location.pathname === item.href
                              ? 'text-primary'
                              : 'text-gray-400 group-hover:text-primary dark:text-gray-500',
                            'h-6 w-6 shrink-0'
                          )}
                        />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}