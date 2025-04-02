import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/StatCard';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { AthletePerformanceCard } from '@/components/dashboard/AthletePerformanceCard';
import { AISummaryCard } from '@/components/dashboard/AISummaryCard';
import { databaseService } from '@/services/databaseService';
import { Activity, ArrowDown, ArrowUp, CalendarDays, Clock, Dumbbell, Heart, LineChart, Trophy, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { normalizeAthlete, ExtendedAthlete } from '@/types/athlete';

// Sample data for charts
const performanceData = [
  { name: 'Jan', speed: 67, strength: 78, endurance: 56 },
  { name: 'Feb', speed: 69, strength: 75, endurance: 61 },
  { name: 'Mar', speed: 70, strength: 79, endurance: 65 },
  { name: 'Apr', speed: 72, strength: 82, endurance: 68 },
  { name: 'May', speed: 76, strength: 83, endurance: 70 },
  { name: 'Jun', speed: 80, strength: 85, endurance: 76 },
];

const workloadData = [
  { name: 'Mon', actual: 4, planned: 5 },
  { name: 'Tue', actual: 5, planned: 5 },
  { name: 'Wed', actual: 3, planned: 4 },
  { name: 'Thu', actual: 5, planned: 5 },
  { name: 'Fri', actual: 6, planned: 5 },
  { name: 'Sat', actual: 5, planned: 6 },
  { name: 'Sun', actual: 2, planned: 3 },
];

const healthData = [
  { name: 'Jan', stress: 42, recovery: 76, sleep: 85 },
  { name: 'Feb', stress: 48, recovery: 73, sleep: 82 },
  { name: 'Mar', stress: 40, recovery: 74, sleep: 87 },
  { name: 'Apr', stress: 35, recovery: 80, sleep: 89 },
  { name: 'May', stress: 38, recovery: 79, sleep: 88 },
  { name: 'Jun', stress: 30, recovery: 85, sleep: 92 },
];

export default function Dashboard() {
  const [athletes, setAthletes] = React.useState<ExtendedAthlete[]>([]);

  React.useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const athletesData = await databaseService.getAthletes();
        // Normalize the data to ensure it has all the required properties
        const normalizedAthletes = athletesData.map(normalizeAthlete);
        setAthletes(normalizedAthletes);
      } catch (error) {
        console.error('Error fetching athletes:', error);
      }
    };

    fetchAthletes();
  }, []);

  return (
    <Layout>
      <div className="flex-1 space-y-4 p-6 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <CalendarDays className="mr-2 h-4 w-4 opacity-50" />
            <span className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Athletes"
                value={athletes.length}
                icon={<Users className="h-4 w-4" />}
                trend={{ value: 12, isPositive: true }}
                description="vs last month"
              />
              <StatCard
                title="Training Sessions"
                value="24"
                icon={<Dumbbell className="h-4 w-4" />}
                trend={{ value: 8, isPositive: true }}
                description="this week"
              />
              <StatCard
                title="Average Performance"
                value="78%"
                icon={<LineChart className="h-4 w-4" />}
                trend={{ value: 5, isPositive: true }}
                description="vs last month"
              />
              <StatCard
                title="Team Health"
                value="92%"
                icon={<Heart className="h-4 w-4" />}
                trend={{ value: 3, isPositive: true }}
                description="team availability"
              />
            </div>
            
            <div className="grid gap-4 lg:grid-cols-3">
              <Card className="col-span-2 overflow-hidden">
                <CardHeader>
                  <CardTitle>Recent Performance</CardTitle>
                  <CardDescription>
                    Team performance metrics over the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PerformanceChart 
                    title=""
                    data={performanceData}
                    type="line"
                    dataKeys={[
                      { key: 'strength', color: '#4f46e5', name: 'Strength' },
                      { key: 'speed', color: '#0ea5e9', name: 'Speed' },
                      { key: 'endurance', color: '#10b981', name: 'Endurance' }
                    ]}
                    height={280}
                  />
                </CardContent>
              </Card>
              
              <AISummaryCard 
                title="AI Performance Analysis"
                insights={[
                  "Strength metrics improved 8% over the last month",
                  "Speed training shows positive response in 80% of athletes",
                  "Recovery time improved by 15% for players following the new protocol"
                ]}
              />
            </div>
            
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
              <PerformanceChart 
                title="Weekly Workload Distribution"
                data={workloadData}
                type="bar"
                dataKeys={[
                  { key: 'actual', color: '#4f46e5', name: 'Actual Load' },
                  { key: 'planned', color: '#94a3b8', name: 'Planned Load' }
                ]}
              />
              
              <PerformanceChart 
                title="Team Health Overview"
                data={healthData}
                type="area"
                dataKeys={[
                  { key: 'recovery', color: '#10b981', name: 'Recovery' },
                  { key: 'sleep', color: '#3b82f6', name: 'Sleep Quality' },
                  { key: 'stress', color: '#ef4444', name: 'Stress Level' }
                ]}
              />
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-4">Top Performing Athletes</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {athletes.slice(0, 3).map(athlete => (
                  <AthletePerformanceCard 
                    key={athlete.id}
                    athlete={athlete}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Other tab contents would go here */}
          <TabsContent value="performance">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Detailed performance metrics and analysis would be displayed here.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="health">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Health Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Detailed health metrics and analysis would be displayed here.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="training">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Training Programs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Training programs and schedules would be displayed here.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
