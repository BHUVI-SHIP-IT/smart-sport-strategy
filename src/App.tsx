import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AIProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <div className="App">
              <Toaster position="top-right" />
              <BrowserRouter>
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
              </BrowserRouter>
            </div>
          </ThemeProvider>
        </AIProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
