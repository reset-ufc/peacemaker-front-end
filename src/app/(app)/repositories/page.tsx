import type { Metadata } from "next";
import { cookies } from "next/headers";

import { AxiosResponse } from "axios";

import { RepositoriesTable } from "@/components/layout/RepositoriesTable";
import { api } from "@/lib/api";

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
  console.log(c);

  const t = c.get("access_token")?.value;

  const request: AxiosResponse<
    Array<{
      _id: string;
      user_id: string;
      gh_user_id: string;
      gh_repository_id: string;
      name: string;
      repo_fullname: string;
      url: string;
      is_private: boolean;
      created_at: string;
      updated_at: string;
    }>
  > = await api.get("/api/repositories", {
    headers: {
      Authorization: `Bearer ${t}`,
    },
  });

  const repos = request.data;

  return (
    <main className="p-8">
      <RepositoriesTable initialData={repos} />
      {/* <pre>{JSON.stringify(repos, null, 2)}</pre> */}
    </main>
  );
}
