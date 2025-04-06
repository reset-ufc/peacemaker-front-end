import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";

import { DashboardCards } from "@/components/layout/dashboard/DashboardCards";
import { DashboardCharts } from "@/components/layout/dashboard/DashboardCharts";
import { DashboardHeader } from "@/components/layout/dashboard/DashboardHeader";
import { api } from "@/lib/api";

export function DashboardPage() {
  const [period, setPeriod] = useState("24h");

  const query = useQuery({
    queryKey: ["dashboard-metrics", period],
    queryFn: async () => {
      const t = localStorage.getItem("access_token");

      const response = await api.get("/api/dashboard/metrics", {
        headers: { Authorization: `Bearer ${t}` },
        params: { period },
      });
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: false,
  });

  if (query.isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center">
        <LoaderIcon className="size-12 animate-spin" />
      </div>
    );
  }

  // Handle errors with a fallback component
  if (query.isError) {
    return (
      <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center">
        <p>Error: {query.error.message}</p>
      </div>
    );
  }

  return (
    <main className="h-[calc(100vh-4rem)] w-full p-8">
      <DashboardHeader period={period} onPeriodChange={setPeriod} />
      <DashboardCards overview={query.data} />
      <DashboardCharts
        moderationActivity={query.data.moderationActivity}
        recentFlagged={query.data.recentFlagged}
        radarFlags={query.data.radarFlags}
        moderationActions={query.data.moderationActions}
      />
    </main>
  );
}
