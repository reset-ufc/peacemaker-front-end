import axios from "axios";

import { env } from "@/env.mjs";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
    // Authorization:
    // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NjI2OTQxOCIsImlhdCI6MTczNTE3MjM2NTM0NywiZXhwIjoxNzM1Nzc3MTY1MzQ3LCJ1c2VyIjp7Im5hbWUiOiJFbWFudWVsIEF2aWxhIiwiZ2l0aHViX2lkIjoiNzYyNjk0MTgifX0.kdEUlz5B96_DkvtHfPg1xn2HqdpEhAb3JS3ZITaapkA",
  },
  withCredentials: true,
});

// Exporting routes definition
export const ANALYTICS_ROUTE = (): string => "analytics";
export const ANALYTIC_REPOSITORY_ROUTE = (repository_id: string): string =>
  `${repository_id}/analytics`;
export const PROFILE_ROUTE = (): string => "profile";
export const REPOSITORIES_ROUTE = (): string => "gh-repositories";
export const COMMENTS_ROUTE = (): string => "gh-comments";
export const REPOSITORY_COMMENTS_ROUTE = (repository_id: string): string =>
  `gh-comments/${repository_id}/`;
export const INCIVILITIES_COMMENT_SUGGESTION_ROUTE = (): string =>
  "gh-suggestions";
export const GITHUB_AUTH_ROUTE = (): string => "/auth/github";
export const AUTH_GITHUB_CALLBACK_ROUTE = (code: string): string =>
  `/auth/github/callback?code=${code}`;
