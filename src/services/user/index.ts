import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "./action";

export function userService() {
  const { data: user, isLoading: loading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
  });

  return {
    loading,
    user,
  };
}
