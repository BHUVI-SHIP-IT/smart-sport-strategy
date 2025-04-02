
import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  
  // Only show the toggle after mounting to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  
  const isDark = theme === "dark";
  const tooltipText = isDark ? "Switch to light mode" : "Switch to dark mode";
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
            className="border-primary/20 transition-all"
          >
            <Sun className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all ${isDark ? 'opacity-0' : 'opacity-100'}`} />
            <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${isDark ? 'opacity-100' : 'opacity-0'}`} />
            <span className="sr-only">{tooltipText}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
