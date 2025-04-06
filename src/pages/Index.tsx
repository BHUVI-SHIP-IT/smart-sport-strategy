
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Users, 
  Activity, 
  Calendar, 
  Award, 
  Heart, 
  BrainCircuit, 
  ShieldCheck,
  TrendingUp
} from "lucide-react";

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
            The complete performance management platform with AI-powered injury prevention
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
        
        {/* Innovation Highlight */}
        <div className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-8 rounded-2xl border border-blue-100 dark:border-blue-900">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="flex items-center mb-4">
                <BrainCircuit className="h-8 w-8 text-primary mr-2" />
                <h2 className="text-2xl font-bold">AI-Powered Injury Prevention System</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Our innovative system analyzes performance patterns and biometric data to predict potential injuries before they occur.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Reduce injury rates by up to 40% with early intervention alerts</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Personalized training adjustments based on fatigue analysis</span>
                </li>
                <li className="flex items-start">
                  <Activity className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Continuous monitoring with wearable device integration</span>
                </li>
              </ul>
              <Button 
                className="mt-6" 
                variant="default" 
                onClick={() => navigate('/dashboard')}
              >
                Explore the Technology
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium">Injury Risk Assessment</h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-medium">Overall Risk Level</span>
                    <span className="text-sm font-medium text-green-500">Low</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs">Knee Stress</span>
                        <span className="text-xs">28%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs">Ankle Fatigue</span>
                        <span className="text-xs">45%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs">Back Strain</span>
                        <span className="text-xs">12%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-muted-foreground">AI recommendation: Reduce high-impact training this week</p>
                  </div>
                </div>
              </div>
            </div>
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
            <BrainCircuit className="h-10 w-10 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
            <p className="text-muted-foreground">
              Get intelligent recommendations and personalized analysis of athlete data
            </p>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to reduce injuries and elevate performance?</h2>
          <p className="text-muted-foreground mb-8">
            Join innovative teams using AthletePro to transform athlete management with AI-powered insights
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
