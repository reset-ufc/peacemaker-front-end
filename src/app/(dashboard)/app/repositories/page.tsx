import { RepositoriesTable } from "@/components/elements/layout/RepositoriesTable";
import { Button } from "@/components/ui/button";
import { getRepositories } from "@/services/repositories/action";
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

export default async function Page() {
  const response = await getRepositories();

  return (
    <main className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-end ">
        <Button>Load Repositories</Button>
      </div>
      <RepositoriesTable data={response} />
    </main>
  );
}
