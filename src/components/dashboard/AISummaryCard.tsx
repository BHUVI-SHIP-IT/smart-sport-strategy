
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

export interface AISummaryCardProps {
  title: string;
  insights: React.ReactNode[];
}

export function AISummaryCard({ title, insights }: AISummaryCardProps) {
  return (
    <Card className={cn("overflow-hidden")}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-muted/40 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <QuestionMarkCircledIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="px-0">
        <div className="px-6 py-4 space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="text-sm text-muted-foreground">
              {insight}
            </div>
          ))}
          <Button variant="outline" className="w-full" size="sm">View Full Report</Button>
        </div>
      </CardContent>
    </Card>
  );
}
