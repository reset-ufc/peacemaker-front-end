import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

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

export const description = "A radar chart";

const chartData = [
  { flag: "Impatience", moderations: 18 },
  { flag: "Entitlement", moderations: 30 },
  { flag: "Vulgarity", moderations: 23 },
  { flag: "Insultng", moderations: 27 },
  { flag: "Bitter Frustation", moderations: 20 },
  { flag: "Mocking", moderations: 21 },
  { flag: "Threat", moderations: 15 },
  { flag: "Irony", moderations: 12 },
  { flag: "Identity Attack", moderations: 10 },
];

const chartConfig = {
  moderations: {
    label: "Moderations",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function ModerationsFlagsChart({
  className,
}: { className?: string }) {
  return (
    <Card className={cn("shadow-none rounded-lg", className)}>
      <CardHeader className="items-center pb-4">
        <CardTitle>Moderations Flags</CardTitle>
        <CardDescription>
         Moderations are actions taken by moderators to flag inappropriate content.
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-video max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="flag" />
            <PolarGrid />
            <Radar
              dataKey="moderations"
              fill="var(--color-moderations"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUpIcon className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          January - June 2024
        </div>
      </CardFooter>
    </Card>
  );
}
