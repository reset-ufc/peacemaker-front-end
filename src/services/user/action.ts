import { api } from "@/lib/api";
import { PROFILE_ROUTE } from "@/lib/routes";

export interface UserProfile {
  profile: {
    github_id: number;
    username: string;
    name: string;
    email: string;
    avatar_url: string;
  };
}

export async function getUserProfile(): Promise<UserProfile> {
  try {
    const response = await api.get<UserProfile>(PROFILE_ROUTE());

    return response.data;
  } catch (error) {
    console.error("Error fetching storages:", error);
    throw error;
  }
}
