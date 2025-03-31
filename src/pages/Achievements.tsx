
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Award, Calendar, Medal, Plus, Star, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function Achievements() {
  // Sample achievement data
  const recentAchievements = [
    {
      id: 1,
      title: "Regional Championship MVP",
      date: "April 15, 2023",
      category: "Team Sport",
      description: "Named Most Valuable Player in the regional championship finals."
    },
    {
      id: 2,
      title: "Personal Best: 100m Sprint",
      date: "March 22, 2023",
      category: "Individual",
      description: "Set a new personal record of 10.85 seconds in the 100m sprint."
    },
    {
      id: 3,
      title: "Team Captain Selection",
      date: "February 10, 2023",
      category: "Leadership",
      description: "Selected as team captain for the upcoming season by coaches and teammates."
    }
  ];

  const achievementMilestones = [
    {
      id: 1,
      title: "National Team Selection",
      progress: 75,
      requirements: "Attend 3 more qualifying events",
      deadline: "September 30, 2023"
    },
    {
      id: 2,
      title: "Professional Contract",
      progress: 40,
      requirements: "Participate in pro scout camps",
      deadline: "December 15, 2023"
    },
    {
      id: 3,
      title: "Sponsorship Milestone",
      progress: 60,
      requirements: "Increase social media following to 50K",
      deadline: "October 31, 2023"
    }
  ];

  const medals = [
    { id: 1, type: "Gold", count: 5 },
    { id: 2, type: "Silver", count: 8 },
    { id: 3, type: "Bronze", count: 3 }
  ];

  const achievements = {
    "2023": [
      { id: 1, title: "League MVP", date: "April 2023", icon: <Trophy className="h-5 w-5" /> },
      { id: 2, title: "Season High Scorer", date: "March 2023", icon: <Star className="h-5 w-5" /> },
      { id: 3, title: "Player of the Month", date: "February 2023", icon: <Award className="h-5 w-5" /> }
    ],
    "2022": [
      { id: 4, title: "Team Championship", date: "November 2022", icon: <Trophy className="h-5 w-5" /> },
      { id: 5, title: "All-Star Selection", date: "July 2022", icon: <Star className="h-5 w-5" /> },
      { id: 6, title: "Most Improved Player", date: "May 2022", icon: <Award className="h-5 w-5" /> }
    ],
    "2021": [
      { id: 7, title: "Rookie of the Year", date: "December 2021", icon: <Trophy className="h-5 w-5" /> },
      { id: 8, title: "First Professional Game", date: "September 2021", icon: <Calendar className="h-5 w-5" /> },
      { id: 9, title: "Draft Selection", date: "June 2021", icon: <Star className="h-5 w-5" /> }
    ]
  };

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Achievements</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Achievement
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Achievements</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Across all competitions</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Medal Count</CardTitle>
              <Medal className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">16</div>
              <div className="flex gap-2 mt-1">
                {medals.map(medal => (
                  <Badge key={medal.id} variant={
                    medal.type === "Gold" ? "default" : 
                    medal.type === "Silver" ? "outline" : "secondary"
                  }>
                    {medal.count} {medal.type}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <Progress value={68} className="h-2" />
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="recent">Recent Achievements</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="history">Achievement History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentAchievements.map((achievement) => (
                <Card key={achievement.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{achievement.title}</CardTitle>
                      <Badge>{achievement.category}</Badge>
                    </div>
                    <CardDescription>{achievement.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{achievement.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="ghost" size="sm">Share</Button>
                    <Button variant="outline" size="sm">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="milestones">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {achievementMilestones.map((milestone) => (
                <Card key={milestone.id}>
                  <CardHeader>
                    <CardTitle>{milestone.title}</CardTitle>
                    <CardDescription>Target deadline: {milestone.deadline}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{milestone.progress}%</span>
                      </div>
                      <Progress value={milestone.progress} />
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground mb-1">Requirements:</p>
                      <p>{milestone.requirements}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Update Progress</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Achievement Timeline</CardTitle>
                <CardDescription>
                  Your career achievements over the years.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {Object.entries(achievements).map(([year, yearAchievements]) => (
                    <div key={year}>
                      <h3 className="font-semibold mb-4 text-lg">{year}</h3>
                      <div className="space-y-6">
                        {yearAchievements.map(achievement => (
                          <div key={achievement.id} className="flex">
                            <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                              {achievement.icon}
                            </div>
                            <div>
                              <h4 className="font-semibold">{achievement.title}</h4>
                              <p className="text-sm text-muted-foreground">{achievement.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
