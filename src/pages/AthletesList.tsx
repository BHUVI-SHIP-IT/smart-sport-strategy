
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Search, UserPlus, Filter, MoreHorizontal, PlusCircle } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from "@/integrations/supabase/client";
import { databaseService } from '@/services/databaseService';
import { toast } from 'sonner';
import { normalizeAthlete, ExtendedAthlete } from '@/types/athlete';

// Form schema for adding new athletes
const athleteFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  sport: z.string().min(1, { message: "Sport is required" }),
  position: z.string().optional(),
  team: z.string().optional(),
  age: z.coerce.number().min(16).max(50),
  height: z.coerce.number().optional(),
  weight: z.coerce.number().optional(),
  status: z.enum(["active", "injured", "recovery", "off-season"]),
  email: z.string().email({ message: "Invalid email address" }),
  bio: z.string().optional(),
});

type AthleteFormValues = z.infer<typeof athleteFormSchema>;

export default function AthletesList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingAthlete, setIsAddingAthlete] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch athletes from Supabase
  const { data: athletesData, isLoading, error, refetch } = useQuery({
    queryKey: ['athletes'],
    queryFn: async () => {
      // Try to fetch from Supabase first
      const { data: supabaseAthletes, error } = await supabase
        .from('athletes')
        .select('*');

      if (error || !supabaseAthletes?.length) {
        console.log('Falling back to mock data');
        // Fallback to mock data if no athletes in Supabase or error
        const mockAthletes = await databaseService.getAthletes();
        return mockAthletes;
      }
      
      return supabaseAthletes;
    }
  });
  
  // Normalize athlete data
  const athletes = React.useMemo(() => {
    if (!athletesData) return [];
    return athletesData.map(athlete => normalizeAthlete(athlete));
  }, [athletesData]);
  
  // Setup form
  const form = useForm<AthleteFormValues>({
    resolver: zodResolver(athleteFormSchema),
    defaultValues: {
      name: '',
      sport: '',
      position: '',
      team: '',
      age: 18,
      status: 'active',
      email: '',
      bio: ''
    },
  });
  
  // Filter athletes based on search query and active filter
  const filteredAthletes = React.useMemo(() => {
    if (!athletes) return [];
    
    return athletes.filter(athlete => {
      const matchesSearch = 
        athlete.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        athlete.sport?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        athlete.position?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        athlete.team?.toLowerCase().includes(searchQuery.toLowerCase());
        
      // Apply active filter if any
      if (activeFilter) {
        if (activeFilter === 'status:active' && athlete.status !== 'active') return false;
        if (activeFilter === 'status:injured' && athlete.status !== 'injured') return false;
        if (activeFilter.startsWith('sport:') && athlete.sport !== activeFilter.split(':')[1]) return false;
      }
      
      return matchesSearch;
    });
  }, [athletes, searchQuery, activeFilter]);
  
  // Handle form submission
  const onSubmit = async (values: AthleteFormValues) => {
    try {
      // Try to add to Supabase
      const { data, error } = await supabase
        .from('athletes')
        .insert([{
          name: values.name,
          sport: values.sport,
          bio: values.bio || null,
          user_id: 'mock-user-id', // This would normally come from auth context
          // Additional fields that match your schema
        }])
        .select();
        
      if (error) throw error;
      
      // If successful, close dialog and refetch athletes
      toast.success(`${values.name} added successfully`);
      setIsAddingAthlete(false);
      form.reset();
      refetch();
    } catch (error) {
      console.error('Error adding athlete:', error);
      
      // Fallback to mock service
      try {
        await databaseService.createAthlete({
          name: values.name,
          age: values.age,
          sport: values.sport,
          team: values.team,
          position: values.position,
          status: values.status,
          contactInfo: {
            email: values.email,
          },
          performanceStats: {
            strengthScore: 75,
            speedScore: 80,
            enduranceScore: 70,
            agilityScore: 75,
            technicalScore: 70,
            tacticalScore: 65,
            mentalScore: 80,
            overallScore: 75,
          },
          career: {
            startDate: new Date().toISOString(),
          },
        });
        
        toast.success(`${values.name} added successfully`);
        setIsAddingAthlete(false);
        form.reset();
        refetch();
      } catch (fallbackError) {
        toast.error('Failed to add athlete');
      }
    }
  };
  
  // Handle view athlete details
  const handleViewAthlete = (id: string) => {
    navigate(`/athlete/${id}`);
  };
  
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Athletes</h1>
          <Dialog open={isAddingAthlete} onOpenChange={setIsAddingAthlete}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Athlete
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Athlete</DialogTitle>
                <DialogDescription>
                  Enter the athlete's information below. Required fields are marked with an asterisk.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age *</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="sport"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sport *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a sport" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Basketball">Basketball</SelectItem>
                              <SelectItem value="Soccer">Soccer</SelectItem>
                              <SelectItem value="Tennis">Tennis</SelectItem>
                              <SelectItem value="Baseball">Baseball</SelectItem>
                              <SelectItem value="Football">Football</SelectItem>
                              <SelectItem value="Golf">Golf</SelectItem>
                              <SelectItem value="Hockey">Hockey</SelectItem>
                              <SelectItem value="Swimming">Swimming</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g., Forward, Goalkeeper" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="team"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team</FormLabel>
                          <FormControl>
                            <Input placeholder="Team name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="injured">Injured</SelectItem>
                              <SelectItem value="recovery">Recovery</SelectItem>
                              <SelectItem value="off-season">Off-Season</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height (cm)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Height in cm" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight (kg)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Weight in kg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Brief description of the athlete's background" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="submit">Add Athlete</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActiveFilter(null)}>
                All Athletes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveFilter('status:active')}>
                Active Athletes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveFilter('status:injured')}>
                Injured Athletes
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActiveFilter('sport:Basketball')}>
                Basketball
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveFilter('sport:Soccer')}>
                Soccer
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveFilter('sport:Tennis')}>
                Tennis
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <Tabs defaultValue="roster" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="roster">Roster</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="sponsorship">Sponsorships</TabsTrigger>
          </TabsList>
          
          <TabsContent value="roster">
            <Card>
              <CardHeader>
                <CardTitle>Athlete Roster</CardTitle>
                <CardDescription>
                  Manage your athletes and view their details.
                  {activeFilter && (
                    <Badge variant="outline" className="ml-2">
                      {activeFilter.replace(':', ': ')}
                    </Badge>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                  </div>
                ) : error ? (
                  <div className="text-center py-8 text-destructive">
                    Error loading athletes. Please try again.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Athlete</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead className="hidden md:table-cell">Team</TableHead>
                        <TableHead className="hidden md:table-cell">Status</TableHead>
                        <TableHead className="hidden lg:table-cell">Sport</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAthletes.length > 0 ? (
                        filteredAthletes.map((athlete) => (
                          <TableRow key={athlete.id} className="cursor-pointer" onClick={() => handleViewAthlete(athlete.id)}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={athlete.profileImage || athlete.image_url} />
                                  <AvatarFallback>{athlete.name?.split(' ').map(n => n[0]).join('') || 'A'}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{athlete.name}</p>
                                  <p className="text-xs text-muted-foreground md:hidden">
                                    {athlete.position || 'N/A'} · {athlete.sport}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{athlete.position || 'N/A'}</TableCell>
                            <TableCell className="hidden md:table-cell">{athlete.team || 'N/A'}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              <Badge variant={athlete.status === 'active' ? "outline" : athlete.status === 'injured' ? "destructive" : "secondary"} className="capitalize">
                                {athlete.status || 'active'}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">{athlete.sport}</TableCell>
                            <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => handleViewAthlete(athlete.id)}>
                                    View Profile
                                  </DropdownMenuItem>
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
                            {athletes?.length ? 'No athletes matching your search criteria.' : 'No athletes in the database. Add your first athlete.'}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
              {athletes?.length > 0 && (
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredAthletes.length} of {athletes.length} athletes
                  </p>
                  {filteredAthletes.length < athletes.length && (
                    <Button variant="ghost" size="sm" onClick={() => setSearchQuery('')}>
                      Reset Filters
                    </Button>
                  )}
                </CardFooter>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="teams">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Extract unique teams from athletes */}
              {[...new Set(athletes?.map(a => a.team).filter(Boolean))].map((team, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{team}</CardTitle>
                    <CardDescription>
                      {athletes?.filter(a => a.team === team).length} athletes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {athletes?.filter(a => a.team === team).map((athlete) => (
                        <div key={athlete.id} className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-2 rounded" onClick={() => handleViewAthlete(athlete.id)}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{athlete.name?.split(' ').map(n => n[0]).join('') || 'A'}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{athlete.name}</p>
                              <p className="text-xs text-muted-foreground">{athlete.position || 'N/A'}</p>
                            </div>
                          </div>
                          <Badge variant={athlete.status === 'active' ? "outline" : "destructive"} className="capitalize">
                            {athlete.status || 'active'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full">Manage Team</Button>
                  </CardFooter>
                </Card>
              ))}
              
              {/* Add New Team Card */}
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center min-h-[250px] cursor-pointer hover:bg-muted/50">
                  <PlusCircle className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="font-medium">Create New Team</p>
                </CardContent>
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
                        <TableHead className="hidden md:table-cell">Sport</TableHead>
                        <TableHead className="hidden md:table-cell">Performance</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAthletes.map((athlete) => (
                        <TableRow key={athlete.id} className="cursor-pointer" onClick={() => handleViewAthlete(athlete.id)}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>{athlete.name?.split(' ').map(n => n[0]).join('') || 'A'}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{athlete.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{athlete.age || 'N/A'}</TableCell>
                          <TableCell>{athlete.height ? `${athlete.height} cm` : 'N/A'}</TableCell>
                          <TableCell>{athlete.weight ? `${athlete.weight} kg` : 'N/A'}</TableCell>
                          <TableCell className="hidden md:table-cell">{athlete.sport}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center gap-2">
                              <div className={`h-2 w-2 rounded-full ${
                                (athlete.performanceStats?.overallScore || 0) > 85 ? 'bg-green-500' : 
                                (athlete.performanceStats?.overallScore || 0) > 70 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}></div>
                              <span>{
                                (athlete.performanceStats?.overallScore || 0) > 85 ? 'High' : 
                                (athlete.performanceStats?.overallScore || 0) > 70 ? 'Medium' : 'Low'
                              }</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={athlete.status === 'active' ? "outline" : athlete.status === 'injured' ? "destructive" : "secondary"} className="capitalize">
                              {athlete.status || 'active'}
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
          
          <TabsContent value="sponsorship">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Sponsorships</CardTitle>
                  <CardDescription>
                    Current brand partnerships with athletes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {athletes?.flatMap(athlete => 
                      athlete.career?.sponsorships?.filter(s => s.status === 'active')
                      .map((sponsorship, idx) => (
                        <div key={`${athlete.id}-${idx}`} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{sponsorship.company?.charAt(0) || 'S'}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{sponsorship.company}</p>
                              <p className="text-xs text-muted-foreground">
                                Partner with {athlete.name}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${(sponsorship.value / 1000).toFixed(0)}K</p>
                            <p className="text-xs text-muted-foreground">annual</p>
                          </div>
                        </div>
                      ))
                    ).slice(0, 5) || (
                      <div className="text-center text-muted-foreground py-4">
                        No active sponsorships found
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Manage Sponsorships</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Sponsorship Opportunities</CardTitle>
                  <CardDescription>
                    Available sponsorship deals for athletes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between hover:bg-muted/50 p-3 rounded-lg cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="font-semibold text-blue-600">N</span>
                        </div>
                        <div>
                          <p className="font-medium">Nike Sports</p>
                          <p className="text-xs text-muted-foreground">Seeking basketball players</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                    
                    <div className="flex items-center justify-between hover:bg-muted/50 p-3 rounded-lg cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="font-semibold text-red-600">G</span>
                        </div>
                        <div>
                          <p className="font-medium">Gatorade</p>
                          <p className="text-xs text-muted-foreground">All sports eligible</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                    
                    <div className="flex items-center justify-between hover:bg-muted/50 p-3 rounded-lg cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="font-semibold text-green-600">UA</span>
                        </div>
                        <div>
                          <p className="font-medium">Under Armour</p>
                          <p className="text-xs text-muted-foreground">Football and basketball</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Browse All Opportunities</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
