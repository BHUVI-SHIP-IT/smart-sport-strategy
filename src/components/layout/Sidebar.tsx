import React from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/useMobile";
import {
  LayoutDashboard,
  Calendar,
  Users,
  LineChart,
  Heart,
  Dumbbell,
  Award,
  Briefcase,
  MessagesSquare,
  Settings,
  PanelLeft,
} from "lucide-react";

interface SideNavLinkProps {
  to: string;
  expanded: boolean;
  Icon: React.ComponentType<any>;
  label: string;
  active: boolean;
}

function SideNavLink({ to, expanded, Icon, label, active }: SideNavLinkProps) {
  return (
    <li>
      <Button
        variant="ghost"
        className={cn(
          "justify-start rounded-md hover:bg-secondary/50",
          expanded ? "pl-3.5" : "pl-2",
          active && "bg-secondary/50"
        )}
        asChild
      >
        <a href={to} className="w-full flex items-center gap-2">
          <Icon className="h-4 w-4" />
          {expanded && <span>{label}</span>}
        </a>
      </Button>
    </li>
  );
}

export function Sidebar() {
  const location = useLocation();
  const isMobile = useMobile();
  const [expanded, setExpanded] = React.useState(true);

  React.useEffect(() => {
    if (isMobile) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <aside className={cn(
      "bg-background border-r border-border transition-all duration-300 ease-in-out",
      expanded ? "w-64" : "w-[70px]",
      isMobile && (expanded ? "translate-x-0" : "-translate-x-full w-[280px] fixed top-[60px] bottom-0 shadow-xl z-40")
    )}>
      <div className="flex flex-col h-full">
        <div className="p-4 flex justify-between items-center">
          {expanded && <h2 className="font-bold text-xl">AthletePro</h2>}
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              <PanelLeft className="h-4 w-4" />
            </Button>
          )}
        </div>
        <nav className="space-y-1 px-2 flex-1 overflow-y-auto py-2">
          <SideNavLink to="/dashboard" expanded={expanded} Icon={LayoutDashboard} label="Dashboard" active={location.pathname === '/dashboard'} />
          <SideNavLink to="/athletes" expanded={expanded} Icon={Users} label="Athletes" active={location.pathname === '/athletes' || location.pathname.startsWith('/athlete/')} />
          <SideNavLink to="/calendar" expanded={expanded} Icon={Calendar} label="Calendar" active={location.pathname === '/calendar'} />
          <SideNavLink to="/performance" expanded={expanded} Icon={LineChart} label="Performance" active={location.pathname === '/performance'} />
          <SideNavLink to="/health" expanded={expanded} Icon={Heart} label="Health" active={location.pathname === '/health'} />
          <SideNavLink to="/training" expanded={expanded} Icon={Dumbbell} label="Training" active={location.pathname === '/training'} />
          <SideNavLink to="/achievements" expanded={expanded} Icon={Award} label="Achievements" active={location.pathname === '/achievements'} />
          <SideNavLink to="/career" expanded={expanded} Icon={Briefcase} label="Career" active={location.pathname === '/career'} />
          <SideNavLink to="/chat" expanded={expanded} Icon={MessagesSquare} label="Chat" active={location.pathname === '/chat'} />
        </nav>
        <div className="border-t border-border mt-auto">
          <nav className="space-y-1 px-2 py-2">
            <SideNavLink to="/settings" expanded={expanded} Icon={Settings} label="Settings" active={location.pathname === '/settings'} />
          </nav>
        </div>
      </div>
    </aside>
  );
}
