
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Activity, Zap, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Health() {
  // Sample data for health metrics
  const sleepData = [
    { day: 'Mon', hours: 7.5 },
    { day: 'Tue', hours: 8 },
    { day: 'Wed', hours: 6.5 },
    { day: 'Thu', hours: 7 },
    { day: 'Fri', hours: 7.2 },
    { day: 'Sat', hours: 8.5 },
    { day: 'Sun', hours: 9 },
  ];
  
  const heartRateData = [
    { time: '1am', rate: 62 },
    { time: '4am', rate: 58 },
    { time: '8am', rate: 72 },
    { time: '12pm', rate: 88 },
    { time: '4pm', rate: 95 },
    { time: '8pm', rate: 76 },
    { time: '11pm', rate: 68 },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Health</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
              <Heart className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">72 BPM</div>
              <p className="text-xs text-muted-foreground">Resting</p>
            </CardContent>
          </Card>
          
          <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recovery Score</CardTitle>
              <Zap className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <Progress value={85} className="h-2" />
            </CardContent>
          </Card>
          
          <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sleep Quality</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7.5 hrs</div>
              <p className="text-xs text-muted-foreground">+0.5 from average</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="injuries">Injury Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Health Summary</CardTitle>
                <CardDescription>
                  Your health metrics for the past week.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={heartRateData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="rate" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Heart rate throughout the day. Peak during afternoon training session.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="sleep">
            <Card>
              <CardHeader>
                <CardTitle>Sleep Analytics</CardTitle>
                <CardDescription>
                  Your sleep patterns and quality metrics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={sleepData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="hours" stroke="#0ea5e9" fill="#0ea5e9" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Deep Sleep</p>
                    <p className="text-2xl font-bold">2.3 hrs</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">REM Sleep</p>
                    <p className="text-2xl font-bold">1.7 hrs</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Sleep Efficiency</p>
                    <p className="text-2xl font-bold">92%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Resting Heart Rate</p>
                    <p className="text-2xl font-bold">58 bpm</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="nutrition">
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Tracking</CardTitle>
                <CardDescription>
                  Your daily nutritional intake and requirements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Calories</h3>
                      <span className="text-sm text-muted-foreground">2300 / 3000</span>
                    </div>
                    <Progress value={76.6} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Protein</h3>
                      <span className="text-sm text-muted-foreground">120g / 150g</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Carbohydrates</h3>
                      <span className="text-sm text-muted-foreground">250g / 350g</span>
                    </div>
                    <Progress value={71.4} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Hydration</h3>
                      <span className="text-sm text-muted-foreground">2.5L / 3.5L</span>
                    </div>
                    <Progress value={71.4} className="h-2" />
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Daily Recommendations</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                      Increase protein intake by 30g to support recovery
                    </li>
                    <li className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                      Add 1L more water throughout training sessions
                    </li>
                    <li className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                      Consider adding electrolytes after intense workouts
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="injuries">
            <Card>
              <CardHeader>
                <CardTitle>Injury Management</CardTitle>
                <CardDescription>
                  Track and manage injury recovery progress.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Minor Ankle Sprain</h3>
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-green-100 text-green-800">
                        85% Recovered
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Injury Date: March 15, 2023</p>
                    <Progress value={85} className="h-2 mb-4" />
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Recovery Plan</p>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4 text-green-500" /> 
                          March 15-20: Rest and RICE protocol
                        </li>
                        <li className="flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4 text-green-500" /> 
                          March 21-30: Physiotherapy (completed)
                        </li>
                        <li className="flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4 text-blue-500" /> 
                          April 1-15: Strength exercises (in progress)
                        </li>
                        <li className="flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4" /> 
                          April 16: Return to full training
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Hamstring Strain</h3>
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-green-100 text-green-800">
                        100% Recovered
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Injury Date: January 5, 2023</p>
                    <Progress value={100} className="h-2 mb-4" />
                    
                    <p className="text-sm">
                      Fully recovered - continue maintenance exercises to prevent recurrence.
                    </p>
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
