import type { Metadata } from "next";

import { GitHubIcon } from "@/components/elements/svg/Github";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { GITHUB_AUTH_ROUTE } from "@/lib/routes";

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

export default async function Page() {
  const response = await api.get<{ authorization_url: string }>(
    GITHUB_AUTH_ROUTE(),
  );

  console.info(response.data);

  const url = new URL(response.data.authorization_url);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold">Sign in with GitHub</h1>
        {/* <Suspense fallback={<div>Loading...</div>}>
          <GithubOAuthButton />
        </Suspense> */}
        <Button asChild>
          <a href={url.toString()} target="_blank" rel="noreferrer">
            <GitHubIcon />
            Login with Github
          </a>
        </Button>
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
