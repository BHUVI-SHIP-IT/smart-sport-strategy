
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Briefcase, Plus, TrendingUp } from 'lucide-react';

export default function Career() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Career</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Opportunity
          </Button>
        </div>

        <Tabs defaultValue="opportunities" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="history">Career History</TabsTrigger>
            <TabsTrigger value="goals">Career Goals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="opportunities">
            <Card>
              <CardHeader>
                <CardTitle>Current Opportunities</CardTitle>
                <CardDescription>
                  Track and manage potential career opportunities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Opportunity</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">National Team Tryout</TableCell>
                      <TableCell>National Sports Association</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground">
                          Confirmed
                        </span>
                      </TableCell>
                      <TableCell>June 15, 2023</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Professional League Draft</TableCell>
                      <TableCell>Major League</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-amber-500 text-white">
                          Pending
                        </span>
                      </TableCell>
                      <TableCell>August 30, 2023</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sponsorship Deal</TableCell>
                      <TableCell>SportGear Inc.</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-muted text-muted-foreground">
                          In Discussion
                        </span>
                      </TableCell>
                      <TableCell>Open</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Career Timeline</CardTitle>
                <CardDescription>
                  Your professional sports journey.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                      <Briefcase className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Regional Team Captain</h3>
                      <p className="text-sm text-muted-foreground">2022 - Present</p>
                      <p className="mt-2">Led team to regional championships, achieving personal best stats.</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Junior League MVP</h3>
                      <p className="text-sm text-muted-foreground">2020 - 2022</p>
                      <p className="mt-2">Recognized as Most Valuable Player in the Junior League.</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Academy Scholarship</h3>
                      <p className="text-sm text-muted-foreground">2018 - 2020</p>
                      <p className="mt-2">Full scholarship to prestigious sports academy.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="goals">
            <Card>
              <CardHeader>
                <CardTitle>Career Goals</CardTitle>
                <CardDescription>
                  Track your long-term career objectives and progress.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Professional League Draft</h3>
                      <span className="text-sm text-muted-foreground">70% Complete</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[70%] rounded-full bg-primary"></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Target: First round pick in next year's draft
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">National Team Selection</h3>
                      <span className="text-sm text-muted-foreground">40% Complete</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[40%] rounded-full bg-primary"></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Target: Selection to the national team within 2 years
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Major Sponsorship</h3>
                      <span className="text-sm text-muted-foreground">25% Complete</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[25%] rounded-full bg-primary"></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Target: Secure major brand sponsorship within 18 months
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
