
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Activity, Calendar } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="max-w-3xl w-full px-4 py-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to AthletePro</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Your complete solution for athlete management and performance tracking
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 border rounded-lg bg-card shadow-sm">
            <Users className="mx-auto h-10 w-10 mb-4 text-primary" />
            <h3 className="text-lg font-medium mb-2">Athlete Management</h3>
            <p className="text-sm text-muted-foreground">
              Track and manage athletes with comprehensive profiles
            </p>
          </div>
          
          <div className="p-6 border rounded-lg bg-card shadow-sm">
            <Activity className="mx-auto h-10 w-10 mb-4 text-primary" />
            <h3 className="text-lg font-medium mb-2">Performance Analytics</h3>
            <p className="text-sm text-muted-foreground">
              Monitor key metrics and visualize progress over time
            </p>
          </div>
          
          <div className="p-6 border rounded-lg bg-card shadow-sm">
            <Calendar className="mx-auto h-10 w-10 mb-4 text-primary" />
            <h3 className="text-lg font-medium mb-2">Training Schedule</h3>
            <p className="text-sm text-muted-foreground">
              Plan and organize training sessions and events
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => navigate('/dashboard')}>
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/athletes')}>
            View Athletes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
