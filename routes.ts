// index.ts
export interface Comment {
  gh_comment_id: string;
  gh_repository_id: string;
  gh_comment_sender_id: string;
  content: string;
  event_type: string;
  toxicity_score: number;
  classification: string;
  solutioned: boolean;
  suggestion_id: any;
  comment_html_url: string;
  issue_id: string;
  created_at: string;
  updated_at: string;
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
  gh_comment_id: string;
  content: string;
  is_edited: boolean;
  created_at: string;
}

// comments-response.api.ts
import { Comment } from "@/lib/types";

export interface CommentsResponse {
  comments: Array<Comment>;
}

// comment-response.api.ts
import { Comment } from "@/lib/types";

export interface CommentResponse {
  comment: Comment;
}

// suggestions-response.api.ts
import { Suggestion } from "@/lib/types";

export interface SuggestionsResponse {
  suggestions: Array<Suggestion>;
}
