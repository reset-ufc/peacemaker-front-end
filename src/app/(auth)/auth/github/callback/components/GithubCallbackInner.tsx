"use client";

import { githubAuthCallbackService } from "@/services/auth";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryStates } from "nuqs";
import { useEffect } from "react";

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
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <LoaderCircle className="h-8 w-8 animate-spin mb-4" />
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-lg font-medium mb-2">Failed to load data.</p>
        <p className="text-sm">Please try again later.</p>
      </div>
    );
  }

  return null;
}
