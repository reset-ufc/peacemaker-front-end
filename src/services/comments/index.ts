import { useQuery } from "@tanstack/react-query";

import { getComments } from "./action";

export function commentsService(username: string) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: comments, isLoading: loading } = useQuery({
    queryKey: ["user-comments", username],
    queryFn: () => getComments(username),
    refetchInterval: 1000 * 60 * 15, // 15 minutes
  });

  return {
    loading,
    comments,
  };
}
