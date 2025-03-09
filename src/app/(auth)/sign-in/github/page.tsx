import { Metadata } from "next";
import Link from "next/link";

import { AxiosResponse } from "axios";

import { LoginForm } from "@/components/layout/LoginForm";
import { api } from "@/lib/api";

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
  const request: AxiosResponse<{ url: string }> = await api.get(
    "/api/oauth/github",
    {
      params: {
        redirect_uri: "http://localhost:3001/incivilities",
        client_type: "web",
      },
    }
  );

  const url = request.data.url;

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center text-2xl font-medium"
        >
          PeacemakerBot
        </Link>
        <LoginForm autorizationUrl={url} />
      </div>
    </div>
  );
}
