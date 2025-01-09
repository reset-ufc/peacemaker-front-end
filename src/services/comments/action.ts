import { mockData } from "@/mock-data";

export type Comment = {
  comment_id: string;
  github_id: string;
  repo_id: string;
  login: string;
  repo_full_name: string;
  comment: string;
  classification: string;
  toxicity_score: number;
  friendly_comment: string;
  solved: boolean;
  solution: string | null;
};

export interface Suggestion {
  id: string;
  content: string;
}

export async function getComments(): Promise<Array<Comment>> {
  try {
    return mockData.githubComments;
  } catch (error) {
    console.error("Error fetching storages:", error);
    throw error;
  }
}

export async function getSuggestion(): Promise<Array<Suggestion>> {
  try {
    return mockData.githubSuggestions;
  } catch (error) {
    console.error("Error fetching storages:", error);
    throw error;
  }
}
