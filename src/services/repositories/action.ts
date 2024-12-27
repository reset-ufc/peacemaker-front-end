import { mockData } from "@/mock-data";

export interface Repository {
  repository_id: string;
  repository_name: string;
  repository_full_name: string;
  permissions: object;
  user_id: string;
}

export async function getRepositories(): Promise<Array<Repository>> {
  try {
    return mockData.githubRepositories;
  } catch (error) {
    console.error("Error fetching storages:", error);
    throw error;
  }
}
