
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { StatCard } from '@/components/dashboard/StatCard';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { AISummaryCard } from '@/components/dashboard/AISummaryCard';
import { databaseService } from '@/services/databaseService';
import { openRouterService } from '@/services/openRouterService';
import { useAI } from '@/context/AIContext';
import { ActivitySquare, Award, Calendar, Heart, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const { isConfigured } = useAI();
  const [selectedAthlete, setSelectedAthlete] = useState<string>("a1");
  const [performanceInsights, setPerformanceInsights] = useState({
    analysis: "Select an athlete and metrics to see AI-powered performance insights.",
    recommendations: [] as string[]
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Fetch athletes
  const { data: athletes = [] } = useQuery({
    queryKey: ['athletes'],
    queryFn: () => databaseService.getAthletes(),
  });

  // Fetch selected athlete data
  const { data: athlete } = useQuery({
    queryKey: ['athlete', selectedAthlete],
    queryFn: () => databaseService.getAthleteById(selectedAthlete),
    enabled: !!selectedAthlete
  });

  // Fetch athlete's upcoming events
  const { data: events = [] } = useQuery({
    queryKey: ['events', selectedAthlete],
    queryFn: () => databaseService.getEventsByAthleteId(selectedAthlete),
    enabled: !!selectedAthlete
  });

  const performanceData = [
    {
      name: "Week 1",
      points: 28,
      assists: 6,
      rebounds: 7
    },
    {
      name: "Week 2",
      points: 32,
      assists: 8,
      rebounds: 6
    },
    {
      name: "Week 3",
      points: 30,
      assists: 5,
      rebounds: 8
    },
    {
      name: "Week 4",
      points: 35,
      assists: 7,
      rebounds: 9
    },
    {
      name: "Week 5",
      points: 33,
      assists: 6,
      rebounds: 7
    }
  ];

  const healthData = [
    {
      name: "Mon",
      recovery: 85,
      sleep: 90,
      fatigue: 30,
    },
    {
      name: "Tue",
      recovery: 82,
      sleep: 85,
      fatigue: 35,
    },
    {
      name: "Wed",
      recovery: 78,
      sleep: 75,
      fatigue: 42,
    },
    {
      name: "Thu",
      recovery: 80,
      sleep: 82,
      fatigue: 38,
    },
    {
      name: "Fri",
      recovery: 85,
      sleep: 88,
      fatigue: 30,
    },
    {
      name: "Sat",
      recovery: 90,
      sleep: 92,
      fatigue: 25,
    },
    {
      name: "Sun",
      recovery: 88,
      sleep: 90,
      fatigue: 28,
    }
  ];

  const upcomingEvents = events
    .filter((event) => new Date(event.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 3);

  const analyzePerformance = async () => {
    if (!isConfigured || !athlete) {
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await openRouterService.analyzePerformance({
        athleteData: {
          name: athlete.name,
          sport: athlete.sport,
          performanceStats: athlete.performanceStats,
          recentGames: athlete.performanceStats.recentGames
        },
        analysisType: 'performance trends'
      });
      
      setPerformanceInsights(result);
    } catch (error) {
      console.error('Failed to analyze performance:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    if (isConfigured && athlete) {
      analyzePerformance();
    }
  }, [isConfigured, selectedAthlete]);

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Athlete Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Select
            value={selectedAthlete}
            onValueChange={(value) => setSelectedAthlete(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Athlete" />
            </SelectTrigger>
            <SelectContent>
              {athletes.map((athlete) => (
                <SelectItem key={athlete.id} value={athlete.id}>{athlete.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {athlete && (
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="career">Career</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="dashboard-grid mb-6">
              <StatCard 
                title="Overall Performance" 
                value={athlete.performanceStats.overallScore || '—'}
                description="Performance score (out of 100)"
                icon={<TrendingUp className="h-4 w-4" />}
                trend={{ value: 3, isPositive: true }}
              />
              <StatCard 
                title="Health Status" 
                value={athlete.status === 'active' ? 'Healthy' : athlete.status}
                icon={<Heart className="h-4 w-4" />}
              />
              <StatCard 
                title="Next Event" 
                value={upcomingEvents.length > 0 ? new Date(upcomingEvents[0].startDate).toLocaleDateString() : 'None'}
                description={upcomingEvents.length > 0 ? upcomingEvents[0].title : ''}
                icon={<Calendar className="h-4 w-4" />}
              />
              <StatCard 
                title="Season Achievements" 
                value={athlete.career.achievements ? athlete.career.achievements.length : 0}
                icon={<Award className="h-4 w-4" />}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="md:col-span-2">
                <PerformanceChart 
                  title="Recent Performance Trends"
                  data={performanceData}
                  dataKeys={[
                    { key: 'points', color: '#1E88E5', name: 'Points' },
                    { key: 'assists', color: '#43A047', name: 'Assists' },
                    { key: 'rebounds', color: '#FF9800', name: 'Rebounds' }
                  ]}
                />
              </div>
              <AISummaryCard
                title="Performance Insights"
                insights={performanceInsights.analysis}
                recommendations={performanceInsights.recommendations}
                isLoading={isAnalyzing}
                onRefresh={analyzePerformance}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Next scheduled activities</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingEvents.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="flex items-start justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-muted-foreground">{event.location}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm">{new Date(event.startDate).toLocaleDateString()}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No upcoming events scheduled</p>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Health Metrics</CardTitle>
                  <CardDescription>Weekly wellness monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[230px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={healthData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="recovery" 
                          stroke="#43A047" 
                          fill="#43A047" 
                          fillOpacity={0.2} 
                          name="Recovery"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="sleep" 
                          stroke="#1E88E5" 
                          fill="#1E88E5" 
                          fillOpacity={0.2}
                          name="Sleep Quality" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="fatigue" 
                          stroke="#FF5722" 
                          fill="#FF5722" 
                          fillOpacity={0.2}
                          name="Fatigue" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="performance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {athlete.performanceStats && Object.entries({
                      "Strength": athlete.performanceStats.strengthScore,
                      "Speed": athlete.performanceStats.speedScore,
                      "Endurance": athlete.performanceStats.enduranceScore,
                      "Agility": athlete.performanceStats.agilityScore,
                      "Technical": athlete.performanceStats.technicalScore,
                      "Tactical": athlete.performanceStats.tacticalScore,
                      "Mental": athlete.performanceStats.mentalScore,
                    }).map(([key, value]) => value !== undefined && (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm">{key}</span>
                        <div className="w-3/4 flex items-center">
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div 
                              className="h-2.5 rounded-full bg-sports-blue" 
                              style={{ width: `${value}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm font-medium">{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Game Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {athlete.performanceStats.recentGames?.map((game) => (
                      <div key={game.id} className="border rounded-md p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <p className="font-medium">vs {game.opponent}</p>
                            <p className="text-xs text-muted-foreground">{new Date(game.date).toLocaleDateString()}</p>
                          </div>
                          <div className={`px-2 py-1 text-xs rounded-full ${
                            game.result === "win" 
                              ? "bg-green-100 text-green-800" 
                              : game.result === "loss" 
                              ? "bg-red-100 text-red-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {game.result.charAt(0).toUpperCase() + game.result.slice(1)}
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          {Object.entries(game.stats).map(([key, value]) => (
                            <div key={key} className="flex flex-col items-center p-1 bg-muted/50 rounded">
                              <span className="text-xs text-muted-foreground">{key}</span>
                              <span className="font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="health">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Injury History</CardTitle>
                </CardHeader>
                <CardContent>
                  {athlete.injuryHistory && athlete.injuryHistory.length > 0 ? (
                    <div className="space-y-4">
                      {athlete.injuryHistory.map(injury => (
                        <div key={injury.id} className="border-b pb-3 last:border-0">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">{injury.type} - {injury.bodyPart}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(injury.date).toLocaleDateString()} · 
                                Recovery: {injury.recoveryTimeInDays} days
                              </p>
                            </div>
                            <div className={`px-2 py-1 h-fit text-xs rounded-full ${
                              injury.status === 'recovered' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {injury.status}
                            </div>
                          </div>
                          {injury.notes && <p className="text-sm mt-1">{injury.notes}</p>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No injury history recorded</p>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Health Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  {athlete.wearableData && athlete.wearableData.length > 0 ? (
                    <div className="space-y-4">
                      {athlete.wearableData.slice(0, 1).map((data, index) => (
                        <div key={index}>
                          <p className="text-sm text-muted-foreground mb-3">
                            Latest data from {new Date(data.date).toLocaleDateString()}
                          </p>
                          <div className="grid grid-cols-2 gap-y-4">
                            <div>
                              <p className="text-xs text-muted-foreground">Sleep</p>
                              <p className="font-medium">{data.sleepHours} hours</p>
                              <p className="text-xs">Quality: {data.sleepQuality}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Activity</p>
                              <p className="font-medium">{data.stepsCount.toLocaleString()} steps</p>
                              <p className="text-xs">{data.distance} km</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Calories</p>
                              <p className="font-medium">{data.caloriesBurned} cal</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Heart Rate</p>
                              <p className="font-medium">
                                {Math.min(...data.heartRate)} - {Math.max(...data.heartRate)} bpm
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Readiness</p>
                              <div className="w-full bg-muted rounded-full h-2.5 mt-1">
                                <div 
                                  className="h-2.5 rounded-full bg-sports-green" 
                                  style={{ width: `${data.readinessScore}%` }}
                                ></div>
                              </div>
                              <p className="text-xs mt-1">{data.readinessScore}/100</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Fatigue</p>
                              <div className="w-full bg-muted rounded-full h-2.5 mt-1">
                                <div 
                                  className="h-2.5 rounded-full bg-destructive" 
                                  style={{ width: `${data.fatigueLevel}%` }}
                                ></div>
                              </div>
                              <p className="text-xs mt-1">{data.fatigueLevel}/100</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <Button variant="outline" className="w-full mt-4">View All Health Data</Button>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No wearable data available</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="career">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Career Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Start Date</span>
                      <span>{new Date(athlete.career.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Career Span</span>
                      <span>{new Date().getFullYear() - new Date(athlete.career.startDate).getFullYear()} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Current Team</span>
                      <span>{athlete.team || 'Individual Athlete'}</span>
                    </div>
                    {athlete.career.marketValue && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Market Value</span>
                        <span>${(athlete.career.marketValue / 1000000).toFixed(1)}M</span>
                      </div>
                    )}
                    {athlete.career.careerEarnings && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Career Earnings</span>
                        <span>${(athlete.career.careerEarnings / 1000000).toFixed(1)}M</span>
                      </div>
                    )}
                  </div>
                  
                  {athlete.career.currentContract && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-2">Current Contract</h3>
                      <div className="border rounded p-3 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Team</span>
                          <span>{athlete.career.currentContract.team}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Duration</span>
                          <span>
                            {new Date(athlete.career.currentContract.startDate).getFullYear()} - 
                            {new Date(athlete.career.currentContract.endDate).getFullYear()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Value</span>
                          <span>${(athlete.career.currentContract.value / 1000000).toFixed(1)}M</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Sponsorships & Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  {athlete.career.sponsorships && athlete.career.sponsorships.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Active Sponsorships</h3>
                      <div className="space-y-3 mb-6">
                        {athlete.career.sponsorships
                          .filter(s => s.status === 'active')
                          .map(sponsor => (
                            <div key={sponsor.id} className="border rounded p-3">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{sponsor.company}</span>
                                <span className="text-sm">${(sponsor.value / 1000000).toFixed(1)}M</span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Since {new Date(sponsor.startDate).toLocaleDateString()}
                                {sponsor.endDate && ` · Until ${new Date(sponsor.endDate).toLocaleDateString()}`}
                              </p>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )}
                  
                  {athlete.career.achievements && athlete.career.achievements.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Key Achievements</h3>
                      <div className="space-y-3">
                        {athlete.career.achievements.map(achievement => (
                          <div key={achievement.id} className="flex gap-3 items-start">
                            <div className="bg-sports-accent/10 p-1 rounded-full">
                              <Award className="h-4 w-4 text-sports-accent" />
                            </div>
                            <div>
                              <p className="font-medium">{achievement.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(achievement.date).toLocaleDateString()}
                              </p>
                              {achievement.description && (
                                <p className="text-sm mt-1">{achievement.description}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}

    </Layout>
  );
};

export default Dashboard;
