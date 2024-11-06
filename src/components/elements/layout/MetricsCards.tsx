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
  Trash2Icon,
  TrendingUpIcon,
} from "lucide-react";

export function MetricsCards() {
  return (
    <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[
        {
          title: "Total Moderations",
          tooltip: "Number of moderated comments and flags over time",
          description: "Number of moderated comments and flags over time",
          value: "2,853",
          icon: MessageSquareIcon,
        },
        {
          title: "Flagged Comments",
          tooltip: "Number of flagged comments over time",
          description: "Number of flagged comments over time",
          value: "2",
          icon: FlagIcon,
        },
        {
          title: "Deleted Comments",
          tooltip: "Number of deleted comments over time",
          description: "Number of deleted comments over time",
          value: "42",
          icon: Trash2Icon,
        },
        {
          title: "Sentiment Score",
          tooltip: "Sentiment score over time",
          description: "Sentiment score over time",
          value: "-0.25",
          icon: TrendingUpIcon,
        },
      ].map(({ title, tooltip, value, description, icon: Icon }) => (
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
