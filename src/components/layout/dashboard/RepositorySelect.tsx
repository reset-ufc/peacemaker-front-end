import { useQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";

interface Repository {
  gh_repository_id: string;
  name: string;
}

interface RepositorySelectProps {
  selectedRepo: string;
  onChange: (repo: string) => void;
}

export function RepositorySelect({
  selectedRepo,
  onChange,
}: RepositorySelectProps) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["repositories"],
    queryFn: async () => {
      const t = localStorage.getItem("access_token");
      const response = await api.get("/api/repositories", {
        headers: { Authorization: `Bearer ${t}` },
      });
      return response.data.repositories as Repository[];
    },
  });

  if (isLoading) {
    return <LoaderIcon className='size-4 animate-spin' />;
  }
  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <Select value={selectedRepo} onValueChange={onChange}>
      <SelectTrigger className='w-40'>
        <SelectValue placeholder='All repositories' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>All repositories</SelectItem>
        {data?.map(repo => (
          <SelectItem key={repo.gh_repository_id} value={repo.gh_repository_id}>
            {repo.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
