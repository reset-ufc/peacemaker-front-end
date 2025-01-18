"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

const areaChartData = [
  { month: "Jan", moderations: 32, flags: 24 },
  { month: "Feb", moderations: 30, flags: 13 },
  { month: "Mar", moderations: 52, flags: 38 },
  { month: "Apr", moderations: 45, flags: 39 },
  { month: "May", moderations: 6, flags: 48 },
  { month: "Jun", moderations: 55, flags: 38 },
];

const areaChartConfig = {
  moderations: {
    label: "Moderations",
    color: "hsl(var(--chart-1))",
  },
  flags: {
    label: "Flags",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ModerationActivityGraph({ className }: { className?: string }) {
  return (
    <Card className={cn("rounded-lg shadow-none", className)}>
      <CardHeader>
        <CardTitle>Moderation Activity</CardTitle>
        <CardDescription>
          Number of moderated comments and flags over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={areaChartConfig}>
          <AreaChart
            accessibilityLayer
            data={areaChartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="flags"
              type="natural"
              fill="var(--color-flags)"
              fillOpacity={0.4}
              stroke="var(--color-flags)"
              stackId="a"
            />
            <Area
              dataKey="moderations"
              type="natural"
              fill="var(--color-moderations)"
              fillOpacity={0.4}
              stroke="var(--color-moderations)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month{" "}
              <TrendingUpIcon className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  );
}
