
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Health() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Health</h1>
        <Card>
          <CardHeader>
            <CardTitle>Health Monitoring</CardTitle>
            <CardDescription>
              Monitor and track athlete health metrics.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Health monitoring content will appear here. This page is under development.</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
