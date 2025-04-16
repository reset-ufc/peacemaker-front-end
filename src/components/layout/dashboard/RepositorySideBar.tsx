// src/components/layout/dashboard/RepositorySidebar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Repository } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useMemo, useState } from "react";

interface RepositorySidebarProps {
  selectedRepo: string;
  onChange: (repo: string) => void;
}

export function RepositorySidebar({
  selectedRepo,
  onChange,
}: RepositorySidebarProps) {
  const { data, isLoading, isError, error } = useQuery<Repository[]>({
    queryKey: ["repositories"],
    queryFn: async () => {
      const token = localStorage.getItem("access_token");
      const response = await api.get("/api/repositories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.repositories;
    },
  });

  // paginação local
  const ITEMS_PER_PAGE = 15;
  const [page, setPage] = useState(0);
  const totalPages = useMemo(
    () => Math.ceil((data?.length ?? 0) / ITEMS_PER_PAGE),
    [data]
  );

  const pagedData = useMemo(() => {
    if (!data) return [];
    const start = page * ITEMS_PER_PAGE;
    return data.slice(start, start + ITEMS_PER_PAGE);
  }, [data, page]);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoaderIcon className="size-8 animate-spin" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p>Error: {(error as Error).message}</p>
      </div>
    );
  }

  return (
    <aside className="w-64 border-r p-4  flex flex-col">
      <h2 className="mb-3 text-lg font-semibold">Repositories</h2>
      <div className="flex-1 space-y-2 overflow-y-auto">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-left",
            selectedRepo === "all" &&
              "rounded-md bg-gradient-to-r hover:text-white from-purple-500 to-purple-600 text-white"
          )}
          onClick={() => onChange("all")}
        >
          All repositories
        </Button>

        {pagedData.map((repo) => {
          const isSelected = selectedRepo === repo.gh_repository_id;
          return (
            <Button
              key={repo.gh_repository_id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-left",
                isSelected
                  ? "rounded-md hover:text-white bg-gradient-to-r from-purple-500 to-purple-600 text-white"
                  : "hover:bg-muted/50"
              )}
              onClick={() => onChange(repo.gh_repository_id)}
            >
              {repo.name}
            </Button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 0}
          onClick={() => setPage((p) => Math.max(0, p - 1))}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          {page + 1} / {totalPages || 1}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
        >
          Next
        </Button>
      </div>
    </aside>
  );
}
