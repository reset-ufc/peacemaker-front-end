import { api } from "@/lib/api";
import { COMMENTS_ROUTE } from "@/lib/routes";

export interface Comment {
  comment_id: string;
  user_id: string;
  repository_id: string;
  login: string;
  repo_full_name: string;
  created_at: string;
  content: string;
  toxicity: string;
  suggestions: {
    corrected_comment: string;
  };
  classification: string;
  solutioned: boolean;
  solution: string;
}

export async function getComments(username: string): Promise<Array<Comment>> {
  try {
    const response = await api.get<Array<Comment>>(COMMENTS_ROUTE(username));
    return response.data;
  } catch (error) {
    console.error("Error fetching storages:", error);
    throw error;
  }
}
