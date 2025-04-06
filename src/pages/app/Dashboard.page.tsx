// src/pages/DashboardPage.tsx
import { DashboardCards } from "@/components/layout/dashboard/DashboardCards";
import { DashboardCharts } from "@/components/layout/dashboard/DashboardCharts";
import { DashboardHeader } from "@/components/layout/dashboard/DashboardHeader";
import { Loader } from "@/components/ui/loadingSpinner";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useState } from "react";

export function DashboardPage() {
  const [period, setPeriod] = useState("24h");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dashboardMetrics", period],
    queryFn: async () => {
      const t = localStorage.getItem("access_token");
      const response: AxiosResponse<any> = await api.get("/dashboard/metrics", {
        headers: { Authorization: `Bearer ${t}` },
        params: { period }, // Envia o parâmetro para o back‑end
      });
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <main className="h-[calc(100vh-4rem)] w-full p-8">
      <DashboardHeader period={period} onPeriodChange={setPeriod} />
      <DashboardCards overview={data} />
      <DashboardCharts
        moderationActivity={data.moderationActivity}
        recentFlagged={data.recentFlagged}
        radarFlags={data.radarFlags}
        moderationActions={data.moderationActions}
      />
    </main>
  );
}
