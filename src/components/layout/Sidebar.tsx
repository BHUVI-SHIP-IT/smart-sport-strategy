
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart, 
  Users, 
  Calendar, 
  Activity, 
  Heart, 
  Briefcase, 
  Settings, 
  Home,
  Trophy
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const sidebarItems = [
    {
      title: 'Dashboard',
      icon: <Home className="mr-2 h-4 w-4" />,
      href: '/'
    },
    {
      title: 'Athletes',
      icon: <Users className="mr-2 h-4 w-4" />,
      href: '/athletes'
    },
    {
      title: 'Performance',
      icon: <BarChart className="mr-2 h-4 w-4" />,
      href: '/performance'
    },
    {
      title: 'Health',
      icon: <Heart className="mr-2 h-4 w-4" />,
      href: '/health'
    },
    {
      title: 'Calendar',
      icon: <Calendar className="mr-2 h-4 w-4" />,
      href: '/calendar'
    },
    {
      title: 'Training',
      icon: <Activity className="mr-2 h-4 w-4" />,
      href: '/training'
    },
    {
      title: 'Career',
      icon: <Briefcase className="mr-2 h-4 w-4" />,
      href: '/career'
    },
    {
      title: 'Achievements',
      icon: <Trophy className="mr-2 h-4 w-4" />,
      href: '/achievements'
    },
    {
      title: 'Settings',
      icon: <Settings className="mr-2 h-4 w-4" />,
      href: '/settings'
    }
  ];

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            SportStrategy
          </h2>
          <div className="space-y-1">
            <ScrollArea>
              {sidebarItems.map((item) => (
                <Button
                  key={item.href}
                  variant={isActive(item.href) ? "secondary" : "ghost"}
                  size="sm"
                  className={cn(
                    "w-full justify-start",
                    isActive(item.href) ? "bg-secondary font-medium" : ""
                  )}
                  asChild
                >
                  <Link to={item.href}>
                    {item.icon}
                    {item.title}
                  </Link>
                </Button>
              ))}
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
