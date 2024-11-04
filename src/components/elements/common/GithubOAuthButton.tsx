"use client";

import { Loader2Icon } from "lucide-react";
import { parseAsString, useQueryStates } from "nuqs";
import { useEffect, useState } from "react";

import { GitHubIcon } from "@/components/elements/svg/Github";
import { Button } from "@/components/ui/button";
import { env } from "@/env.mjs";

export function GithubOAuthButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [data, setData] = useState<any>(null);
  // // Extracting the 'code' parameter from the URL query string (used for authorization)
  const [queries, setQueries] = useQueryStates(
    {
      code: parseAsString,
      state: parseAsString,
    },
    {
      shallow: false,
    },
  );

  // State to indicate if data is being fetched

  // Runs whenever the 'code' variable changes (likely on authorization flow)
  useEffect(() => {
    if (queries.code) {
      // If no token but 'code' is available (GitHub OAuth flow)
      setIsLoading(true); // Set loading to true while fetching data
      fetch(
        `${env.NEXT_PUBLIC_BASE_API_URL}/auth/github/callback?code=${queries.code}`,
      )
        .then((res) => res.json()) // Parse the response as JSON
        .then((data) => {
          setQueries(null); // Clear the 'code' variable after successful fetch
          setData(data); // Set the data to the state
          // localStorage.setItem("token", `${JSON.stringify(data.jwt)}`);
          setIsLoading(false); // Set loading to false when done fetching
        });
    }
  }, [queries.code, setQueries]);

  function redirectToGitHub() {
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${env.NEXT_PUBLIC_GITHUB_ID}`;

    window.location.href = authUrl;
  }

  return (
    <>
      <Button disabled={isLoading} onClick={redirectToGitHub}>
        {isLoading ? (
          <Loader2Icon className="animate-spin size-5 mr-2 " />
        ) : (
          <GitHubIcon className="mr-2 size-5" />
        )}
        Sign in with GitHub
      </Button>
    </>
  );
}
