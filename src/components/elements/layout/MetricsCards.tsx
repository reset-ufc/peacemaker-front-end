import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  CircleHelpIcon,
  FlagIcon,
  type LucideIcon,
  MessageSquareIcon,
  Trash2Icon,
  TrendingUpIcon,
} from "lucide-react";

const metrics: Array<{
  title: string;
  tooltip: string;
  description: string;
  icon: LucideIcon;
  value: string;
  valueKey: "value" | ("count" & string);
}> = [
  {
    title: "Average Comment Score",
    tooltip: "Average score of comments",
    description: "Average score of all comments",
    value: "2,853",
    icon: MessageSquareIcon,
    valueKey: "value",
  },
  {
    title: "Median Comment Score",
    tooltip: "Median score of comments",
    description: "Median score of all comments",
    value: "2",
    icon: FlagIcon,
    valueKey: "value",
  },
  {
    title: "Total Comments",
    tooltip: "Total number of comments",
    description: "Total number of comments posted",
    value: "42",
    icon: Trash2Icon,
    valueKey: "count",
  },
  {
    title: "Resolved Comments",
    tooltip: "Number of resolved comments",
    description: "Total number of comments that have been resolved",
    value: "-0.25",
    icon: TrendingUpIcon,
    valueKey: "count",
  },
];

export function MetricsCards() {
  return (
    <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map(({ title, tooltip, value, description, icon: Icon }) => (
        <Card key={title} className="shadow-none rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium align-baseline">
              {title}{" "}
              <Tooltip>
                <TooltipTrigger>
                  <CircleHelpIcon className="size-3" />
                </TooltipTrigger>
                <TooltipContent className="max-w-44 bg-background text-foreground border border-border text-balance">
                  {tooltip}
                </TooltipContent>
              </Tooltip>
            </CardTitle>
            {Icon && <Icon className="size-5 text-muted-foreground" />}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
