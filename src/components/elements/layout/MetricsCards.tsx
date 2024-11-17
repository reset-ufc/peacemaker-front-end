import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  CircleHelpIcon,
  FlagIcon,
  MessageSquareIcon,
  TrendingUpIcon,
} from "lucide-react";
import React from "react";

interface MetricCardData {
  metric: string;
  value: number;
  count?: number;
}

type MetricConfigKey =
  | "average_comment_score"
  | "median_comment_score"
  | "total_comments"
  | "resolved_comments_count";

const metricConfig: Record<
  MetricConfigKey,
  {
    title: string;
    tooltip: string;
    description: string;
    icon: React.ComponentType<any>;
    valueKey: "value" | "count";
  }
> = {
  average_comment_score: {
    title: "Average Comment Score",
    tooltip: "Average score of comments",
    description: "Average score of all comments",
    icon: TrendingUpIcon,
    valueKey: "value",
  },
  median_comment_score: {
    title: "Median Comment Score",
    tooltip: "Median score of comments",
    description: "Median score of all comments",
    icon: TrendingUpIcon,
    valueKey: "value",
  },
  total_comments: {
    title: "Total Comments",
    tooltip: "Total number of comments",
    description: "Total number of comments posted",
    icon: MessageSquareIcon,
    valueKey: "count",
  },
  resolved_comments_count: {
    title: "Resolved Comments",
    tooltip: "Number of resolved comments",
    description: "Total number of comments that have been resolved",
    icon: FlagIcon,
    valueKey: "count",
  },
};

export function MetricsCards() {
  const [metrics, setMetrics] = useState<MetricCardData[]>([]);

  // Reqeust API, need change the fetch url
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch("/api/metrics");
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metricData) => {
        const { metric, value, count } = metricData;

        const config = metricConfig[metric as MetricConfigKey];

        if (!config) return null;

        return (
          <Card key={metric} className="shadow-none rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium align-baseline">
                {config.title}{" "}
                <Tooltip>
                  <TooltipTrigger>
                    <CircleHelpIcon className="size-3" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-44 bg-background text-foreground border border-border text-balance">
                    {config.tooltip}
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
              {React.createElement(config.icon, {
                className: "size-5 text-muted-foreground",
              })}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {config.valueKey === "value" ? value : count}
              </div>
              <p className="text-xs text-muted-foreground">
                {config.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
