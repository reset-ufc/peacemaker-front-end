import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { LoginButton } from "@/components/layout/LoginButton";
import { env } from "@/env.mjs";
import { api } from "@/lib/api";

export function GithubAuthPage() {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const fetchUrl = async () => {
      const request = await api.get<{ url: string }>("/oauth/github", {
        params: {
          redirect_uri: `${env.VITE_PUBLIC_BASE_URL}/auth/sign-in/github/callback`,
          client_type: "extension",
        },
      });
      setUrl(request.data.url);
    };

    fetchUrl();
  }, []);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 self-center text-3xl font-bold"
        >
          PeacemakerBot
        </Link>
        <LoginButton url={url} />
      </div>
    </div>
  );
}
