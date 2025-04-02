
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronRight } from 'lucide-react';
import { ExtendedAthlete } from '@/types/athlete';

interface AthletePerformanceCardProps {
  athlete: ExtendedAthlete;
}

export function AthletePerformanceCard({ athlete }: AthletePerformanceCardProps) {
  const navigate = useNavigate();
  
  // Calculate the available performance metrics
  const metrics = athlete.performanceStats ? Object.entries(athlete.performanceStats)
    .filter(([key]) => !['overallScore', 'historicalData', 'seasonAverages', 'recentGames'].includes(key))
    .sort((a, b) => (b[1] || 0) - (a[1] || 0))
    .slice(0, 3) : [];
  
  const handleViewProfile = () => {
    navigate(`/athlete/${athlete.id}`);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={athlete.profileImage || athlete.image_url} alt={athlete.name} />
              <AvatarFallback>{athlete.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{athlete.name}</CardTitle>
              <div className="text-xs text-muted-foreground">
                {athlete.position}
                {athlete.position && athlete.sport && ' • '}
                {athlete.sport}
              </div>
            </div>
          </div>
          <Badge variant={athlete.status === 'active' ? "outline" : athlete.status === 'injured' ? "destructive" : "secondary"} className="capitalize">
            {athlete.status || 'active'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="pt-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Overall Performance</span>
            <span className="text-sm font-medium">{athlete.performanceStats?.overallScore || 75}/100</span>
          </div>
          <Progress value={athlete.performanceStats?.overallScore || 75} className="h-2 mb-4" />
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            {metrics.map(([key, value]) => (
              <div key={key} className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
                <span className="text-xs text-muted-foreground capitalize mb-1">{key.replace('Score', '')}</span>
                <span className="text-sm font-medium">{value}/100</span>
              </div>
            ))}
          </div>
          
          <Button variant="ghost" size="sm" className="w-full flex items-center justify-between" onClick={handleViewProfile}>
            <span>View Full Profile</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
