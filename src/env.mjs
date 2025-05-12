// @ts-check
import { createEnv } from "@t3-oss/env-core";
import { fly } from "@t3-oss/env-core/presets-zod";
import { z } from "zod";

export const env = createEnv({
  extends: [fly()],
  /**
   * The prefix that client-side variables must have. This is enforced both at
   * a type-level and at runtime.
   */
  clientPrefix: "VITE_PUBLIC_",

  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app isn't
   * built with invalid env vars.
   */
  server: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    /**
     * This is used for defining a default time of when `next-data` and other dynamically generated
     * but static-enabled pages should be regenerated.
     *
     * Note that this is a custom Environment Variable that can be defined by us when necessary
     * if no value is provided, it will default to 604800 (7 days)
     *
     * FIX: the next don't recognize
     */
    VERCEL_REVALIDATE_TIME: z.coerce.number().default(604800),
  },
  shared: {
    VERCEL_ENV: z
      .enum(["production", "preview", "development"])
      .default("development"),
    BASE_API_URL: z.string().url().default("http://localhost:3000"),
  },
  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    VITE_PUBLIC_BASE_URL: z
      .string()
      .url()
      .default(
        process.env.NODE_ENV === "development"
          ? "http://localhost:5173"
          : "http://localhost:4173"
      ),
    VITE_PUBLIC_GOOGLE_ANALYTICS_ID: z.string().optional(),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
    VERCEL_REVALIDATE_TIME: process.env.VERCEL_REVALIDATE_TIME,
    BASE_API_URL: process.env.BASE_API_URL,
    VITE_PUBLIC_BASE_URL: process.env.VITE_PUBLIC_BASE_URL,
    VITE_PUBLIC_GOOGLE_ANALYTICS_ID:
      process.env.VITE_PUBLIC_GOOGLE_ANALYTICS_ID,
  },

  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true,

  // Tell the library when we're in a server context.
  isServer: typeof window === "undefined",
});
