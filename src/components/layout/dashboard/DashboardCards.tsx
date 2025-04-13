import {
  CheckCircle2Icon,
  FileTextIcon,
  Flag,
  MessageSquare,
} from "lucide-react";

import { DashboardCardsProps } from "@/types";

import { MetricCard } from "./MetricCard";

export function DashboardCards({ overview }: DashboardCardsProps) {
  const {
    averageCommentScore,
    medianCommentScore,
    totalComments,
    resolvedComments,
  } = overview;

  return (
    <div>
      <div className='grid grid-cols-4 gap-4 pb-5'>
        <MetricCard
          value={averageCommentScore?.toFixed(3)}
          label='Average Comment Score'
          description='Average score of all comments'
          icon={<MessageSquare className='text-muted-foreground h-5 w-5' />}
        />

        <MetricCard
          value={medianCommentScore}
          label='Median Comment Score'
          description='Median score of all comments'
          icon={<Flag className='text-muted-foreground h-5 w-5' />}
        />

        <MetricCard
          value={totalComments}
          label='Total Comments'
          description='Total number of comments posted'
          icon={<FileTextIcon className='text-muted-foreground h-5 w-5' />}
        />

        <MetricCard
          value={resolvedComments}
          label='Resolved Comments'
          description='Total number of comments that have been resolved'
          variation={resolvedComments}
          icon={<CheckCircle2Icon className='text-muted-foreground h-5 w-5' />}
        />
      </div>
    </div>
  );
}
