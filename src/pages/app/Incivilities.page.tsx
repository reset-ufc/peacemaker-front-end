import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { CommentModeration } from "@/components/layout/incivilities/CommentModeration";
import { api } from "@/lib/api";
import { Comment } from "@/types";

export function IncivilitiesPage() {
  const query = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const t = localStorage.getItem("access_token");
      await new Promise(resolve => setTimeout(resolve, 1500));
      const request: AxiosResponse<{ comments: Array<Comment> }> =
        await api.get("/api/comments?with_parent=true", {
          headers: {
            Authorization: `Bearer ${t}`,
          },
        });

      return request.data.comments;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: false,
  });

  // Create a Loading component
  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  // Handle errors with a fallback component
  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  return (
    <main className="bg-background h-[calc(100vh-4rem)]">
      <CommentModeration commentsData={query.data ?? []} />
    </main>
  );
}
