
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AddAthleteForm } from '@/components/athletes/AddAthleteForm';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function AddAthlete() {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="container py-6 max-w-4xl">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate('/athletes')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Athletes
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Add New Athlete</CardTitle>
            <CardDescription>
              Create a new athlete profile with detailed information. Fields marked with an asterisk (*) are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddAthleteForm />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
