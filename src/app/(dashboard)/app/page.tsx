"use client";

import { LikeDeslikeGraph } from "@/components/elements/layout/LikeDeslikeGraph";
import { MetricsCards } from "@/components/elements/layout/MetricsCards";
import { ModerationActionsChart } from "@/components/elements/layout/ModerationActionsChart";
import { ModerationActivityGraph } from "@/components/elements/layout/ModerationActivityGraph";
import { RecentFlaggedCommentsTable } from "@/components/elements/layout/RecentFlaggedCommentsTable";
import { TypeModerationAcceptedGraph } from "@/components/elements/layout/TypeModerationAcceptedGraph";
import { TypeModerationCountGraph } from "@/components/elements/layout/TypeModerationCountGraph";

import { DateRangeFilter } from "@/components/elements/common/DateRangeFilter";
import ModerationsFlagsChart from "@/components/elements/layout/ModerationsFlagsChart";
import { QuickInsightsInfos } from "@/components/elements/layout/QuickInsightsInfos";

const usersComments = [
  {
    username: "John Doe",
    severity: "high",
    link: "https://github.com/github/contributors/issues/91#issuecomment-2111250942",
  },
  {
    username: "John Doe 2",
    severity: "low",
    link: "https://github.com/github/contributors/issues/91#issuecomment-2111250942",
  },
  {
    username: "John Doe 3",
    severity: "medium",
    link: "https://github.com/github/contributors/issues/91#issuecomment-2111250942",
  },
];

export default function AppPage() {
  return (
    <main className="flex-1 overflow-auto py-8">
      <div className="px-12">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <DateRangeFilter />
        </div>
        {/* KPI Cards */}
        <MetricsCards />
        <div className="mt-4 grid lg:gap-x-4 gap-y-4 md:grid-cols-2 lg:grid-cols-8">
          {/* Main Chart Section */}
          <ModerationActivityGraph className="col-span-5" />

          {/* Problematic Comments Table */}
          <RecentFlaggedCommentsTable
            users={usersComments}
            className="lg:col-span-3 col-span-5"
          />
        </div>
        {/* Bottom Section */}
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <ModerationsFlagsChart className="md:col-span-3 col-span-2" />
          {/* Moderation Types Distribution */}
          <ModerationActionsChart className="md:col-span-3 col-span-2" />
          {/* Quick Insights */}
          <QuickInsightsInfos className="col-span-2" />
          {/* <GraphTwo className="md:col-span-3 col-span-2" />*/}
          <LikeDeslikeGraph className="md:col-span-3 col-span-2 h-fit" />
          {/* Type Moderation Accepted Graph */}
          <TypeModerationAcceptedGraph className="md:col-span-4 col-span-3" />
          {/* Novos gráficos */}
          <TypeModerationCountGraph className="md:col-span-3 col-span-2" />
        </div>
      </div>
    </main>
  );
}
