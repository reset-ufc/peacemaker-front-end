import { mockData } from "@/mock-data";

export interface UserProfile {
  avatar_url: string;
  email: string;
  github_id: string;
  login: string;
  name: string;
}

export async function getUserProfile(): Promise<UserProfile> {
  try {
    return mockData.userProfile.profile;
  } catch (error) {
    console.error("Error fetching storages:", error);
    throw error;
  }
}
