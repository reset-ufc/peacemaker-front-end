import React from "react";

import { Features } from "@/components/elements/layout/Features";
import { Footer } from "@/components/elements/layout/Footer";
import { Stat } from "@/components/elements/layout/Stat";
import { Team } from "@/components/elements/layout/Team";

/**
 * Force the page to be static and only change with a new build.
 *
 * read more about the Route Segment Config here:
 * https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
 */
export const dynamic = "force-static";

export default async function HomePage() {
  return (
    <React.Fragment>
      <Features />
      <Stat />
      <Team />
      <Footer />
    </React.Fragment>
  );
}
