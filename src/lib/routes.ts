// Exporting routes definition
export const ANALYTICS_ROUTE = (): string => "api/v1/analytics";
export const ANALYTIC_REPOSITORY_ROUTE = (repository_id: string): string =>
  `${repository_id}/analytics`;
export const PROFILE_ROUTE = (): string => "api/v1/user/profile";
export const REPOSITORIES_ROUTE = (): string => "api/v1/repository";
export const REPOSITORIES_LOADER_ROUTE = (): string =>
  "api/v1/repository/remote";
export const COMMENTS_ROUTE = (username: string): string =>
  `api/v1/comments/${username}`;
export const REPOSITORY_COMMENTS_ROUTE = (repository_id: string): string =>
  `comments/${repository_id}/`;
export const INCIVILITIES_COMMENT_SUGGESTION_ROUTE = (): string =>
  "suggestions";
export const GITHUB_AUTH_ROUTE = (): string => "api/v1/oauth/github";
export const AUTH_GITHUB_CALLBACK_ROUTE = (code: string): string =>
  `api/v1/oauth/github/callback?code=${code}`;
