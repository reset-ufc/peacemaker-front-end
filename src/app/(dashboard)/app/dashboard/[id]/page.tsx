// import { MetricsCards } from "@/components/elements/layout/MetricsCards";
// import { ModerationActionsChart } from "@/components/elements/layout/ModerationActionsChart";
// import { ModerationActivityGraph } from "@/components/elements/layout/ModerationActivityGraph";
// import { ModerationsFlagsChart } from "@/components/elements/layout/ModerationsFlagsChart";
// import { RecentFlaggedCommentsTable } from "@/components/elements/layout/RecentFlaggedCommentsTable";

// import { DateRangeFilter } from "@/components/elements/common/DateRangeFilter";
import type { Metadata } from "next";

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

// const usersComments = [
//   {
//     id: 1,
//     username: "John Doe",
//     email: "arthurwillame@gmail.com",
//   },
// ];
interface Props {
  params: { id: string };
}

export default function AppPage({ params }: Props) {
  return (
    <main className="flex-1 overflow-auto py-8">
      {params.id}
      <div className="px-12">
        {/* <div className="flex items-center justify-between space-y-2">
          <DateRangeFilter />
        </div> */}
        {/* KPI Cards */}
        {/* <MetricsCards /> */}
        {/* <div className="mt-4 grid lg:gap-x-4 gap-y-4 md:grid-cols-2 lg:grid-cols-8">
          <ModerationActivityGraph className="col-span-5" />

          <RecentFlaggedCommentsTable
            users={usersComments}
            className="lg:col-span-3 col-span-5"
          />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <ModerationsFlagsChart className="md:col-span-3 col-span-2" />
          <ModerationActionsChart className="md:col-span-3 col-span-2" />
        </div> */}
      </div>
    </main>
  );
}
