import { USER_PROFILE_ROUTE, api } from "@/lib/api";

export interface UserProfile {
  avatar_url: string;
  email: string;
  github_id: string;
  username: string;
  name: string;
}

export async function getUserProfile(): Promise<UserProfile> {
  try {
    const response = await api.get(USER_PROFILE_ROUTE());
    return response.data.profile;
  } catch (error) {
    console.error("Error fetching storages:", error);
    throw error;
  }
}
