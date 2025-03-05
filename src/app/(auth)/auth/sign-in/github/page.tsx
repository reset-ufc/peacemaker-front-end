import { Metadata } from "next";

import axios, { AxiosResponse } from "axios";

import { GitHubIcon } from "@/components/elements/svg/Github";
import { Button } from "@/components/ui/button";

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
    title: "Sign in with Github",
  };
}

export default async function AuthPage() {
  const request: AxiosResponse<{ url: string }> = await axios.get(
    "http://localhost:3000/api/oauth/github",
    {
      params: {
        // This should be changed up front, using search parameters to make it more dynamic
        redirect_uri: "http://localhost:3001/app/repositories",
        client_type: "web",
      },
    },
  );

  const url = request.data.url;

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-y-8">
      <div className="container">
        <AuthComponent url={url} />
      </div>
    </main>
  );
}

function AuthComponent({ url }: { url: string }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold">Sign in with GitHub</h1>
        <Button asChild>
          <a href={url}>
            <GitHubIcon />
            Login with GitHub
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
