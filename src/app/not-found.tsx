import type { Metadata } from "next";

import { ArrowUpRightIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    title: "Page not found",
  };
}

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-y-8">
      <section className="container flex flex-col justify-center space-y-8 text-center">
        <h1 className="text-pretty text-5xl font-extrabold tracking-tighter md:text-7xl">
          404 - Page not found
        </h1>
        <p className="mx-auto max-w-sm text-pretty text-lg text-muted-foreground md:text-xl">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <a
          href="/"
          className={cn(
            buttonVariants({
              variant: "secondary",
              size: "lg",
            }),
            "m-auto w-fit",
          )}
        >
          Go back home
          <ArrowUpRightIcon className="size-8" />
        </a>
      </section>
    </main>
  );
}
