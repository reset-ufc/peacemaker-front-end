// src/components/layout/dashboard/DashboardCards.tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2Icon, FileTextIcon, Flag, MessageSquare } from "lucide-react";
import { useState } from "react";
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
  repo?: string;
}

export function DashboardCards({ repo }: DashboardCardsProps) {
  const [period, setPeriod] = useState<string>("24h");
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
  });

  const containerClass = isLoading ? "filter blur-sm transition-filter duration-300" : "pb-5";

  const { t } = useTranslation()

  return (
    <div className={containerClass}>
      <div className="border rounded shadow">
        <div className="flex items-center p-3 border-b">
          <span className="mr-2 font-medium">Período:</span>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24h</SelectItem>
              <SelectItem value="7d">7d</SelectItem>
              <SelectItem value="30d">30d</SelectItem>
              <SelectItem value="1y">1y</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 gap-0 pb-5">
          <MetricCard
            value={data?.averageCommentScore?.toFixed(2) ?? '-'}
            label={t("Average Comment Score")}
            description={t("Average score of all comments")}
            icon={<MessageSquare className="text-muted-foreground h-5 w-5" />}
          />
          <MetricCard
            value={data?.medianCommentScore?.toFixed(2) ?? '-'}
            label={t("Median Comment Score")}
            description={t("Median score of all comments")}
            icon={<Flag className="text-muted-foreground h-5 w-5" />}
          />
          <MetricCard
            value={data?.totalComments ?? '-'}
            label={t("Total Comments")}
            description={t("Total number of comments posted")}
            icon={<FileTextIcon className="text-muted-foreground h-5 w-5" />}
          />
          <MetricCard
            value={data?.resolvedComments ?? '-'}
            label={t("Resolved Comments")}
            description={t("Total number of comments resolved")}
            variation={data?.resolvedComments ? Number(data.resolvedComments) : undefined}
            icon={<CheckCircle2Icon className="text-muted-foreground h-5 w-5" />}
          />
        </div>
      </div>
    </div>
  );
}
