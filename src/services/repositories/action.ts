import { REPOSITORIES_ROUTE, api } from "@/lib/api";

export interface Repository {
  repository_id: number;
  repository_name: string;
  repository_full_name: string;
  permissions: object;
  user_id: string;
}

export async function getRepositories(): Promise<Array<Repository>> {
  try {
    const response = await api.get(REPOSITORIES_ROUTE(), {});
    return response.data.repositories;
  } catch (error) {
    console.error("Error fetching storages:", error);
    throw error;
  }
}
