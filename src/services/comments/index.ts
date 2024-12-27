import { useQuery } from "@tanstack/react-query";
import { getComments } from "./action";

export function commentsService() {
  const { data: comments, isLoading: loading } = useQuery({
    queryKey: ["user-comments"],
    queryFn: getComments,
    refetchInterval: 1000 * 60 * 15, // 15 minutes
  });

  return {
    loading,
    comments,
  };
}
