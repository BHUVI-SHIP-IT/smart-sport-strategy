
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Achievements() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Achievements</h1>
        <Card>
          <CardHeader>
            <CardTitle>Athletic Achievements</CardTitle>
            <CardDescription>
              Track and celebrate athletic milestones and awards.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Achievements content will appear here. This page is under development.</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
