
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from 'lucide-react';

interface ImportAthletesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImportAthletesModal({ open, onOpenChange }: ImportAthletesModalProps) {
  const [athletesData, setAthletesData] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const queryClient = useQueryClient();

  // Example template format
  const exampleData = `[
  {
    "name": "LeBron James",
    "sport": "Basketball",
    "position": "Small Forward",
    "team": "Los Angeles Lakers",
    "age": 39,
    "height": 206,
    "weight": 113,
    "status": "active"
  },
  {
    "name": "Simone Biles",
    "sport": "Gymnastics",
    "position": "All-Around",
    "team": "USA Gymnastics",
    "age": 27,
    "height": 142,
    "weight": 47,
    "status": "active"
  }
]`;

  const handleImport = async () => {
    try {
      setIsImporting(true);
      
      // Parse the JSON data
      let athletes;
      try {
        athletes = JSON.parse(athletesData);
        if (!Array.isArray(athletes)) {
          throw new Error('Data must be an array of athletes');
        }
      } catch (error) {
        toast.error('Invalid JSON format');
        setIsImporting(false);
        return;
      }

      // Add default performance stats
      const preparedAthletes = athletes.map(athlete => ({
        ...athlete,
        user_id: (await supabase.auth.getUser()).data.user?.id || 'mock-user-id',
        performance_stats: {
          strengthScore: 75,
          speedScore: 75,
          enduranceScore: 75,
          agilityScore: 75,
          technicalScore: 75,
          tacticalScore: 75,
          mentalScore: 75,
          overallScore: 75,
        }
      }));

      // Insert into Supabase
      const { data, error } = await supabase
        .from('athletes')
        .insert(preparedAthletes)
        .select();
      
      if (error) {
        console.error("Error importing athletes:", error);
        toast.error("Failed to import athletes");
        return;
      }
      
      toast.success(`${preparedAthletes.length} athletes imported successfully`);
      setAthletesData('');
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ['athletes'] });
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsImporting(false);
    }
  };

  const loadExampleData = () => {
    setAthletesData(exampleData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Import Athletes</DialogTitle>
          <DialogDescription>
            Paste JSON data of athletes to import in bulk. Each athlete should include required fields like name and sport.
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-4">
          <Textarea 
            value={athletesData} 
            onChange={(e) => setAthletesData(e.target.value)} 
            placeholder="Paste JSON data here..."
            className="min-h-[300px] font-mono text-sm"
          />
          <Button 
            variant="link" 
            className="px-0 mt-2 text-xs" 
            onClick={loadExampleData}
          >
            Load example data
          </Button>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleImport} 
            disabled={!athletesData.trim() || isImporting}
          >
            {isImporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Importing...
              </>
            ) : (
              'Import Athletes'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
