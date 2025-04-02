
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, BarChart, Activity, ArrowDown, ArrowRight,
  ArrowUp, Calendar, DollarSign, Medal, Target, History,
  AlertTriangle
} from 'lucide-react';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { AthletePerformanceCard } from '@/components/dashboard/AthletePerformanceCard';
import { AISummaryCard } from '@/components/dashboard/AISummaryCard';
import { databaseService } from '@/services/databaseService';
import { useQuery } from '@tanstack/react-query';
import { normalizeAthlete } from '@/types/athlete';

export default function Dashboard() {
  const { data: athletesData = [], isLoading } = useQuery({
    queryKey: ['athletes'],
    queryFn: () => databaseService.getAthletes(),
  });

  // Normalize athlete data
  const athletes = React.useMemo(() => {
    return athletesData.map(athlete => normalizeAthlete(athlete));
  }, [athletesData]);

  // Filter top performing athletes
  const topAthletes = React.useMemo(() => {
    return [...athletes]
      .sort((a, b) => (b.performanceStats?.overallScore || 0) - (a.performanceStats?.overallScore || 0))
      .slice(0, 4);
  }, [athletes]);

  const performanceData = [
    { name: 'Jan', team: 65, league: 78 },
    { name: 'Feb', team: 68, league: 80 },
    { name: 'Mar', team: 72, league: 82 },
    { name: 'Apr', team: 75, league: 81 },
    { name: 'May', team: 78, league: 83 },
    { name: 'Jun', team: 82, league: 85 },
  ];

  const trainingData = [
    { name: 'Week 1', conditioning: 40, strength: 65, technical: 30 },
    { name: 'Week 2', conditioning: 45, strength: 70, technical: 40 },
    { name: 'Week 3', conditioning: 60, strength: 72, technical: 45 },
    { name: 'Week 4', conditioning: 55, strength: 75, technical: 55 },
  ];

  const healthData = [
    { name: 'Week 1', fatigue: 68, readiness: 78, issues: 2 },
    { name: 'Week 2', fatigue: 72, readiness: 73, issues: 3 },
    { name: 'Week 3', fatigue: 65, readiness: 80, issues: 1 },
    { name: 'Week 4', fatigue: 60, readiness: 85, issues: 0 },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Athletes
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{athletes.length}</div>
                  <p className="text-xs text-muted-foreground">
                    +1 since last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Avg Performance
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">82/100</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500 inline-flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      2.5%
                    </span>{" "}
                    vs. last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Upcoming Events
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6</div>
                  <p className="text-xs text-muted-foreground">
                    Next event in 3 days
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Injury Reports
                  </CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-red-500 inline-flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      1 new
                    </span>{" "}
                    since last week
                  </p>
                </CardContent>
              </Card>
            </div>
          
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
              <Card className="col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base font-medium">Performance Overview</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <div className="h-2 w-2 rounded-full bg-blue-500 mr-1"></div>
                      Team
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                      League Avg
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <PerformanceChart
                    title="Performance Metrics"
                    data={performanceData}
                    type="line"
                    dataKeys={[
                      { key: 'team', color: '#3b82f6', name: 'Your Team' },
                      { key: 'league', color: '#22c55e', name: 'League Avg' }
                    ]}
                    height={300}
                  />
                </CardContent>
              </Card>
              
              <Card className="row-span-2">
                <CardHeader>
                  <CardTitle className="text-base font-medium">Top Athletes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topAthletes.map((athlete, index) => (
                    <div key={athlete.id} className={index > 0 ? 'pt-3' : ''}>
                      {index > 0 && <div className="border-t mb-3"></div>}
                      <AthletePerformanceCard athlete={athlete} />
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base font-medium">Training Load</CardTitle>
                </CardHeader>
                <CardContent>
                  <PerformanceChart
                    title="Training Load"
                    data={trainingData}
                    type="bar"
                    dataKeys={[
                      { key: 'conditioning', color: '#06b6d4', name: 'Conditioning' },
                      { key: 'strength', color: '#ec4899', name: 'Strength' },
                      { key: 'technical', color: '#6366f1', name: 'Technical' }
                    ]}
                    height={240}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base font-medium">Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 mr-3">
                        <Medal className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Tournament Runner-up</p>
                        <p className="text-xs text-muted-foreground">Regional Championship 2023</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 text-green-600 mr-3">
                        <Target className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Personal Best</p>
                        <p className="text-xs text-muted-foreground">100m Sprint - Michael Jordan</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-amber-100 text-amber-600 mr-3">
                        <History className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Team Record</p>
                        <p className="text-xs text-muted-foreground">Most wins in a season</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
          
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle className="text-base font-medium">Health & Wellness</CardTitle>
                </CardHeader>
                <CardContent>
                  <PerformanceChart
                    title="Health Metrics"
                    data={healthData}
                    type="mixed"
                    dataKeys={[
                      { key: 'fatigue', color: '#f97316', name: 'Fatigue', type: 'line' },
                      { key: 'readiness', color: '#0ea5e9', name: 'Readiness', type: 'line' },
                      { key: 'issues', color: '#ef4444', name: 'Issues', type: 'bar' }
                    ]}
                    height={240}
                  />
                </CardContent>
              </Card>
              
              <AISummaryCard 
                title="AI Performance Insights" 
                insights={[
                  <span>Team strength has improved by <strong>7%</strong> over the last 4 weeks. Continue the current strength training program.</span>,
                  <span>Consider increasing <strong>recovery periods</strong> for sprint athletes showing signs of fatigue.</span>,
                  <span>Recommend <strong>technique refinement</strong> for jumping events based on recent performance data.</span>
                ]}
              />
              
              <AISummaryCard 
                title="AI Health Recommendations" 
                insights={[
                  <span>Sleep quality is <strong>below target</strong> for 3 athletes. Schedule consultation with sleep specialist.</span>,
                  <span>Nutritional intake shows <strong>inadequate protein</strong> consumption post-training for team sprinters.</span>,
                  <span>Hydration levels are <strong>optimal</strong> across the team. Continue current hydration protocol.</span>
                ]}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="performance">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Performance metrics and detailed analysis will be displayed here.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="health">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Health Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Health metrics and wellness indicators will be displayed here.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="training">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Training Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Training schedules and progress tracking will be displayed here.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

function Users(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
