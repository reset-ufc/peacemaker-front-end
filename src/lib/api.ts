import axios from "axios";

import { env } from "@/env.mjs";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
    // Authorization:
    // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NjI2OTQxOCIsImlhdCI6MTczNTE3MjM2NTM0NywiZXhwIjoxNzM1Nzc3MTY1MzQ3LCJ1c2VyIjp7Im5hbWUiOiJFbWFudWVsIEF2aWxhIiwiZ2l0aHViX2lkIjoiNzYyNjk0MTgifX0.kdEUlz5B96_DkvtHfPg1xn2HqdpEhAb3JS3ZITaapkA",
  },
});

// Exporting routes definition
export const USER_PROFILE_ROUTE = (): string => "/user/profile";
