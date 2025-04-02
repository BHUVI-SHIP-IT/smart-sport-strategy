
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AIProvider } from "./context/AIContext";
import { AuthProvider } from "./context/AuthContext";
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
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";

const queryClient = new QueryClient();

function App() {
  // Check local storage for theme when app loads
  useEffect(() => {
    const savedTheme = localStorage.getItem('vite-ui-theme');
    const htmlElement = document.documentElement;
    
    if (savedTheme) {
      htmlElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      htmlElement.classList.add('dark');
      localStorage.setItem('vite-ui-theme', 'dark');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <AuthProvider>
          <AIProvider>
            <div className="min-h-screen bg-background text-foreground transition-colors">
              <TooltipProvider>
                <Routes>
                  {/* Auth Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  
                  {/* Protected Routes */}
                  <Route path="/" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/athletes" element={
                    <ProtectedRoute>
                      <Athletes />
                    </ProtectedRoute>
                  } />
                  <Route path="/performance" element={
                    <ProtectedRoute>
                      <Performance />
                    </ProtectedRoute>
                  } />
                  <Route path="/health" element={
                    <ProtectedRoute>
                      <Health />
                    </ProtectedRoute>
                  } />
                  <Route path="/calendar" element={
                    <ProtectedRoute>
                      <Calendar />
                    </ProtectedRoute>
                  } />
                  <Route path="/training" element={
                    <ProtectedRoute>
                      <Training />
                    </ProtectedRoute>
                  } />
                  <Route path="/career" element={
                    <ProtectedRoute>
                      <Career />
                    </ProtectedRoute>
                  } />
                  <Route path="/achievements" element={
                    <ProtectedRoute>
                      <Achievements />
                    </ProtectedRoute>
                  } />
                  <Route path="/chat" element={
                    <ProtectedRoute>
                      <Chat />
                    </ProtectedRoute>
                  } />
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } />
                  
                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Sonner />
                <Toaster />
              </TooltipProvider>
            </div>
          </AIProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
