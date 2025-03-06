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
    title: "Page not found",
  };
}

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-y-8">
      <section className="container flex flex-col justify-center space-y-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tighter text-pretty md:text-7xl">
          404 - Page not found
        </h1>
        <p className="text-muted-foreground mx-auto max-w-sm text-lg text-pretty md:text-xl">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
      </section>
    </main>
  );
}
