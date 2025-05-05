import { DashboardCards } from "@/components/layout/dashboard/DashboardCards";
import { DashboardHeader } from "@/components/layout/dashboard/DashboardHeader";
import { IncivilityByTypeChart } from "@/components/layout/dashboard/IncivilityByTypeChart";
import { ModerationActionsChart } from "@/components/layout/dashboard/ModerationActionsChart";
import { ModerationActivityChart } from "@/components/layout/dashboard/ModerationActivityChart";
import { RadarFlagsChart } from "@/components/layout/dashboard/RadarFlagsChart";
import { RecentFlaggedComments } from "@/components/layout/dashboard/RecentFlaggedComments";
import { RepositorySidebar } from "@/components/layout/dashboard/RepositorySideBar";
import ToggleButton from "@/components/layout/dashboard/ToogleButton";
import { useState } from "react";

export function DashboardPage() {
  const [selectedRepo, setSelectedRepo] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

        <DashboardCards repo={selectedRepo} />

        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <IncivilityByTypeChart
              repo={selectedRepo}
              type="issue"
              title="Incivilidades em Issues"
              description="Comentários incivilizados em issues (últimas 4 semanas)"
              gradientId="issuesGradient"
              strokeColor="#34d399"
              stopColor="#34d399"
            />
            <IncivilityByTypeChart
              repo={selectedRepo}
              type="pull_request"
              title="Incivilidades em Pull Requests"
              description="Comentários incivilizados em PRs (últimas 4 semanas)"
              gradientId="prGradient"
              strokeColor="#fbbf24"
              stopColor="#fbbf24"
            />

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
