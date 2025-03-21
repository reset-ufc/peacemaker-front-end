import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";

import { AxiosResponse } from "axios";

import { RepositoriesTable } from "@/components/layout/RepositoriesTable";
import { api } from "@/lib/api";
import { Repository } from "@/types";

/**
 * Force the page to be static and only change with a new build.
 *
 * read more about the Route Segment Config here:
 * https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
 * 'auto' | 'error' | 'force-static' | 'force-dynamic'
 */
export const dynamic = "auto";

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

export default async function RepositoriesPage() {
  const c = await cookies();

  const t = c.get("access_token")?.value;

  const request: AxiosResponse<{ repositories: Array<Repository> }> =
    await api.get("/api/repositories", {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });

  const repos = request.data.repositories;

  return (
    <main className="h-[calc(100vh-4rem)] w-full p-8">
      <Suspense>
        <RepositoriesTable repositories={repos} />
      </Suspense>
    </main>
  );
}
