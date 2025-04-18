export interface Repository {
  gh_repository_id: string;
  name: string;
  gh_repo_fullname: string;
  gh_url: string;
  private: boolean;
  owner_gh_id: string;
  created_at: string;
}

export interface IncivilityData {
  week: string;
  count: number;
}

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
  parentType: "issue" | "pull_request";
  solutioned: boolean;
  suggestion_id: string | null;
  comment_html_url: string;
  issue_id: string;
  created_at: string;
  needsAttention: boolean;
  editAttempts: number;
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

export interface Feedback {
  suggestion_id: string;
  type: "positive" | "negative";
  justification?: string;
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

export interface Profile {
  github_id: string;
  username: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface RecentFlaggedItem {
  author: string;
  severity: "High" | "Medium" | "Low";
  action: string;
}

export interface RadarFlagsItem {
  category: string;
  value: number;
}

interface ModerationActions {
  data: { name: string; value: number }[];
  total: number;
}

export interface DashboardChartsProps {
  recentFlagged: RecentFlaggedItem[];
  radarFlags: RadarFlagsItem[];
  moderationActions: ModerationActions;
}
export interface DashboardCardsProps {
  overview: {
    averageCommentScore: number;
    medianCommentScore: number;
    totalComments: number;
    resolvedComments: number;
  };
}
export interface ModerationActivityItem {
  month: string;
  comments: number;
  flags: number;
}
export interface DashboardHeaderProps {
  period: string;
  onPeriodChange: (value: string) => void;
}
