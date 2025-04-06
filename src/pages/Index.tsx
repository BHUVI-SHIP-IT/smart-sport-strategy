
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Activity, Calendar, Award, Heart } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="container px-4 py-12 mx-auto">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            AthletePro
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            The complete performance management platform for coaches and athletes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => navigate('/dashboard')}>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
              Log In
            </Button>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="p-6 border rounded-xl bg-card shadow-sm hover:shadow-md transition-all">
            <Users className="h-10 w-10 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Athlete Management</h3>
            <p className="text-muted-foreground">
              Comprehensive profiles with performance history, health metrics, and career tracking
            </p>
          </div>
          
          <div className="p-6 border rounded-xl bg-card shadow-sm hover:shadow-md transition-all">
            <Activity className="h-10 w-10 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Performance Analytics</h3>
            <p className="text-muted-foreground">
              Visualize progress with advanced metrics and customizable dashboards
            </p>
          </div>
          
          <div className="p-6 border rounded-xl bg-card shadow-sm hover:shadow-md transition-all">
            <Calendar className="h-10 w-10 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Training Schedule</h3>
            <p className="text-muted-foreground">
              Plan, organize and optimize training sessions for peak performance
            </p>
          </div>
          
          <div className="p-6 border rounded-xl bg-card shadow-sm hover:shadow-md transition-all">
            <Heart className="h-10 w-10 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Health Monitoring</h3>
            <p className="text-muted-foreground">
              Track wellness metrics, injury prevention, and recovery protocols
            </p>
          </div>
          
          <div className="p-6 border rounded-xl bg-card shadow-sm hover:shadow-md transition-all">
            <Award className="h-10 w-10 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Achievements Tracking</h3>
            <p className="text-muted-foreground">
              Record and celebrate milestones, goals, and accomplishments
            </p>
          </div>
          
          <div className="p-6 border rounded-xl bg-card shadow-sm hover:shadow-md transition-all">
            <svg className="h-10 w-10 mb-4 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
            <p className="text-muted-foreground">
              Get intelligent recommendations and personalized analysis of athlete data
            </p>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to elevate your team's performance?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of coaches and athletes who are optimizing performance with AthletePro
          </p>
          <Button size="lg" onClick={() => navigate('/dashboard')}>
            Explore the Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
