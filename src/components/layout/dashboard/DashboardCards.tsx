// src/components/layout/dashboard/DashboardCards.tsx
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2Icon, FileTextIcon, Flag, MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";
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
  repo?: string;
}

export function DashboardCards({ initialData, period, repo }: DashboardCardsProps) {
  const token = localStorage.getItem("access_token");

  const { data, isLoading } = useQuery<OverviewData>({
    queryKey: ["dashboard-overview", period, repo],
    queryFn: async () => {
      const params: Record<string, string> = { period };
      if (repo) params.repo = repo;
      const response = await api.get("/api/dashboard/overview", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      return response.data;
    },
    initialData,
  });

  const containerClass = isLoading ? "filter blur-sm transition-filter duration-300" : "";

  const { t } = useTranslation()

  return (
    <div className={containerClass}>
      <div className="grid grid-cols-4 gap-4 pb-5">
        <MetricCard
          value={data.averageCommentScore?.toFixed(3)}
          label={t("Average Comment Score")}
          description={t("Average score of all comments")}
          icon={<MessageSquare className="text-muted-foreground h-5 w-5" />}
        />
        <MetricCard
          value={data.medianCommentScore}
          label={t("Median Comment Score")}
          description={t("Median score of all comments")}
          icon={<Flag className="text-muted-foreground h-5 w-5" />}
        />
        <MetricCard
          value={data.totalComments}
          label={t("Total Comments")}
          description={t("Total number of comments posted")}
          icon={<FileTextIcon className="text-muted-foreground h-5 w-5" />}
        />
        <MetricCard
          value={data.resolvedComments}
          label={t("Resolved Comments")}
          description={t("Total number of comments resolved")}
          variation={data.resolvedComments}
          icon={<CheckCircle2Icon className="text-muted-foreground h-5 w-5" />}
        />
      </div>
    </div>
  );
}
