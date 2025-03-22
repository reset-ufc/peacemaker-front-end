import { useEffect, useState } from "react";

import { AxiosResponse } from "axios";

import { RepositoriesTable } from "@/components/layout/RepositoriesTable";
import { api } from "@/lib/api";
import { Repository } from "@/types";

export function RepositoriesPage() {
  const [repos, setRepos] = useState<Array<Repository>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const t = localStorage.getItem("access_token");

      const request: AxiosResponse<{ repositories: Array<Repository> }> =
        await api.get("/api/repositories", {
          headers: {
            Authorization: `Bearer ${t}`,
          },
        });

      setRepos(request.data.repositories);
    };

    fetchData();
  }, []);

  return (
    <main className="h-[calc(100vh-4rem)] w-full p-8">
      <RepositoriesTable repositories={repos} />
    </main>
  );
}
