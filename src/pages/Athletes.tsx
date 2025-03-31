
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, UserPlus, Filter, ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export default function Athletes() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample athlete data
  const athletes = [
    { id: 1, name: 'Michael Johnson', position: 'Forward', team: 'First Team', status: 'Active', performance: 'High', age: 24, height: '6\'2"', weight: '185 lbs' },
    { id: 2, name: 'Sarah Thompson', position: 'Midfielder', team: 'First Team', status: 'Active', performance: 'Medium', age: 22, height: '5\'8"', weight: '145 lbs' },
    { id: 3, name: 'David Rodriguez', position: 'Defender', team: 'First Team', status: 'Injured', performance: 'Low', age: 25, height: '6\'0"', weight: '178 lbs' },
    { id: 4, name: 'Emma Wilson', position: 'Forward', team: 'Youth Team', status: 'Active', performance: 'High', age: 19, height: '5\'7"', weight: '140 lbs' },
    { id: 5, name: 'James Parker', position: 'Goalkeeper', team: 'First Team', status: 'Active', performance: 'Medium', age: 28, height: '6\'3"', weight: '195 lbs' },
    { id: 6, name: 'Olivia Martinez', position: 'Midfielder', team: 'Youth Team', status: 'Active', performance: 'High', age: 20, height: '5\'6"', weight: '138 lbs' },
    { id: 7, name: 'William Chen', position: 'Defender', team: 'Reserve Team', status: 'Active', performance: 'Medium', age: 23, height: '5\'11"', weight: '172 lbs' },
    { id: 8, name: 'Sophia Ahmed', position: 'Forward', team: 'Youth Team', status: 'Inactive', performance: 'Low', age: 18, height: '5\'9"', weight: '148 lbs' },
  ];

  // Filter athletes based on search query
  const filteredAthletes = athletes.filter(athlete => 
    athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    athlete.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    athlete.team.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Athletes</h1>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Athlete
          </Button>
        </div>

        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search athletes..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        
        <Tabs defaultValue="roster" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="roster">Roster</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="development">Development</TabsTrigger>
          </TabsList>
          
          <TabsContent value="roster">
            <Card>
              <CardHeader>
                <CardTitle>Athlete Roster</CardTitle>
                <CardDescription>
                  Manage your athletes and view their details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Athlete</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead className="hidden md:table-cell">Team</TableHead>
                      <TableHead className="hidden md:table-cell">Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Performance</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAthletes.length > 0 ? (
                      filteredAthletes.map((athlete) => (
                        <TableRow key={athlete.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback>{athlete.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{athlete.name}</p>
                                <p className="text-xs text-muted-foreground md:hidden">
                                  {athlete.position} · {athlete.team}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{athlete.position}</TableCell>
                          <TableCell className="hidden md:table-cell">{athlete.team}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge variant={athlete.status === 'Active' ? 'outline' : athlete.status === 'Injured' ? 'destructive' : 'secondary'}>
                              {athlete.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex items-center gap-2">
                              <div className={`h-2 w-2 rounded-full ${
                                athlete.performance === 'High' ? 'bg-green-500' : 
                                athlete.performance === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                              }`}></div>
                              <span>{athlete.performance}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                <DropdownMenuItem>Performance Report</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Change Team</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  Remove Athlete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No athletes found matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="teams">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>First Team</CardTitle>
                  <CardDescription>
                    Main competitive squad
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {athletes.filter(a => a.team === 'First Team').map((athlete) => (
                      <div key={athlete.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{athlete.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{athlete.name}</p>
                            <p className="text-xs text-muted-foreground">{athlete.position}</p>
                          </div>
                        </div>
                        <Badge variant={athlete.status === 'Active' ? 'outline' : 'destructive'}>
                          {athlete.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full">Manage Team</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Reserve Team</CardTitle>
                  <CardDescription>
                    Secondary competitive squad
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {athletes.filter(a => a.team === 'Reserve Team').map((athlete) => (
                      <div key={athlete.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{athlete.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{athlete.name}</p>
                            <p className="text-xs text-muted-foreground">{athlete.position}</p>
                          </div>
                        </div>
                        <Badge variant="outline">{athlete.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full">Manage Team</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Youth Team</CardTitle>
                  <CardDescription>
                    Development squad
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {athletes.filter(a => a.team === 'Youth Team').map((athlete) => (
                      <div key={athlete.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{athlete.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{athlete.name}</p>
                            <p className="text-xs text-muted-foreground">{athlete.position}</p>
                          </div>
                        </div>
                        <Badge variant={athlete.status === 'Active' ? 'outline' : 'secondary'}>
                          {athlete.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full">Manage Team</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Athlete Statistics</CardTitle>
                <CardDescription>
                  Performance metrics and statistics for all athletes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Athlete</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Height</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead>Games</TableHead>
                        <TableHead>Performance</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {athletes.map((athlete) => (
                        <TableRow key={athlete.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>{athlete.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{athlete.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{athlete.age}</TableCell>
                          <TableCell>{athlete.height}</TableCell>
                          <TableCell>{athlete.weight}</TableCell>
                          <TableCell>{Math.floor(Math.random() * 30) + 5}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`h-2 w-2 rounded-full ${
                                athlete.performance === 'High' ? 'bg-green-500' : 
                                athlete.performance === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                              }`}></div>
                              <span>{athlete.performance}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={athlete.status === 'Active' ? 'outline' : athlete.status === 'Injured' ? 'destructive' : 'secondary'}>
                              {athlete.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="development">
            <Card>
              <CardHeader>
                <CardTitle>Athlete Development</CardTitle>
                <CardDescription>
                  Track progress and development plans for athletes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-muted-foreground">Development tracking features will be available in a future update.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
