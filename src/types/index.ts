export interface Comment {
  _id: string;
  gh_comment_id: string;
  content: string;
  comment_created_at: string;
  author_id: string;
  parent: CommentParent;
  repository_fullname: string;
  is_repository_private: boolean;
  repository_owner: string;
  toxicity_score: number;
  toxicity_analyzed_at: string;
  flagged: boolean;
  classification: string;
  solutioned: boolean;
  solution: string;
  solution_analyzed_at: any;
  solution_id: any;
  event_type: string;
  installation_id: number;
  moderated: boolean;
  moderation_action: any;
  __v: number;
}

export interface CommentParent {
  type: string;
  gh_parent_id: number;
  title: string;
  url: string;
}

export interface Suggestion {
  is_selected: boolean;
  gh_comment_id: string;
  suggestions: Array<{
    content: string;
  }>;
  is_edited: boolean;
  created_at: string;
}
