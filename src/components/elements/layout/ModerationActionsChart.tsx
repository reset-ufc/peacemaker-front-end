import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { TrendingUpIcon } from "lucide-react";

import { Label, Pie, PieChart } from "recharts";

const pieChartData = [
  { action: "deleted", count: 1234, fill: "var(--color-deleted)" },
  { action: "flagged", count: 573, fill: "var(--color-flagged)" },
  { action: "warned", count: 892, fill: "var(--color-warned)" },
];

const pieChartConfig = {
  count: {
    label: "Count",
  },
  deleted: {
    label: "Deleted",
    color: "hsl(var(--chart-1))",
  },
  flagged: {
    label: "Flagged",
    color: "hsl(var(--chart-2))",
  },
  warned: {
    label: "Warned",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function ModerationActionsChart({ className }: { className?: string }) {
  return (
    <Card className={cn("shadow-none rounded-lg", className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Moderation Actions</CardTitle>
        <CardDescription>
          Distribution of different moderation actions taken
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={pieChartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieChartData}
              dataKey="count"
              nameKey="action"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  try {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      const total = pieChartData.reduce(
                        (acc, curr) => acc + curr.count,
                        0,
                      );
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {total.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total Actions
                          </tspan>
                        </text>
                      );
                    }
                  } catch (error) {
                    console.error(
                      "An error occurred in PieChart Label:",
                      error,
                    );
                    return null;
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 3.7% this month <TrendingUpIcon className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total actions for the last 30 days
        </div>
      </CardFooter>
    </Card>
  );
}
