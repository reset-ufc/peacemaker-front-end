import { useQuery } from "@tanstack/react-query";

import { getRepositories } from "./action";

export function repositoriesService() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: repositories, isLoading: loading } = useQuery({
    queryKey: ["user-repositories"],
    queryFn: getRepositories,
    refetchInterval: 1000 * 60 * 15, // 15 minutes
  });

  return {
    loading,
    repositories,
  };
}
