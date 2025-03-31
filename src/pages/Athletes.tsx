
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Athletes() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Athletes</h1>
        <Card>
          <CardHeader>
            <CardTitle>Athletes Management</CardTitle>
            <CardDescription>
              View and manage your athlete roster.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Athlete content will appear here. This page is under development.</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
