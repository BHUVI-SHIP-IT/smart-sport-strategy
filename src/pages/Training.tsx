
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Training() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Training</h1>
        <Card>
          <CardHeader>
            <CardTitle>Training Programs</CardTitle>
            <CardDescription>
              Create and manage athlete training programs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Training program content will appear here. This page is under development.</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
