import { api } from "@/lib/api";

export interface UserProfile {
  github_id: number;
  username: string;
  name: string;
  email: string;
  avatar_url: string;
}

export async function getUserProfile(): Promise<UserProfile> {
  try {
    const response = await api.get<UserProfile>("/api/users/me");

    return response.data;
  } catch (error) {
    console.error("Error fetching storages:", error);
    throw error;
  }
}
