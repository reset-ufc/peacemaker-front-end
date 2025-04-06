export interface Repository {
  gh_repository_id: string;
  name: string;
  gh_repo_fullname: string;
  gh_url: string;
  private: boolean;
  owner_gh_id: string;
  created_at: string;
}

export interface SuggestionItem {
  content: string;
}

export interface SuggestionGroup {
  suggestion_selected_index: number | null;
  gh_comment_id: string;
  suggestions: SuggestionItem[];
  is_edited: boolean;
  created_at: string;
}

export interface SuggestionResponse {
  suggestions: SuggestionGroup[];
}

export interface SuggestionItemCardProps {
  suggestion: SuggestionItem;
  isSelected: boolean;
  isPreviouslySelected: boolean;
  isDisabled: boolean;
  isEditing: boolean;
  editedContent: string;
  onClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface SuggestionGroupComponentProps {
  group: SuggestionGroup;
  groupIndex: number;
  selectedGroup: number | null;
  selectedSuggestion: number | null;
  editedContent: string;
  isEditing: boolean;
  isAccepted: boolean;
  handleSelectSuggestion: (groupIndex: number, suggestionIndex: number) => void;
  setEditedContent: (content: string) => void;
  handleEdit: () => void;
  handleConfirmEdit: () => void;
  handleCancelEdit: () => void;
  handleAccept: () => void;
}

export interface SuggestionResponse {
  suggestions: SuggestionGroup[];
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
  solutioned: boolean;
  suggestion_id: string;
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

export interface Profile {
  github_id: string;
  username: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface ModerationActivityItem {
  month: string;
  comments: number;
  flags: number;
}

interface RecentFlaggedItem {
  author: string;
  severity: string;
  action: string;
}

interface RadarFlagsItem {
  category: string;
  value: number;
}

interface ModerationActionsData {
  total: number;
  data: { name: string; value: number }[];
}

export interface DashboardChartsProps {
  moderationActivity: ModerationActivityItem[];
  recentFlagged: RecentFlaggedItem[];
  radarFlags: RadarFlagsItem[];
  moderationActions: ModerationActionsData;
}

export interface DashboardCardsProps {
  overview: {
    averageCommentScore: number;
    medianCommentScore: number;
    totalComments: number;
    resolvedComments: number;
  };
}

export interface DashboardHeaderProps {
  period: string;
  onPeriodChange: (value: string) => void;
}
