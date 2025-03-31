
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarIcon, Clock, MapPin, User, Users, Filter, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Calendar() {
  // Sample calendar data
  const events = [
    { id: 1, title: 'Team Training', date: 'Today, 9:00 AM', type: 'training', location: 'Main Field', attendees: 18 },
    { id: 2, title: 'Strength & Conditioning', date: 'Today, 2:00 PM', type: 'fitness', location: 'Gym', attendees: 8 },
    { id: 3, title: 'Tactical Analysis', date: 'Today, 4:30 PM', type: 'meeting', location: 'Video Room', attendees: 22 },
    { id: 4, title: 'Recovery Session', date: 'Tomorrow, 10:00 AM', type: 'recovery', location: 'Recovery Center', attendees: 12 },
    { id: 5, title: 'Match vs. Rivals', date: 'Apr 12, 3:00 PM', type: 'match', location: 'Stadium', attendees: 24 },
    { id: 6, title: 'Individual Skills', date: 'Apr 13, 11:00 AM', type: 'training', location: 'Practice Field', attendees: 6 },
  ];
  
  // Generate calendar grid
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Calendar</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button size="sm">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">April 2023</h2>
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Select defaultValue="month">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day View</SelectItem>
              <SelectItem value="week">Week View</SelectItem>
              <SelectItem value="month">Month View</SelectItem>
              <SelectItem value="agenda">Agenda View</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Tabs defaultValue="month" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
          
          <TabsContent value="month">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="text-center text-sm font-medium">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {/* Previous month days (greyed out) */}
                  {[28, 29, 30, 31].map((day) => (
                    <div key={`prev-${day}`} className="h-24 p-1 border rounded-md bg-muted/20">
                      <span className="text-sm text-muted-foreground">{day}</span>
                    </div>
                  ))}
                  
                  {/* Current month days */}
                  {daysInMonth.slice(0, 27).map((day) => (
                    <div 
                      key={day} 
                      className={`h-24 p-1 border rounded-md ${day === 10 ? 'ring-2 ring-primary ring-opacity-50' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <span className={`text-sm ${day === 10 ? 'font-bold' : ''}`}>{day}</span>
                        {day === 10 && <span className="text-xs bg-blue-100 text-blue-800 px-1.5 rounded-full">Today</span>}
                      </div>
                      
                      {/* Events on specific days */}
                      {day === 10 && (
                        <div className="mt-1 space-y-1">
                          <div className="bg-primary/10 text-xs p-1 rounded truncate border-l-2 border-primary">
                            9:00 AM Team Training
                          </div>
                          <div className="bg-pink-100 text-xs p-1 rounded truncate border-l-2 border-pink-500">
                            2:00 PM Strength
                          </div>
                          <div className="bg-amber-100 text-xs p-1 rounded truncate border-l-2 border-amber-500">
                            4:30 PM Analysis
                          </div>
                        </div>
                      )}
                      {day === 11 && (
                        <div className="mt-1 space-y-1">
                          <div className="bg-green-100 text-xs p-1 rounded truncate border-l-2 border-green-500">
                            10:00 AM Recovery
                          </div>
                        </div>
                      )}
                      {day === 12 && (
                        <div className="mt-1 space-y-1">
                          <div className="bg-red-100 text-xs p-1 rounded truncate border-l-2 border-red-500">
                            3:00 PM Match
                          </div>
                        </div>
                      )}
                      {day === 13 && (
                        <div className="mt-1 space-y-1">
                          <div className="bg-primary/10 text-xs p-1 rounded truncate border-l-2 border-primary">
                            11:00 AM Skills
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="list">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>
                  Your schedule for the next 7 days.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-sm font-medium">Today</h3>
                    <div className="space-y-3">
                      {events.filter(event => event.date.includes('Today')).map((event) => (
                        <div key={event.id} className="flex items-start border rounded-lg p-3 hover:bg-muted/50">
                          <div className={`
                            flex h-10 w-10 items-center justify-center rounded-full mr-3
                            ${event.type === 'training' ? 'bg-primary/20 text-primary' : ''}
                            ${event.type === 'fitness' ? 'bg-pink-100 text-pink-700' : ''}
                            ${event.type === 'meeting' ? 'bg-amber-100 text-amber-700' : ''}
                            ${event.type === 'recovery' ? 'bg-green-100 text-green-700' : ''}
                            ${event.type === 'match' ? 'bg-red-100 text-red-700' : ''}
                          `}>
                            {event.type === 'training' && <Users className="h-5 w-5" />}
                            {event.type === 'fitness' && <CalendarIcon className="h-5 w-5" />}
                            {event.type === 'meeting' && <User className="h-5 w-5" />}
                            {event.type === 'recovery' && <CalendarIcon className="h-5 w-5" />}
                            {event.type === 'match' && <CalendarIcon className="h-5 w-5" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">{event.title}</h4>
                              <Badge variant={event.type === 'match' ? 'destructive' : 'outline'}>
                                {event.type}
                              </Badge>
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{event.date.split(', ')[1]}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-0.5">
                                <MapPin className="h-3.5 w-3.5" />
                                <span>{event.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-4 text-sm font-medium">Tomorrow</h3>
                    <div className="space-y-3">
                      {events.filter(event => event.date.includes('Tomorrow')).map((event) => (
                        <div key={event.id} className="flex items-start border rounded-lg p-3 hover:bg-muted/50">
                          <div className={`
                            flex h-10 w-10 items-center justify-center rounded-full mr-3
                            ${event.type === 'recovery' ? 'bg-green-100 text-green-700' : ''}
                          `}>
                            {event.type === 'recovery' && <CalendarIcon className="h-5 w-5" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">{event.title}</h4>
                              <Badge variant="outline">{event.type}</Badge>
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{event.date.split(', ')[1]}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-0.5">
                                <MapPin className="h-3.5 w-3.5" />
                                <span>{event.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-4 text-sm font-medium">Later This Week</h3>
                    <div className="space-y-3">
                      {events.filter(event => !event.date.includes('Today') && !event.date.includes('Tomorrow')).map((event) => (
                        <div key={event.id} className="flex items-start border rounded-lg p-3 hover:bg-muted/50">
                          <div className={`
                            flex h-10 w-10 items-center justify-center rounded-full mr-3
                            ${event.type === 'training' ? 'bg-primary/20 text-primary' : ''}
                            ${event.type === 'match' ? 'bg-red-100 text-red-700' : ''}
                          `}>
                            {event.type === 'training' && <Users className="h-5 w-5" />}
                            {event.type === 'match' && <CalendarIcon className="h-5 w-5" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">{event.title}</h4>
                              <Badge variant={event.type === 'match' ? 'destructive' : 'outline'}>
                                {event.type}
                              </Badge>
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="h-3.5 w-3.5" />
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-0.5">
                                <MapPin className="h-3.5 w-3.5" />
                                <span>{event.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="week">
            <Card>
              <CardHeader>
                <CardTitle>Week View</CardTitle>
                <CardDescription>
                  April 10 - April 16, 2023
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-muted-foreground">Week view will be available in a future update.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="day">
            <Card>
              <CardHeader>
                <CardTitle>Day View</CardTitle>
                <CardDescription>
                  April 10, 2023
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-muted-foreground">Day view will be available in a future update.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
