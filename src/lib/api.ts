import axios from "axios";

import { env } from "@/env.mjs";

export const api = axios.create({
  baseURL: env.BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
