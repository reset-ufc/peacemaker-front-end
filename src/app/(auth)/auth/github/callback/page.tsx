"use client";

import { Suspense, useEffect } from "react";
import { parseAsString, useQueryStates } from "nuqs";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { githubAuthCallbackService } from "@/services/auth";
import { LoaderCircle } from "lucide-react";

function GithubCallbackInner() {
  const [queries, _] = useQueryStates(
    {
      code: parseAsString,
    },
    {
      shallow: false,
    }
  );

  const router = useRouter();
  const { data, isLoading, isError } = githubAuthCallbackService(
    queries.code || ""
  );

  useEffect(() => {
    if (data) {
      const { access_token } = data;

      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      localStorage.setItem("@Auth:token", access_token);

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
