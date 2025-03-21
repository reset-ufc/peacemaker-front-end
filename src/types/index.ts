export interface Comment {
  gh_comment_id: string;
  gh_repository_id: string;
  gh_comment_sender_id: string;
  gh_comment_sender_login: string;
  content: string;
  event_type: string;
  toxicity_score: number;
  classification: string;
  solutioned: boolean;
  suggestion_id: any;
  comment_html_url: string;
  issue_id: string;
  created_at: string;
  parent: Parent;
}

export interface Parent {
  comment_id: string;
  gh_parent_id: string;
  title: string;
  html_url: string;
  is_open: string;
  type: string;
  created_at: string;
}

export interface Suggestion {
  _id?: string;
  gh_comment_id: string;
  content: string;
  is_edited: boolean;
  created_at: string;
}

export * from "./comment-response.api";
export * from "./comments-response.api";
export * from "./suggestions-response.api";
