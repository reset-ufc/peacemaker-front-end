"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertTriangle, Flag, Users } from "lucide-react";

export function QuickInsightsInfos({ className }: { className?: string }) {
  return (
    <Card className={cn("shadow-none rounded-lg", className)}>
      <CardHeader>
        <CardTitle>Quick Insights</CardTitle>
        <CardDescription>Key metrics and trends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Moderation Rate</p>
              <p className="text-2xl font-bold">24.3%</p>
            </div>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Problematic Words</p>
              <p className="text-2xl font-bold">157</p>
            </div>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Flagged Authors</p>
              <p className="text-2xl font-bold">89</p>
            </div>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
