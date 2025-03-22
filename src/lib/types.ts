export type CommentCategory =
  | "all"
  | "bitter_frustration"
  | "mocking"
  | "irony"
  | "insulting"
  | "vulgarity"
  | "identity_attack"
  | "entitlement"
  | "impatience"
  | "threat"
  | "neutral"
  | "resolved";

export type ToxicityLevel = "high" | "medium" | "low";

export interface HistoryItem {
  action: string;
  date: string;
  note?: string;
}

export interface User {
  _id: string;
  gh_id: string;
  username: string;
  avatar_url: string;
  encripted_token?: string;
  created_at: string;
}

export interface Repository {
  gh_repository_id: string;
  name: string;
  gh_repo_fullname: string;
  gh_url: string;
  private: boolean;
  owner_gh_id: string;
  created_at: string;
}

export interface Comment {
  _id: string;
  gh_id: string;
  gh_repository_id: string;
  gh_comment_sender_id: string;
  content: string;
  event_type: string;
  toxicity_score: number;
  classification: string;
  solutioned: boolean;
  suggestions?: string;
  created_at: string;
  updated_at?: string;
  comment_html_url?: string;
  issue_id?: string;

  // Campos adicionais para UI
  category?: CommentCategory;
  toxicityLevel?: ToxicityLevel;
  history?: HistoryItem[];
}

export type ParentType = "issue" | "pull_request";

export interface Parent {
  _id: string;
  gh_comment_id: string;
  gh_id: string;
  title: string;
  html_url: string;
  is_open: boolean;
  type: ParentType;
  created_at: string;
}

export interface Suggestion {
  _id: string;
  gh_comment_id: string;
  content: string;
  is_edited: boolean;
  created_at: string;
}
