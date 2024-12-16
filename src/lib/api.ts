import axios from "axios";

import { env } from "@/env.mjs";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_BASE_API_URL,
});

// Exporting routes definition
export const AVARAGE_COMMENT_SCORE = (repository_id: string): string =>
  `gh-comments/${repository_id}/average-score`;
