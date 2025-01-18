import { useQuery } from "@tanstack/react-query";

import { githubAuth, githubAuthCallback } from "./action";

export function githubAuthService() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: url, isLoading } = useQuery({
    queryKey: ["github-auth"],
    queryFn: githubAuth,
  });

  return {
    url,
    isLoading,
  };
}

export function githubAuthCallbackService(code: string) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading, isError } = useQuery({
    queryKey: ["github-auth-callback", code],
    queryFn: () => githubAuthCallback(code),
    enabled: !!code,
  });

  return {
    data,
    isLoading,
    isError,
  };
}
