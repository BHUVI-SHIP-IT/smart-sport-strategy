
import React from "react";
import { Layout } from '@/components/layout/Layout';
import AthletesList from './AthletesList';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

export default function Athletes() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Athletes</h1>
        <Button onClick={() => navigate('/athletes/add')}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Athlete
        </Button>
      </div>
      <AthletesList />
    </Layout>
  );
}
