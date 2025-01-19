import type { Metadata } from "next";

import { DateRangeFilter } from "@/components/elements/common/DateRangeFilter";
import { MetricsCards } from "@/components/elements/layout/MetricsCards";
import { ModerationActionsChart } from "@/components/elements/layout/ModerationActionsChart";
import { ModerationActivityGraph } from "@/components/elements/layout/ModerationActivityGraph";
import { ModerationsFlagsChart } from "@/components/elements/layout/ModerationsFlagsChart";
import { RecentFlaggedCommentsTable } from "@/components/elements/layout/RecentFlaggedCommentsTable";

/**
 * Force the page to be static and only change with a new build.
 *
 * read more about the Route Segment Config here:
 * https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
 */
export const dynamic = "force-static";

/**
 * Generate the metadata with dynamic information.
 *
 * Read more about the Dynamic Metadata here:
 * https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export function generateMetadata(): Metadata {
  return {
    title: "Dashboard",
  };
}

const usersComments = [];

export default function AppPage() {
  return (
    <main className="flex-1 overflow-auto py-8">
      <div className="px-12">
        <div className="flex items-center justify-between space-y-2">
          <DateRangeFilter />
        </div>
        {/* KPI Cards */}
        <MetricsCards />
        <div className="mt-4 grid gap-y-4 md:grid-cols-2 lg:grid-cols-8 lg:gap-x-4">
          {/* Main Chart Section */}
          <ModerationActivityGraph className="col-span-5" />

          {/* Problematic Comments Table */}
          <RecentFlaggedCommentsTable
            // @ts-expect-error user comments is a any type
            users={usersComments}
            className="col-span-5 lg:col-span-3"
          />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <ModerationsFlagsChart className="col-span-2 md:col-span-3" />
          {/* Moderation Types Distribution */}
          <ModerationActionsChart className="col-span-2 md:col-span-3" />
          {/* Quick Insights */}
          {/* <QuickInsightsInfos className="col-span-2" /> */}
        </div>
      </div>
    </main>
  );
}
