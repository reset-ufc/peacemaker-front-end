import { DashboardCards } from "@/components/layout/dashboard/DashboardCards";
import { DashboardHeader } from "@/components/layout/dashboard/DashboardHeader";
import { IssuesIncivilityChart } from "@/components/layout/dashboard/IssuesIncivilityChart";
import { ModerationActionsChart } from "@/components/layout/dashboard/ModerationActionsChart";
import { ModerationActivityChart } from "@/components/layout/dashboard/ModerationActivityChart";
import { PRIncivilityChart } from "@/components/layout/dashboard/PRIncivilityChart";
import { RadarFlagsChart } from "@/components/layout/dashboard/RadarFlagsChart";
import { RecentFlaggedComments } from "@/components/layout/dashboard/RecentFlaggedComments";
import { RepositorySidebar } from "@/components/layout/dashboard/RepositorySideBar";
import ToggleButton from "@/components/layout/dashboard/ToogleButton";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";

export function DashboardPage() {
  const [globalPeriod, setGlobalPeriod] = useState<"24h" | "7d" | "30d" | "1y">("24h");
  const [selectedRepo, setSelectedRepo] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dashboard-overview", globalPeriod, selectedRepo],
    queryFn: async () => {
      const t = localStorage.getItem("access_token");
      const response: AxiosResponse<any> = await api.get("/api/dashboard/overview", {
        headers: { Authorization: `Bearer ${t}` },
        params: { period: globalPeriod, repo: selectedRepo },
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
    <div className="flex h-[calc(100vh-4rem)]">
      <div
        className={`
          relative
          border-r
          overflow-hidden
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? "w-64" : "w-12"}
        `}
      >
        <ToggleButton sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {sidebarOpen && (
          <RepositorySidebar
            selectedRepo={selectedRepo}
            onChange={setSelectedRepo}
          />
        )}
      </div>

      <main className="flex-1 px-8 py-10">
        <div className="flex items-center justify-between mb-4">
          <DashboardHeader />
        </div>

        <DashboardCards initialData={data} repo={selectedRepo} />

        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <IssuesIncivilityChart repo={selectedRepo} />
            <PRIncivilityChart repo={selectedRepo} />
          </div>
          <div className="flex">
            <ModerationActivityChart repo={selectedRepo} />
            <RecentFlaggedComments repo={selectedRepo} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <RadarFlagsChart repo={selectedRepo} />
            <ModerationActionsChart repo={selectedRepo} />
          </div>
        </div>
      </main>
    </div>
  );
}
