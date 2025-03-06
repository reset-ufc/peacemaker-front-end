import type { Metadata } from "next";

import { Features } from "@/components/layout/Features";
import { Footer } from "@/components/layout/Footer";
import { Stat } from "@/components/layout/Stat";
import { Team } from "@/components/layout/Team";

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
    title: "Home",
  };
}

export default async function HomePage() {
  return (
    <>
      <Features />
      <Stat />
      <Team />
      <Footer />
    </>
  );
}
