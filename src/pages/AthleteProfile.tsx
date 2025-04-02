
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { StatCard } from '@/components/dashboard/StatCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Heart, Activity, LineChart, CalendarClock, Trophy, PersonStanding, AlertCircle, User, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { databaseService, Athlete } from '@/services/databaseService';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";

export default function AthleteProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Fetch athlete data from Supabase
  const { data: athlete, isLoading, error } = useQuery({
    queryKey: ['athlete', id],
    queryFn: async () => {
      if (!id) throw new Error('Athlete ID is required');
      
      // Try to fetch from Supabase first
      const { data: supabaseAthlete, error } = await supabase
        .from('athletes')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error fetching from Supabase:', error);
        // Fallback to mock data
        return databaseService.getAthleteById(id);
      }
      
      return supabaseAthlete;
    }
  });

  // Performance metrics data for charts
  const performanceData = [
    { name: 'Jan', strength: 65, speed: 78, endurance: 62 },
    { name: 'Feb', strength: 68, speed: 80, endurance: 65 },
    { name: 'Mar', strength: 72, speed: 82, endurance: 68 },
    { name: 'Apr', strength: 75, speed: 81, endurance: 70 },
    { name: 'May', strength: 78, speed: 83, endurance: 72 },
    { name: 'Jun', strength: 82, speed: 85, endurance: 75 },
  ];

  // Health metrics data
  const healthData = [
    { name: 'Week 1', heartRate: 68, oxygen: 98, sleep: 7.2 },
    { name: 'Week 2', heartRate: 70, oxygen: 97, sleep: 6.8 },
    { name: 'Week 3', heartRate: 67, oxygen: 98, sleep: 7.5 },
    { name: 'Week 4', heartRate: 69, oxygen: 99, sleep: 7.8 },
  ];

  // Injury risk assessment
  const injuryRiskScore = 28;

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading athlete data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !athlete) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-screen">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <h2 className="text-2xl font-bold mb-2">Athlete Not Found</h2>
          <p className="text-muted-foreground mb-4">
            We couldn't find the athlete you're looking for.
          </p>
          <Button onClick={() => navigate('/athletes')}>Return to Athletes</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={athlete.profileImage || "https://via.placeholder.com/150"} alt={athlete.name} />
              <AvatarFallback>{athlete.name ? athlete.name.split(' ').map(n => n[0]).join('') : 'A'}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{athlete.name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>{athlete.sport}</span>
                {athlete.position && (
                  <>
                    <span>•</span>
                    <span>{athlete.position}</span>
                  </>
                )}
                {athlete.team && (
                  <>
                    <span>•</span>
                    <span>{athlete.team}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2 self-start md:self-auto">
            <Badge variant={athlete.status === 'active' ? "outline" : athlete.status === 'injured' ? "destructive" : "secondary"} className="capitalize">
              {athlete.status}
            </Badge>
            <Button>Edit Profile</Button>
          </div>
        </div>

        {/* Main content */}
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 md:grid-cols-6 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="sponsorships">Sponsorships</TabsTrigger>
            <TabsTrigger value="history" className="hidden md:block">History</TabsTrigger>
            <TabsTrigger value="emergency" className="hidden md:block">Emergency</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                title="Overall Performance"
                value={`${athlete.performanceStats?.overallScore || 85}/100`}
                icon={<Activity className="h-4 w-4" />}
                trend={{ value: 2.5, isPositive: true }}
                description="vs last month"
              />
              <StatCard
                title="Fitness Level"
                value={`${athlete.performanceStats?.enduranceScore || 82}/100`}
                icon={<PersonStanding className="h-4 w-4" />}
                trend={{ value: 1.8, isPositive: true }}
                description="improving steadily"
              />
              <StatCard
                title="Recent Games"
                value={athlete.performanceStats?.recentGames?.length || 3}
                icon={<Trophy className="h-4 w-4" />}
                description="in the last 30 days"
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Key metrics over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <PerformanceChart
                  title=""
                  data={performanceData}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Athlete Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Age</span>
                      <span>{athlete.age}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Height</span>
                      <span>{athlete.height ? `${athlete.height} cm` : 'N/A'}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weight</span>
                      <span>{athlete.weight ? `${athlete.weight} kg` : 'N/A'}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email</span>
                      <span>{athlete.contactInfo?.email}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Career Start</span>
                      <span>{athlete.career?.startDate ? new Date(athlete.career.startDate).getFullYear() : 'N/A'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {athlete.performanceStats?.recentGames?.slice(0, 3).map((game, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${game.result === 'win' ? 'bg-green-500' : game.result === 'loss' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                          <div>
                            <p className="font-medium">{`vs ${game.opponent}`}</p>
                            <p className="text-xs text-muted-foreground">{new Date(game.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <Badge variant={game.result === 'win' ? "outline" : "secondary"} className="capitalize">
                          {game.result}
                        </Badge>
                      </div>
                    ))}
                    {(!athlete.performanceStats?.recentGames || athlete.performanceStats.recentGames.length === 0) && (
                      <div className="text-center text-muted-foreground py-4">
                        No recent games found
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full">View All Activities</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                title="Strength Score"
                value={`${athlete.performanceStats?.strengthScore || 88}/100`}
                trend={{ value: 3.2, isPositive: true }}
              />
              <StatCard
                title="Speed Score"
                value={`${athlete.performanceStats?.speedScore || 92}/100`}
                trend={{ value: 1.5, isPositive: true }}
              />
              <StatCard
                title="Technical Score"
                value={`${athlete.performanceStats?.technicalScore || 85}/100`}
                trend={{ value: 0.8, isPositive: false }}
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Detailed performance analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Strength</span>
                      <span className="text-sm text-muted-foreground">{athlete.performanceStats?.strengthScore || 88}/100</span>
                    </div>
                    <Progress value={athlete.performanceStats?.strengthScore || 88} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Speed</span>
                      <span className="text-sm text-muted-foreground">{athlete.performanceStats?.speedScore || 92}/100</span>
                    </div>
                    <Progress value={athlete.performanceStats?.speedScore || 92} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Endurance</span>
                      <span className="text-sm text-muted-foreground">{athlete.performanceStats?.enduranceScore || 90}/100</span>
                    </div>
                    <Progress value={athlete.performanceStats?.enduranceScore || 90} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Agility</span>
                      <span className="text-sm text-muted-foreground">{athlete.performanceStats?.agilityScore || 87}/100</span>
                    </div>
                    <Progress value={athlete.performanceStats?.agilityScore || 87} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Technical</span>
                      <span className="text-sm text-muted-foreground">{athlete.performanceStats?.technicalScore || 85}/100</span>
                    </div>
                    <Progress value={athlete.performanceStats?.technicalScore || 85} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Tactical</span>
                      <span className="text-sm text-muted-foreground">{athlete.performanceStats?.tacticalScore || 84}/100</span>
                    </div>
                    <Progress value={athlete.performanceStats?.tacticalScore || 84} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Season Statistics</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {athlete.sport === 'Basketball' ? (
                  <>
                    <StatCard title="Points Per Game" value={athlete.performanceStats?.seasonAverages?.pointsPerGame || '28.5'} />
                    <StatCard title="Assists Per Game" value={athlete.performanceStats?.seasonAverages?.assistsPerGame || '6.2'} />
                    <StatCard title="Rebounds Per Game" value={athlete.performanceStats?.seasonAverages?.reboundsPerGame || '7.3'} />
                    <StatCard title="FG%" value={`${athlete.performanceStats?.seasonAverages?.fieldGoalPercentage || '52.8'}%`} />
                  </>
                ) : athlete.sport === 'Soccer' ? (
                  <>
                    <StatCard title="Goals" value={athlete.performanceStats?.seasonAverages?.goalsPerGame ? (athlete.performanceStats?.seasonAverages?.goalsPerGame * 38).toFixed(0) : '22'} />
                    <StatCard title="Assists" value={athlete.performanceStats?.seasonAverages?.assistsPerGame ? (athlete.performanceStats?.seasonAverages?.assistsPerGame * 38).toFixed(0) : '14'} />
                    <StatCard title="Pass Accuracy" value={`${athlete.performanceStats?.seasonAverages?.passAccuracy || '88.5'}%`} />
                    <StatCard title="Shots Per Game" value={athlete.performanceStats?.seasonAverages?.shotsPerGame || '5.2'} />
                  </>
                ) : athlete.sport === 'Tennis' ? (
                  <>
                    <StatCard title="Win Rate" value={`${(athlete.performanceStats?.seasonAverages?.winRate || 0.85) * 100}%`} />
                    <StatCard title="Aces Per Match" value={athlete.performanceStats?.seasonAverages?.acesPerMatch || '8.2'} />
                    <StatCard title="1st Serve %" value={`${athlete.performanceStats?.seasonAverages?.firstServePercentage || '65.8'}%`} />
                    <StatCard title="Points Won" value={`${athlete.performanceStats?.seasonAverages?.returnPointsWon || '45.7'}%`} />
                  </>
                ) : (
                  <>
                    <StatCard title="Stat 1" value="--" />
                    <StatCard title="Stat 2" value="--" />
                    <StatCard title="Stat 3" value="--" />
                    <StatCard title="Stat 4" value="--" />
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Health Tab */}
          <TabsContent value="health" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                title="Heart Rate"
                value={`${athlete.wearableData?.[0]?.heartRate?.[0] || 68} bpm`}
                icon={<Heart className="h-4 w-4" />}
                trend={{ value: 2, isPositive: false }}
                description="resting rate"
              />
              <StatCard
                title="Sleep Quality"
                value={`${athlete.wearableData?.[0]?.sleepQuality || 82}/100`}
                icon={<Activity className="h-4 w-4" />}
                trend={{ value: 5, isPositive: true }}
                description={`${athlete.wearableData?.[0]?.sleepHours || 7.5} hours`}
              />
              <StatCard
                title="Readiness"
                value={`${athlete.wearableData?.[0]?.readinessScore || 88}/100`}
                icon={<PersonStanding className="h-4 w-4" />}
                trend={{ value: 3, isPositive: true }}
                description="ready to perform"
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Health Metrics</CardTitle>
                <CardDescription>Tracked over the last 4 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <PerformanceChart
                  title=""
                  data={healthData}
                  type="line"
                  dataKeys={[
                    { key: 'heartRate', color: '#ef4444', name: 'Heart Rate (bpm)' },
                    { key: 'oxygen', color: '#3b82f6', name: 'Oxygen Level (%)' },
                    { key: 'sleep', color: '#8b5cf6', name: 'Sleep (hours)' }
                  ]}
                  height={300}
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Injury Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Overall Risk</span>
                      <Badge variant={injuryRiskScore < 30 ? "outline" : injuryRiskScore < 70 ? "secondary" : "destructive"}>
                        {injuryRiskScore < 30 ? 'Low' : injuryRiskScore < 70 ? 'Medium' : 'High'}
                      </Badge>
                    </div>
                    <Progress value={injuryRiskScore} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      {injuryRiskScore < 30 
                        ? 'The athlete has a low risk of injury based on current metrics. Continue with regular training.' 
                        : injuryRiskScore < 70 
                          ? 'Medium risk detected. Consider modifying high-impact exercises and focus on recovery.'
                          : 'High risk of injury detected! Immediate reduction in training intensity recommended.'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Injury History</CardTitle>
                </CardHeader>
                <CardContent>
                  {athlete.injuryHistory && athlete.injuryHistory.length > 0 ? (
                    <div className="space-y-4">
                      {athlete.injuryHistory.map((injury, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{injury.type} - {injury.bodyPart}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(injury.date).toLocaleDateString()} • {injury.recoveryTimeInDays} days recovery
                            </p>
                          </div>
                          <Badge variant={injury.status === 'recovered' ? "outline" : "destructive"} className="capitalize">
                            {injury.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-4">
                      No injury history recorded
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Sponsorships Tab */}
          <TabsContent value="sponsorships" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sponsorship Opportunities</CardTitle>
                <CardDescription>Potential brand partnerships for this athlete</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* This would be populated from the database */}
                  <div className="flex items-center justify-between hover:bg-muted/50 p-3 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-blue-600">N</span>
                      </div>
                      <div>
                        <p className="font-medium">Nike Sports</p>
                        <p className="text-xs text-muted-foreground">Sportswear sponsorship - $250K/year</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                  
                  <div className="flex items-center justify-between hover:bg-muted/50 p-3 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-red-600">G</span>
                      </div>
                      <div>
                        <p className="font-medium">Gatorade</p>
                        <p className="text-xs text-muted-foreground">Hydration products - $150K/year</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                  
                  <div className="flex items-center justify-between hover:bg-muted/50 p-3 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-green-600">A</span>
                      </div>
                      <div>
                        <p className="font-medium">Adidas</p>
                        <p className="text-xs text-muted-foreground">Equipment and apparel - $200K/year</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Find More Sponsors</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Sponsorships</CardTitle>
                <CardDescription>Active brand partnerships</CardDescription>
              </CardHeader>
              <CardContent>
                {athlete.career?.sponsorships && athlete.career.sponsorships.length > 0 ? (
                  <div className="space-y-4">
                    {athlete.career.sponsorships.map((sponsorship, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-slate-600">{sponsorship.company.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium">{sponsorship.company}</p>
                            <p className="text-xs text-muted-foreground">
                              Started {new Date(sponsorship.startDate).toLocaleDateString()}
                              {sponsorship.endDate ? ` • Ends ${new Date(sponsorship.endDate).toLocaleDateString()}` : ''}
                            </p>
                          </div>
                        </div>
                        <Badge variant={sponsorship.status === 'active' ? "outline" : "secondary"} className="capitalize">
                          {sponsorship.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-4">
                    No active sponsorships
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Career Timeline</CardTitle>
                <CardDescription>Major milestones and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative border-l border-muted pl-6 ml-3 space-y-8">
                  {athlete.career?.achievements?.map((achievement, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-muted bg-background"></div>
                      <div className="mb-1 text-lg font-semibold">{achievement.title}</div>
                      <div className="text-sm text-muted-foreground mb-2">{new Date(achievement.date).toLocaleDateString()}</div>
                      <div className="text-sm">{achievement.description}</div>
                    </div>
                  ))}
                  {(!athlete.career?.achievements || athlete.career.achievements.length === 0) && (
                    <div className="text-center text-muted-foreground py-4">
                      No achievements recorded
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contract History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {athlete.career?.currentContract && (
                    <div className="border border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-900 p-4 rounded-lg mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{athlete.career.currentContract.team}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(athlete.career.currentContract.startDate).toLocaleDateString()} - 
                            {new Date(athlete.career.currentContract.endDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${(athlete.career.currentContract.value / 1000000).toFixed(2)}M</p>
                          <Badge>Current</Badge>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {athlete.career?.previousContracts?.map((contract, idx) => (
                    <div key={idx} className="flex items-center justify-between hover:bg-muted/50 p-3 rounded-lg">
                      <div>
                        <p className="font-medium">{contract.team}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(contract.startDate).toLocaleDateString()} - 
                          {new Date(contract.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(contract.value / 1000000).toFixed(2)}M</p>
                        <Badge variant="outline" className="capitalize">{contract.status}</Badge>
                      </div>
                    </div>
                  ))}
                  
                  {(!athlete.career?.currentContract && (!athlete.career?.previousContracts || athlete.career.previousContracts.length === 0)) && (
                    <div className="text-center text-muted-foreground py-4">
                      No contract history available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Emergency Tab */}
          <TabsContent value="emergency" className="space-y-6">
            <Card>
              <CardHeader className="bg-destructive/10">
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  Emergency Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Primary Contact</p>
                      <p className="font-medium">John Doe (Father)</p>
                      <p>+1 (555) 123-4567</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Secondary Contact</p>
                      <p className="font-medium">Jane Doe (Mother)</p>
                      <p>+1 (555) 234-5678</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground mb-1">Medical Information</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-sm font-medium">Blood Type</p>
                        <p>O Positive</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Allergies</p>
                        <p>Penicillin, Peanuts</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground mb-1">Medical Provider</p>
                    <p className="font-medium">Dr. Robert Johnson</p>
                    <p>Sports Medicine Specialist</p>
                    <p>+1 (555) 987-6543</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button className="w-full" variant="destructive">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Emergency Call
                </Button>
                <Button className="w-full" variant="outline">
                  Find Nearby Hospitals
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Nearby Medical Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between hover:bg-muted/50 p-3 rounded-lg">
                    <div>
                      <p className="font-medium">City General Hospital</p>
                      <p className="text-xs text-muted-foreground">2.3 miles away • Emergency, Sports Medicine</p>
                      <p className="text-xs">+1 (555) 111-2222</p>
                    </div>
                    <Button size="sm">Directions</Button>
                  </div>
                  
                  <div className="flex items-center justify-between hover:bg-muted/50 p-3 rounded-lg">
                    <div>
                      <p className="font-medium">Sports Medicine Clinic</p>
                      <p className="text-xs text-muted-foreground">3.7 miles away • Sports Medicine</p>
                      <p className="text-xs">+1 (555) 222-3333</p>
                    </div>
                    <Button size="sm">Directions</Button>
                  </div>
                  
                  <div className="flex items-center justify-between hover:bg-muted/50 p-3 rounded-lg">
                    <div>
                      <p className="font-medium">Urgent Care Center</p>
                      <p className="text-xs text-muted-foreground">1.5 miles away • Urgent Care</p>
                      <p className="text-xs">+1 (555) 333-4444</p>
                    </div>
                    <Button size="sm">Directions</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
