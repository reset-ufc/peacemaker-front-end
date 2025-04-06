import { DashboardCards } from "@/components/layout/dashboard/DashboardCards";
import { DashboardCharts } from "@/components/layout/dashboard/DashboardCharts";
import { Loader } from "@/components/ui/loadingSpinner";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export function DashboardPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dashboarddata"],
    queryFn: async () => {
      const t = localStorage.getItem("access_token");
      const response: AxiosResponse<any> = await api.get("/dashboard/metrics", {
        headers: {
          Authorization: `Bearer ${t}`,
        },
      });
      return response.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <main className="h-[calc(100vh-4rem)] w-full p-8">
      <DashboardCards overview={data} />
      <DashboardCharts
        moderationActivity={data.moderationActivity}
        moderationActions={data.moderationActions}
        radarFlags={data.radarFlags}
        recentFlagged={data.recentFlagged}
      />
    </main>
  );
}
