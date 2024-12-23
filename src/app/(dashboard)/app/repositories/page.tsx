import {
  RepositoriesTable,
  type Repository,
} from "@/components/elements/layout/RepositoriesTable";
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
    title: "Repositories",
  };
}
const data: Array<Repository> = [];

export default function Page() {
  return (
    <main className="p-4">
      <RepositoriesTable data={data} />
    </main>
  );
}
