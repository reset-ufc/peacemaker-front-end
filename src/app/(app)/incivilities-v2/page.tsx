import type { Metadata } from "next";
import { Suspense } from "react";

import CommentManager from "./components/comment-manager";

/**
 * Force the page to be static and only change with a new build.
 *
 * read more about the Route Segment Config here:
 * https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
 * 'auto' | 'error' | 'force-static' | 'force-dynamic'
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
    title: "Incivilites",
  };
}

export default function Home() {
  return (
    <main className="h-full min-h-[calc(100vh-4rem)]">
      <Suspense fallback={<div>Loading...</div>}>
        <CommentManager />
      </Suspense>
    </main>
  );
}
