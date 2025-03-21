export interface Comment {
  gh_comment_id: string;
  gh_repository_id: string;
  gh_repository_name: string;
  gh_repository_owner: string;
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
  parent?: Parent;
  suggestions: Suggestion[];
}

export interface Parent {
  comment_id: string;
  gh_parent_id: string;
  gh_parent_number: number;
  title: string;
  html_url: string;
  is_open: string;
  type: string;
  created_at: string;
}

export interface Suggestion {
  _id: string;
  gh_comment_id: string;
  content: string;
  is_edited: boolean;
  created_at: string;
}

export interface CommentsResponse {
  comments: Array<Comment>;
}

export interface CommentResponse {
  comment: Comment;
}

// Interfaces para gerenciamento de estado interno
export interface CommentState {
  commentId: string;
  selectedSuggestionId?: string;
  editedContent?: string;
}
