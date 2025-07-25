import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { LoaderIcon } from "lucide-react";

import { CommentModeration } from "@/components/layout/incivilities/CommentModeration";
import { api } from "@/lib/api";
import { Comment } from "@/types";

export function IncivilitiesPage() {
  const query = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const t = localStorage.getItem("access_token");

      // Simulate a delay
      // await new Promise(resolve => setTimeout(resolve, 1500));

      const request: AxiosResponse<{ comments: Array<Comment> }> =
        await api.get("/api/comments", {
          headers: {
            Authorization: `Bearer ${t}`,
          },
        });

      return request.data.comments;
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
    <main className='bg-background h-[calc(100vh-4rem)]'>
      <CommentModeration commentsData={query.data ?? []} />
    </main>
  );
}
