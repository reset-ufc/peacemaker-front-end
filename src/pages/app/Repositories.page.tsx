import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { RepositoriesTable } from "@/components/layout/RepositoriesTable";
import { Loader } from "@/components/ui/loadingSpinner";
import { api } from "@/lib/api";
import { Repository } from "@/types";

export function RepositoriesPage() {
  const query = useQuery({
    queryKey: ["repositories"],
    queryFn: async () => {
      const t = localStorage.getItem("access_token");
      await new Promise(resolve => setTimeout(resolve, 1500));
      const request: AxiosResponse<{ repositories: Array<Repository> }> =
        await api.get("/api/repositories", {
          headers: {
            Authorization: `Bearer ${t}`,
          },
        });
      return request.data.repositories;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: false,
  });

  if (query.isLoading) {
    return <Loader />;
  }

  // Handle errors with a fallback component
  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  return (
    <main className="h-[calc(100vh-4rem)] w-full p-8">
      <RepositoriesTable repositories={query.data ?? []} />
    </main>
  );
}
