"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
const chartData = [
  { avaliation: "total_likes", visitors: 12 },
  { avaliation: "total_deslikes", visitors: 5 },
  { avaliation: "like_ratio", visitors: 2.8 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
} satisfies ChartConfig;

export function LikeDeslikeGraph({ className }: { className?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Negative</CardTitle>
        <CardDescription>Like and Deslikes</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator />}
            />
            <Bar dataKey="visitors">
              <LabelList position="top" dataKey="avaliantion" fillOpacity={1} />
              {chartData.map((item) => (
                <Cell
                  key={item.avaliation}
                  fill={
                    item.visitors > 0
                      ? "hsl(var(--chart-1))"
                      : "hsl(var(--chart-2))"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Like and Deslikes <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total of likes, deslikes and ratio
        </div>
      </CardFooter>
    </Card>
  );
}
