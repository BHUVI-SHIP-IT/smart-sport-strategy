
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { StatCard } from '@/components/dashboard/StatCard';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { AthletePerformanceCard } from '@/components/dashboard/AthletePerformanceCard';
import { AISummaryCard } from '@/components/dashboard/AISummaryCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Activity, Calendar, Users, TrendingUp, Heart, Award, AlertTriangle, InfoIcon } from 'lucide-react';
import { databaseService } from '@/services/databaseService';
import { supabase } from "@/integrations/supabase/client";

export default function Dashboard() {
  const navigate = useNavigate();

  // Fetch athletes from Supabase or fallback to mock data
  const { data: athletes, isLoading } = useQuery({
    queryKey: ['dashboard-athletes'],
    queryFn: async () => {
      try {
        // Attempt to fetch from Supabase
        const { data: supabaseAthletes, error } = await supabase
          .from('athletes')
          .select('*')
          .limit(4);

        if (error || !supabaseAthletes?.length) {
          // Fallback to mock data
          return await databaseService.getAthletes();
        }
        
        return supabaseAthletes;
      } catch (err) {
        console.error('Error fetching athletes:', err);
        // Fallback to mock data
        return await databaseService.getAthletes();
      }
    }
  });

  // Sample data for the performance chart
  const teamPerformanceData = [
    { name: 'Week 1', strength: 65, speed: 70, endurance: 60 },
    { name: 'Week 2', strength: 68, speed: 72, endurance: 62 },
    { name: 'Week 3', strength: 72, speed: 74, endurance: 65 },
    { name: 'Week 4', strength: 75, speed: 76, endurance: 68 },
    { name: 'Week 5', strength: 78, speed: 78, endurance: 70 },
    { name: 'Week 6', strength: 80, speed: 80, endurance: 73 },
  ];
  
  // Sample data for upcoming events
  const upcomingEvents = [
    { id: 1, title: 'Team Training Session', type: 'training', date: new Date(new Date().setDate(new Date().getDate() + 1)), location: 'Main Training Ground' },
    { id: 2, title: 'Match vs. Rival Team', type: 'game', date: new Date(new Date().setDate(new Date().getDate() + 3)), location: 'Home Stadium' },
    { id: 3, title: 'Fitness Assessment', type: 'medical', date: new Date(new Date().setDate(new Date().getDate() + 5)), location: 'Sports Medicine Center' },
    { id: 4, title: 'Recovery Session', type: 'training', date: new Date(new Date().setDate(new Date().getDate() + 7)), location: 'Recovery Center' },
  ];
  
  // Sample data for athletes at risk
  const athletesAtRisk = [
    { name: 'Emma Wilson', risk: 'High fatigue levels', urgency: 'high' },
    { name: 'James Parker', risk: 'Recent injury concern', urgency: 'medium' },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div>
            <Button onClick={() => navigate('/athletes')}>
              <Users className="mr-2 h-4 w-4" />
              Manage Athletes
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Athletes"
            value={athletes?.length || 0}
            icon={<Users className="h-4 w-4" />}
            trend={{ value: 2, isPositive: true }}
            description="vs. last month"
          />
          <StatCard
            title="Upcoming Events"
            value={upcomingEvents.length}
            icon={<Calendar className="h-4 w-4" />}
            description="in next 7 days"
          />
          <StatCard
            title="Avg Performance"
            value="78%"
            icon={<Activity className="h-4 w-4" />}
            trend={{ value: 3, isPositive: true }}
            description="team average"
          />
          <StatCard
            title="Injury Rate"
            value="12%"
            icon={<Heart className="h-4 w-4" />}
            trend={{ value: 4, isPositive: false }}
            description="needs attention"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Charts and Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Trends Card */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Team Performance Trends</CardTitle>
                    <CardDescription>6-week comparison of key metrics</CardDescription>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Average performance metrics for all active athletes.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent>
                <PerformanceChart
                  title=""
                  data={teamPerformanceData}
                  type="line"
                  dataKeys={[
                    { key: 'strength', color: '#2563eb', name: 'Strength' },
                    { key: 'speed', color: '#16a34a', name: 'Speed' },
                    { key: 'endurance', color: '#d97706', name: 'Endurance' }
                  ]}
                  height={300}
                />
              </CardContent>
            </Card>

            {/* Tabs for Events and Alerts */}
            <Tabs defaultValue="upcoming">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                <TabsTrigger value="risks">Athlete Risks</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming">
                <Card>
                  <CardHeader>
                    <CardTitle>Next 7 Days</CardTitle>
                    <CardDescription>Scheduled events and activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingEvents.map(event => (
                        <div key={event.id} className="flex items-center justify-between hover:bg-muted/50 p-3 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              event.type === 'game' ? 'bg-blue-100 text-blue-600' : 
                              event.type === 'training' ? 'bg-green-100 text-green-600' : 
                              'bg-amber-100 text-amber-600'
                            }`}>
                              {event.type === 'game' ? '🏆' : event.type === 'training' ? '🏋️' : '🩺'}
                            </div>
                            <div>
                              <p className="font-medium">{event.title}</p>
                              <div className="flex items-center text-xs text-muted-foreground gap-2">
                                <span>{event.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                                <span>•</span>
                                <span>{event.location}</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant={
                            event.type === 'game' ? 'default' : 
                            event.type === 'training' ? 'outline' : 
                            'secondary'
                          } className="capitalize">
                            {event.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="risks">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      Athletes Requiring Attention
                    </CardTitle>
                    <CardDescription>Health and performance risks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {athletesAtRisk.length > 0 ? (
                      <div className="space-y-4">
                        {athletesAtRisk.map((athlete, idx) => (
                          <div key={idx} className="flex items-center justify-between hover:bg-muted/50 p-3 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>{athlete.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{athlete.name}</p>
                                <p className="text-xs text-muted-foreground">{athlete.risk}</p>
                              </div>
                            </div>
                            <Badge variant={athlete.urgency === 'high' ? 'destructive' : 'secondary'}>
                              {athlete.urgency === 'high' ? 'Urgent' : 'Monitor'}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">No athletes at risk currently</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column: Athletes and Summary */}
          <div className="space-y-6">
            {/* AI Summary */}
            <AISummaryCard />

            {/* Top Athletes */}
            <Card>
              <CardHeader>
                <CardTitle>Top Athletes</CardTitle>
                <CardDescription>Best performers this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                  </div>
                ) : athletes && athletes.length > 0 ? (
                  athletes.slice(0, 3).map((athlete) => (
                    <AthletePerformanceCard key={athlete.id} athlete={athlete} />
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">No athletes found</p>
                  </div>
                )}
              </CardContent>
              <div className="px-6 pb-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/athletes')}
                >
                  View All Athletes
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
