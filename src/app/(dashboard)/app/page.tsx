"use client";

import { MetricsCards } from "@/components/elements/layout/MetricsCards";
import { ModerationActionsChart } from "@/components/elements/layout/ModerationActionsChart";
import { ModerationActivityGraph } from "@/components/elements/layout/ModerationActivityGraph";
import { RecentFlaggedCommentsTable } from "@/components/elements/layout/RecentFlaggedCommentsTable";

import { DateRangeFilter } from "@/components/elements/common/DateRangeFilter";
import ModerationsFlagsChart from "@/components/elements/layout/ModerationsFlagsChart";
import { QuickInsightsInfos } from "@/components/elements/layout/QuickInsightsInfos";
import { parseAsString, useQueryState } from "nuqs";

export default function AppPage() {
  const [dateRange, setDateRange] = useQueryState(
    "range",
    parseAsString.withDefault("30d").withOptions({
      clearOnDefault: true,
      shallow: true,
    }),
  );

  return (
    <main className="flex-1 overflow-auto py-8">
      <div className="container">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <DateRangeFilter value={dateRange} setValue={setDateRange} />
        </div>
        {/* KPI Cards */}
        <MetricsCards />
        <div className="mt-4 grid lg:gap-x-4 gap-y-4 md:grid-cols-2 lg:grid-cols-8">
          {/* Main Chart Section */}
          <ModerationActivityGraph className="col-span-5" />

          {/* Problematic Comments Table */}
          <RecentFlaggedCommentsTable className="lg:col-span-3 col-span-5" />
        </div>
        {/* Bottom Section */}
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-8">
          <ModerationsFlagsChart className="md:col-span-3 col-span-2" />

          {/* Moderation Types Distribution */}
          <ModerationActionsChart className="md:col-span-3 col-span-2" />
          {/* Quick Insights */}
          <QuickInsightsInfos className="col-span-2" />
        </div>
      </div>
    </main>
  );
}
