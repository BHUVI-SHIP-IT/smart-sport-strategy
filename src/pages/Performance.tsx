import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Activity, ArrowDown, ArrowUp, BarChart as BarChartIcon, Calendar, Download, Filter, TrendingUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChart, BarChart, LineChart } from '@/components/ui/charts';

export default function Performance() {
  // Sample data for charts and stats
  const performanceOverTime = {
    data: [
      { name: 'Jan', value: 65 },
      { name: 'Feb', value: 70 },
      { name: 'Mar', value: 68 },
      { name: 'Apr', value: 75 },
      { name: 'May', value: 82 },
      { name: 'Jun', value: 78 },
    ],
  };
  
  const performanceCategories = {
    data: [
      { name: 'Speed', value: 85 },
      { name: 'Strength', value: 72 },
      { name: 'Endurance', value: 78 },
      { name: 'Agility', value: 88 },
      { name: 'Technical', value: 80 },
      { name: 'Tactical', value: 75 },
      { name: 'Mental', value: 82 },
    ],
  };
  
  const recentPerformances = [
    { id: 1, event: 'League Match vs Titans', date: 'June 12, 2023', rating: 8.5, highlight: 'Match-winning performance' },
    { id: 2, event: 'Championship Quarterfinal', date: 'May 30, 2023', rating: 7.8, highlight: 'Strong defensive contribution' },
    { id: 3, event: 'Regional Tournament', date: 'May 15, 2023', rating: 9.2, highlight: 'Tournament MVP' },
    { id: 4, event: 'League Match vs Knights', date: 'May 2, 2023', rating: 6.5, highlight: 'Limited impact due to injury' },
  ];
  
  const keyPerformanceIndicators = [
    { id: 1, name: 'Reaction Time', value: '0.25s', change: -0.02, trend: 'down', trendLabel: 'better' },
    { id: 2, name: 'Vertical Jump', value: '32.5 in', change: 1.5, trend: 'up', trendLabel: 'better' },
    { id: 3, name: 'Sprint Speed', value: '8.2s', change: -0.3, trend: 'down', trendLabel: 'better' },
    { id: 4, name: 'Endurance Test', value: '15.2km', change: 0.8, trend: 'up', trendLabel: 'better' },
    { id: 5, name: 'Recovery Rate', value: '96%', change: 2, trend: 'up', trendLabel: 'better' },
  ];
  
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Performance Analytics</h1>
          <div className="flex items-center space-x-2">
            <Select defaultValue="season">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="season">Current Season</SelectItem>
                <SelectItem value="year">Last 12 Months</SelectItem>
                <SelectItem value="quarter">Last 3 Months</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82/100</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-green-500">+5%</span> from last evaluation
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Games Analyzed</CardTitle>
              <BarChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Current season</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Evaluation</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">June 28</div>
              <p className="text-xs text-muted-foreground">In 12 days</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Performance Overview</TabsTrigger>
            <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
            <TabsTrigger value="history">Performance History</TabsTrigger>
            <TabsTrigger value="compare">Compare</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Over Time</CardTitle>
                  <CardDescription>
                    Overall performance rating across the current season
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <LineChart
                    data={performanceOverTime.data}
                    index="name"
                    categories={["value"]}
                    colors={["blue"]}
                    yAxisWidth={40}
                    showAnimation={true}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Performance Categories</CardTitle>
                  <CardDescription>
                    Breakdown by performance categories
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <BarChart
                    data={performanceCategories.data}
                    index="name"
                    categories={["value"]}
                    colors={["blue"]}
                    showAnimation={true}
                    showLegend={false}
                    valueFormatter={(value) => `${value}/100`}
                  />
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Performances</CardTitle>
                  <CardDescription>
                    Your performance ratings from recent events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Highlight</TableHead>
                        <TableHead>Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentPerformances.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.event}</TableCell>
                          <TableCell>{item.date}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className={item.rating >= 8 ? "text-green-500 font-semibold" : 
                                      item.rating >= 7 ? "text-blue-500" : "text-amber-500"}>
                                {item.rating}
                              </span>
                              <span className="text-muted-foreground">/10</span>
                            </div>
                          </TableCell>
                          <TableCell>{item.highlight}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Performance Records</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="metrics">
            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
                <CardDescription>
                  Critical metrics tracking your athletic performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {keyPerformanceIndicators.map((kpi) => (
                    <div key={kpi.id} className="flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{kpi.name}</span>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">{kpi.value}</span>
                          <div className={`flex items-center ${
                            (kpi.trend === 'up' && kpi.trendLabel === 'better') || (kpi.trend === 'down' && kpi.trendLabel === 'worse') 
                              ? 'text-green-500' 
                              : 'text-red-500'
                          }`}>
                            {kpi.trend === 'up' ? (
                              <ArrowUp className="h-4 w-4" />
                            ) : (
                              <ArrowDown className="h-4 w-4" />
                            )}
                            <span className="text-xs">{Math.abs(kpi.change)}</span>
                          </div>
                        </div>
                      </div>
                      <Progress value={kpi.name === 'Reaction Time' ? 85 : 
                                kpi.name === 'Vertical Jump' ? 78 :
                                kpi.name === 'Sprint Speed' ? 90 :
                                kpi.name === 'Endurance Test' ? 82 : 88} />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Previous: {
                          kpi.name === 'Reaction Time' ? `${(parseFloat(kpi.value) + 0.02).toFixed(2)}s` : 
                          kpi.name === 'Vertical Jump' ? `${parseFloat(kpi.value) - 1.5} in` :
                          kpi.name === 'Sprint Speed' ? `${(parseFloat(kpi.value) + 0.3).toFixed(1)}s` :
                          kpi.name === 'Endurance Test' ? `${parseFloat(kpi.value) - 0.8}km` :
                          `${parseInt(kpi.value) - 2}%`
                        }</span>
                        <span>Target: {
                          kpi.name === 'Reaction Time' ? '0.22s' : 
                          kpi.name === 'Vertical Jump' ? '34 in' :
                          kpi.name === 'Sprint Speed' ? '8.0s' :
                          kpi.name === 'Endurance Test' ? '16.0km' :
                          '98%'
                        }</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Record New Metrics</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Performance History</CardTitle>
                <CardDescription>
                  Long-term performance trends and historical data
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <AreaChart
                  data={[
                    { date: '2020-Q1', performance: 62, form: 58, potential: 75 },
                    { date: '2020-Q2', performance: 65, form: 61, potential: 75 },
                    { date: '2020-Q3', performance: 67, form: 64, potential: 76 },
                    { date: '2020-Q4', performance: 70, form: 68, potential: 76 },
                    { date: '2021-Q1', performance: 72, form: 69, potential: 77 },
                    { date: '2021-Q2', performance: 68, form: 65, potential: 77 },
                    { date: '2021-Q3', performance: 74, form: 72, potential: 78 },
                    { date: '2021-Q4', performance: 77, form: 75, potential: 78 },
                    { date: '2022-Q1', performance: 75, form: 73, potential: 79 },
                    { date: '2022-Q2', performance: 78, form: 76, potential: 79 },
                    { date: '2022-Q3', performance: 80, form: 78, potential: 80 },
                    { date: '2022-Q4', performance: 79, form: 76, potential: 80 },
                    { date: '2023-Q1', performance: 82, form: 80, potential: 81 },
                    { date: '2023-Q2', performance: 85, form: 82, potential: 81 },
                  ]}
                  index="date"
                  categories={["performance", "form", "potential"]}
                  colors={["blue", "green", "gray"]}
                  showAnimation={true}
                  showLegend={true}
                  valueFormatter={(value) => `${value}%`}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Performance</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Current Form</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-gray-400"></div>
                    <span className="text-sm">Potential</span>
                  </div>
                </div>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="compare">
            <Card>
              <CardHeader>
                <CardTitle>Performance Comparison</CardTitle>
                <CardDescription>
                  Compare your performance against benchmarks and peers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Against Team Average</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {["Speed", "Strength", "Endurance", "Technical"].map((category) => (
                        <Card key={category}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">{category}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between mb-1 text-sm">
                              <span>You</span>
                              <span className="font-medium">{
                                category === "Speed" ? "85" : 
                                category === "Strength" ? "72" : 
                                category === "Endurance" ? "78" : "80"
                              }</span>
                            </div>
                            <Progress value={
                              category === "Speed" ? 85 : 
                              category === "Strength" ? 72 : 
                              category === "Endurance" ? 78 : 80
                            } className="h-2 mb-3" />
                            
                            <div className="flex items-center justify-between mb-1 text-sm">
                              <span>Team Avg</span>
                              <span className="font-medium">{
                                category === "Speed" ? "79" : 
                                category === "Strength" ? "75" : 
                                category === "Endurance" ? "74" : "76"
                              }</span>
                            </div>
                            <Progress value={
                              category === "Speed" ? 79 : 
                              category === "Strength" ? 75 : 
                              category === "Endurance" ? 74 : 76
                            } className="h-2" />
                            
                            <div className="mt-2 text-xs text-center">
                              <Badge variant={
                                (category === "Speed" || category === "Endurance" || category === "Technical") 
                                ? "default" : "secondary"
                              }>
                                {
                                  category === "Speed" ? "+7.6%" : 
                                  category === "Strength" ? "-4.0%" : 
                                  category === "Endurance" ? "+5.4%" : "+5.3%"
                                }
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Against Position Benchmark</h3>
                    <Card>
                      <CardContent className="pt-6">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Metric</TableHead>
                              <TableHead>Your Value</TableHead>
                              <TableHead>Position Average</TableHead>
                              <TableHead>Elite Level</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>Max Speed</TableCell>
                              <TableCell>32 km/h</TableCell>
                              <TableCell>30 km/h</TableCell>
                              <TableCell>34 km/h</TableCell>
                              <TableCell>
                                <Badge>Above Average</Badge>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Vertical Jump</TableCell>
                              <TableCell>32.5 in</TableCell>
                              <TableCell>30 in</TableCell>
                              <TableCell>36 in</TableCell>
                              <TableCell>
                                <Badge>Above Average</Badge>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Stamina Test</TableCell>
                              <TableCell>Level 12</TableCell>
                              <TableCell>Level 11</TableCell>
                              <TableCell>Level 14</TableCell>
                              <TableCell>
                                <Badge>Above Average</Badge>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Reaction Time</TableCell>
                              <TableCell>0.25s</TableCell>
                              <TableCell>0.28s</TableCell>
                              <TableCell>0.22s</TableCell>
                              <TableCell>
                                <Badge>Above Average</Badge>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Technical Precision</TableCell>
                              <TableCell>78%</TableCell>
                              <TableCell>75%</TableCell>
                              <TableCell>85%</TableCell>
                              <TableCell>
                                <Badge>Above Average</Badge>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
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
