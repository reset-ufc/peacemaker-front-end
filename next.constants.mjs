// @ts-check

import { env } from "./src/env.mjs";

/**
 * This is used for defining a default time of when `next-data` and other dynamically generated
 * but static-enabled pages should be regenerated.
 *
 * Note that this is a custom Environment Variable that can be defined by us when necessary
 * if no value is provided, it will default to 432000 (5 days)
 */
export const VERCEL_REVALIDATE = Number(
  env.NEXT_PUBLIC_VERCEL_REVALIDATE_TIME || 432000,
);

export const AUTH_TRUST_HOST = !!env.VERCEL_ENV;

export const ENABLE_STATIC_EXPORT = env.NEXT_PUBLIC_STATIC_EXPORT;

export const SCOPE = encodeURIComponent("repo,user:email");
export const STATE = encodeURIComponent("random_state_string");
