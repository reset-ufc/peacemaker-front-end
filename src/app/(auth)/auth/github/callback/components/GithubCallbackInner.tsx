"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { LoaderCircle } from "lucide-react";
import { parseAsString, useQueryStates } from "nuqs";

import { githubAuthCallbackService } from "@/services/auth";

export function GithubCallbackInner() {
  const router = useRouter();
  const [queries, _] = useQueryStates(
    {
      code: parseAsString,
      urlCallback: parseAsString,
    },
    {
      shallow: false,
    },
  );

  const { data, isLoading, isError } = githubAuthCallbackService(
    queries.code || "",
  );

  useEffect(() => {
    if (data) {
      router.push("/app");
    }
  }, [data, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <LoaderCircle className="mb-4 h-8 w-8 animate-spin" />
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <p className="mb-2 text-lg font-medium">Failed to load data.</p>
        <p className="text-sm">Please try again later.</p>
      </div>
    );
  }

  return null;
}
