
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Career() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Career</h1>
        <Card>
          <CardHeader>
            <CardTitle>Career Management</CardTitle>
            <CardDescription>
              Track career progression and manage opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Career management content will appear here. This page is under development.</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
