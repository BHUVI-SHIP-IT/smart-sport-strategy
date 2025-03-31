
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Performance() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Performance</h1>
        <Card>
          <CardHeader>
            <CardTitle>Performance Analytics</CardTitle>
            <CardDescription>
              Track and analyze athlete performance metrics.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Performance analytics content will appear here. This page is under development.</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
