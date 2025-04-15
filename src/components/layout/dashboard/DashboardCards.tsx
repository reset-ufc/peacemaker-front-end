// src/components/layout/dashboard/DashboardCards.tsx
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2Icon, FileTextIcon, Flag, MessageSquare } from "lucide-react";
import { MetricCard } from "./MetricCard";

interface OverviewData {
  averageCommentScore: number;
  medianCommentScore: number;
  totalComments: number;
  resolvedComments: number;
  flaggedComments: number;
  acceptedSuggestionsCount: number;
  refusedSuggestions: number;
}

interface DashboardCardsProps {
  initialData: OverviewData;
  period: string;
}

export function DashboardCards({ initialData, period }: DashboardCardsProps) {
  const { data, isLoading } = useQuery<OverviewData>({
    queryKey: ["dashboard-overview", period],
    queryFn: async () => {
      const token = localStorage.getItem("access_token");
      const response = await api.get("/api/dashboard/overview", {
        headers: { Authorization: `Bearer ${token}` },
        params: { period },
      });
      return response.data;
    },
    initialData,
  });

  const containerClass = isLoading ? "filter blur-sm transition-filter duration-300" : "";

  return (
    <div className={containerClass}>
      <div className="grid grid-cols-4 gap-4 pb-5">
        <MetricCard
          value={data.averageCommentScore?.toFixed(3)}
          label="Average Comment Score"
          description="Average score of all comments"
          icon={<MessageSquare className="text-muted-foreground h-5 w-5" />}
        />
        <MetricCard
          value={data.medianCommentScore}
          label="Median Comment Score"
          description="Median score of all comments"
          icon={<Flag className="text-muted-foreground h-5 w-5" />}
        />
        <MetricCard
          value={data.totalComments}
          label="Total Comments"
          description="Total number of comments posted"
          icon={<FileTextIcon className="text-muted-foreground h-5 w-5" />}
        />
        <MetricCard
          value={data.resolvedComments}
          label="Resolved Comments"
          description="Total number of comments resolved"
          variation={data.resolvedComments}
          icon={<CheckCircle2Icon className="text-muted-foreground h-5 w-5" />}
        />
      </div>
    </div>
  );
}
