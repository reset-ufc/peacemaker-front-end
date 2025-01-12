import { useQuery } from "@tanstack/react-query";
import { getRepositories } from "./action";

export function repositoriesService() {
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
