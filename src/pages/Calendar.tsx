
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Calendar() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <Card>
          <CardHeader>
            <CardTitle>Event Calendar</CardTitle>
            <CardDescription>
              Schedule and manage training sessions and events.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Calendar content will appear here. This page is under development.</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
