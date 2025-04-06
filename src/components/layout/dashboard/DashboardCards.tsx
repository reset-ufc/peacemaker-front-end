import { DashboardCardsProps } from "@/types";
import { CheckCircle2Icon, FileTextIcon, Flag, MessageSquare } from "lucide-react";
import { MetricCard } from "./MetricCard";

export function DashboardCards({ overview }: DashboardCardsProps) {
  const { averageCommentScore, medianCommentScore, totalComments, resolvedComments } = overview;

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 pb-5">
        <MetricCard
          value={averageCommentScore?.toFixed(3)}
          label="Average Comment Score"
          description="Average score of all comments"
          icon={<MessageSquare className="h-5 w-5 text-muted-foreground" />}
        />

        <MetricCard
          value={medianCommentScore}
          label="Median Comment Score"
          description="Median score of all comments"
          icon={<Flag className="h-5 w-5 text-muted-foreground" />}
        />

        <MetricCard
          value={totalComments}
          label="Total Comments"
          description="Total number of comments posted"
          icon={<FileTextIcon className="h-5 w-5 text-muted-foreground" />}
        />

        <MetricCard
          value={resolvedComments}
          label="Resolved Comments"
          description="Total number of comments that have been resolved"
          variation={resolvedComments}
          icon={<CheckCircle2Icon className="h-5 w-5 text-muted-foreground" />}
        />
      </div>
    </div>
  );
}
