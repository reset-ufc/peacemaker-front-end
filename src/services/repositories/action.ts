import { api } from "@/lib/api";
import { REPOSITORIES_ROUTE } from "@/lib/routes";

export interface Repository {
  repository_id: number;
  repository_name: string;
  description: string;
  github_html_url: string;
  is_private: boolean;
  is_fork: boolean;
  is_archived: boolean;
  is_disabled: boolean;
  is_template: boolean;
  visibility: string;
  user_permissions: UserPermissions;
  user_id: number;
}

export interface UserPermissions {
  admin: boolean;
  maintain: boolean;
  push: boolean;
  triage: boolean;
  pull: boolean;
}

export async function getRepositories(): Promise<{
  repositories: Array<Repository>;
}> {
  try {
    const response = await api.get<{
      repositories: Array<Repository>;
    }>(REPOSITORIES_ROUTE());

    return response.data;
  } catch (error) {
    console.error("Error fetching storages:", error);
    throw error;
  }
}
