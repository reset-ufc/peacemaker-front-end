import { useQuery } from "@tanstack/react-query";

import { getUserProfile } from "./action";

export function userService() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: user, isLoading: loading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
    refetchInterval: 1000 * 60 * 15, // 15 minutes
  });

  return {
    loading,
    user,
  };
}
