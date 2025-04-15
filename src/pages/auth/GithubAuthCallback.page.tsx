import { useEffect, useState } from "react";

import { Loader2Icon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuthentication } from "@/hooks/use-authentication";
import { api } from "@/lib/api";

export function GithubAuthCallback() {
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAuthentication();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("access_token");

    if (!accessToken) {
      navigate("/auth/sign-in/github");
      return;
    }

    api
      .get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        if (response.status === 401) {
          throw new Error("Unauthorized");
        }
        return response.data;
      })
      .then(data => {
        if (!data) {
          throw new Error("Invalid token");
        }

        auth.login(accessToken);

        localStorage.setItem("user", JSON.stringify(data.profile));

        navigate("/repositories");
      })
      .catch(() => {
        navigate("/auth/sign-in/github");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [auth, navigate, location.search]);

  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      {isLoading && <Loader2Icon className='size-12 animate-spin' />}
    </div>
  );
}
