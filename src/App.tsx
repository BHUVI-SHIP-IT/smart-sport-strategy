
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AIProvider } from "./context/AIContext";
import Dashboard from "./pages/Dashboard";
import Athletes from "./pages/Athletes";
import Performance from "./pages/Performance";
import Health from "./pages/Health";
import Calendar from "./pages/Calendar";
import Training from "./pages/Training";
import Career from "./pages/Career";
import Achievements from "./pages/Achievements";
import Settings from "./pages/Settings";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AIProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/athletes" element={<Athletes />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/health" element={<Health />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/training" element={<Training />} />
            <Route path="/career" element={<Career />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AIProvider>
  </QueryClientProvider>
);

export default App;
