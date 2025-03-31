
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Activity, BookOpen, Clock, Download, FileText, Play, Plus, Trophy, Users } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Training() {
  // Sample training data
  const trainingPrograms = [
    { id: 1, name: 'Pre-Season Conditioning', type: 'Team', sessions: 12, completed: 8, status: 'In Progress' },
    { id: 2, name: 'Skill Development', type: 'Individual', sessions: 8, completed: 8, status: 'Completed' },
    { id: 3, name: 'Tactical Formation', type: 'Team', sessions: 6, completed: 2, status: 'In Progress' },
    { id: 4, name: 'Recovery Protocol', type: 'Recovery', sessions: 4, completed: 1, status: 'In Progress' },
  ];

  const upcomingSessions = [
    { id: 1, title: 'Team Conditioning', time: 'Today, 9:00 AM', duration: '90 min', type: 'Endurance' },
    { id: 2, title: 'Technical Drills', time: 'Tomorrow, 10:30 AM', duration: '60 min', type: 'Skills' },
    { id: 3, title: 'Tactical Session', time: 'Apr 13, 9:00 AM', duration: '120 min', type: 'Strategy' },
  ];
  
  const recentSessions = [
    { id: 1, title: 'Speed Training', date: 'Yesterday', duration: '45 min', performance: 'Good' },
    { id: 2, title: 'Recovery Session', date: '2 days ago', duration: '30 min', performance: 'Excellent' },
    { id: 3, title: 'Team Tactics', date: '3 days ago', duration: '90 min', performance: 'Average' },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Training</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Program
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">4 total programs</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Next: Today at 9:00 AM</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <Progress value={92} className="h-2" />
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="programs" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="library">Exercise Library</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="programs">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {trainingPrograms.map((program) => (
                <Card key={program.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{program.name}</CardTitle>
                      <Badge>{program.type}</Badge>
                    </div>
                    <CardDescription>{program.sessions} sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{program.completed}/{program.sessions} sessions</span>
                        </div>
                        <Progress value={(program.completed / program.sessions) * 100} />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Status</p>
                          <p className="font-medium">{program.status}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Assigned To</p>
                          <div className="flex -space-x-2">
                            <Avatar className="h-6 w-6 border-2 border-background">
                              <AvatarFallback>MJ</AvatarFallback>
                            </Avatar>
                            <Avatar className="h-6 w-6 border-2 border-background">
                              <AvatarFallback>ST</AvatarFallback>
                            </Avatar>
                            <Avatar className="h-6 w-6 border-2 border-background">
                              <AvatarFallback>DR</AvatarFallback>
                            </Avatar>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs">+3</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="ghost" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      Details
                    </Button>
                    <Button size="sm">
                      <Play className="mr-2 h-4 w-4" />
                      Start Session
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="sessions">
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Training Sessions</CardTitle>
                  <CardDescription>
                    Your scheduled training sessions for the next 7 days.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Session</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingSessions.map((session) => (
                        <TableRow key={session.id}>
                          <TableCell className="font-medium">
                            {session.title}
                          </TableCell>
                          <TableCell>{session.time}</TableCell>
                          <TableCell>{session.duration}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{session.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">View</Button>
                              <Button size="sm">Start</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Sessions</CardTitle>
                  <CardDescription>
                    Your recently completed training sessions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Session</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Performance</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentSessions.map((session) => (
                        <TableRow key={session.id}>
                          <TableCell className="font-medium">
                            {session.title}
                          </TableCell>
                          <TableCell>{session.date}</TableCell>
                          <TableCell>{session.duration}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`h-2 w-2 rounded-full ${
                                session.performance === 'Excellent' ? 'bg-green-500' : 
                                session.performance === 'Good' ? 'bg-blue-500' : 'bg-yellow-500'
                              }`}></div>
                              <span>{session.performance}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              <Download className="mr-2 h-4 w-4" />
                              Report
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="library">
            <Card>
              <CardHeader>
                <CardTitle>Exercise Library</CardTitle>
                <CardDescription>
                  Browse and manage training exercises and drills.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Strength & Power</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm">32 exercises</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full">Browse</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Speed & Agility</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm">24 exercises</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full">Browse</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Technical Skills</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm">48 exercises</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full">Browse</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Tactical Drills</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm">18 exercises</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full">Browse</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Recovery</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm">16 exercises</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full">Browse</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Team Building</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm">12 exercises</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full">Browse</Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Custom Exercise
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Training Reports</CardTitle>
                <CardDescription>
                  Analytics and insights from your training sessions.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">Team Performance</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">78%</div>
                      <p className="text-xs text-muted-foreground">+5% from last month</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">Sessions Completed</CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24/28</div>
                      <p className="text-xs text-muted-foreground">85.7% completion rate</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">Training Hours</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">32.5</div>
                      <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Available Reports</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Monthly Performance Summary
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Individual Progress Report
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Team Training Analysis
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Injury Prevention Metrics
                    </Button>
                  </div>
                </div>
                
                <div>
                  <p className="text-center text-muted-foreground">
                    Advanced reporting features will be available in a future update.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
