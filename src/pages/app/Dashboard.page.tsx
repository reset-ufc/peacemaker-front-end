import { DashboardCards } from "@/components/layout/dashboard/DashboardCards";
import { DashboardHeader } from "@/components/layout/dashboard/DashboardHeader";
import { ModerationActionsChart } from "@/components/layout/dashboard/ModerationActionsChart";
import { ModerationActivityChart } from "@/components/layout/dashboard/ModerationActivityChart";
import { RadarFlagsChart } from "@/components/layout/dashboard/RadarFlagsChart";
import { RecentFlaggedComments } from "@/components/layout/dashboard/RecentFlaggedComments";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";

export function DashboardPage() {
  const [globalPeriod, setGlobalPeriod] = useState("24h");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dashboard-overview", globalPeriod],
    queryFn: async () => {
      const t = localStorage.getItem("access_token");
      const response: AxiosResponse<any> = await api.get("/api/dashboard/overview", {
        headers: { Authorization: `Bearer ${t}` },
        params: { period: globalPeriod },
      });
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <div className='flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center'>
        <LoaderIcon className='size-12 animate-spin' />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center'>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <main className="h-[calc(100vh-4rem)] w-full px-8 py-10">
      <DashboardHeader period={globalPeriod} onPeriodChange={setGlobalPeriod} />
      <DashboardCards initialData={data} period={globalPeriod} />

      <div className="grid grid-cols-1 gap-4">
        <div className="flex">
          <ModerationActivityChart />
          <RecentFlaggedComments />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <RadarFlagsChart />
          <ModerationActionsChart />
        </div>
      </div>
    </main>
  );
}
