import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { LoaderIcon } from "lucide-react";

import { RepositoriesTable } from "@/components/layout/RepositoriesTable";
import { api } from "@/lib/api";
import { Repository } from "@/types";

export function RepositoriesPage() {
  const query = useQuery({
    queryKey: ["repositories"],
    queryFn: async () => {
      const t = localStorage.getItem("access_token");

      // Simulate a delay
      // await new Promise(resolve => setTimeout(resolve, 1500));

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
    return (
      <div className='flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center'>
        <LoaderIcon className='size-12 animate-spin' />
      </div>
    );
  }

  // Handle errors with a fallback component
  if (query.isError) {
    return (
      <div className='flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center'>
        <p>Error: {query.error.message}</p>
      </div>
    );
  }

  return (
    <main className='h-[calc(100vh-4rem)] w-full p-8'>
      <RepositoriesTable repositories={query.data ?? []} />
    </main>
  );
}
