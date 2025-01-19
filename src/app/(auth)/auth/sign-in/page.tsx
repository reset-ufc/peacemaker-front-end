import type { Metadata } from "next";
import { Suspense } from "react";

import { GithubOAuthButton } from "@/components/elements/common/GithubOAuthButton";

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
    title: "Sign In",
  };
}

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold">Sign in with GitHub</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <GithubOAuthButton />
        </Suspense>
        <p className="max-w-xs text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <a
            href="/terms"
            target="_blank"
            className="underline"
            rel="noreferrer"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            target="_blank"
            className="underline"
            rel="noreferrer"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
