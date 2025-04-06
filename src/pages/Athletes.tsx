
import React from "react";
import { Layout } from '@/components/layout/Layout';
import AthletesList from './AthletesList';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserPlus, Upload } from "lucide-react";
import { ImportAthletesModal } from "@/components/athletes/ImportAthletesModal";

export default function Athletes() {
  const navigate = useNavigate();
  const [isImportOpen, setIsImportOpen] = React.useState(false);

  return (
    <Layout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Athletes</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsImportOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Import Athletes
          </Button>
          <Button onClick={() => navigate('/athletes/add')}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Athlete
          </Button>
        </div>
      </div>
      <AthletesList />
      <ImportAthletesModal open={isImportOpen} onOpenChange={setIsImportOpen} />
    </Layout>
  );
}
