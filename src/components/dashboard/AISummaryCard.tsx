
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AISummaryCardProps {
  title: string;
  insights: string;
  recommendations?: string[];
  isLoading?: boolean;
  onRefresh?: () => void;
  className?: string;
}

export function AISummaryCard({ 
  title, 
  insights, 
  recommendations, 
  isLoading = false, 
  onRefresh,
  className 
}: AISummaryCardProps) {
  return (
    <Card className={cn("stats-card", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium flex items-center">
            <Lightbulb className="w-4 h-4 mr-2 text-sports-accent" />
            {title}
          </CardTitle>
          <CardDescription>AI-generated insights</CardDescription>
        </div>
        {onRefresh && (
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8" 
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
            <span className="sr-only">Refresh</span>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse-light"></div>
            <div className="h-4 bg-muted rounded animate-pulse-light"></div>
            <div className="h-4 w-4/5 bg-muted rounded animate-pulse-light"></div>
          </div>
        ) : (
          <>
            <p className="text-sm">{insights}</p>
            {recommendations && recommendations.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">Recommendations:</h4>
                <ul className="text-sm space-y-1 list-disc pl-5">
                  {recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
