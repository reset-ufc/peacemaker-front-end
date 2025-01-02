"use client";

import { githubAuthCallbackService } from "@/services/auth";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryStates } from "nuqs";
import { Suspense, useEffect } from "react";

function GithubCallbackInner() {
  const router = useRouter();
  const [queries, _] = useQueryStates(
    {
      code: parseAsString,
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

export default function GithubCallbackPage() {
  return (
    <Suspense>
      <GithubCallbackInner />
    </Suspense>
  );
}
