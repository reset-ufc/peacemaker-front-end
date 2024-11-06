// @ts-check

import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";
import { ENABLE_STATIC_EXPORT } from "./next.constants.mjs";

const jiti = createJiti(fileURLToPath(import.meta.url));

await jiti.import("./src/env.mjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Just to ensure that React is always on strict mode
  reactStrictMode: true,

  // We want to always enforce that SWC minifies the sources even during Development mode
  // so that bundles are minified on-the-go. SWF minifying is fast, and has almost no penalties
  swcMinify: true,

  // We don't use trailing slashes on URLs from the Node.js Website
  trailingSlash: false,

  // We don't want to redirect with trailing slashes
  skipTrailingSlashRedirect: true,

  // We don't want to run Type Checking on Production Builds
  // as we already check it on the CI within each Pull Request
  typescript: { ignoreBuildErrors: true },

  // We don't want to run ESLint Checking on Production Builds
  // as we already check it on the CI within each Pull Request
  // we also configure ESLint to run its lint checking on all files (next lint)
  eslint: { dirs: ["."], ignoreDuringBuilds: true },

  experimental: {
    // A list of packages that Next.js should automatically evaluate and optimise the imports for.
    // @see https://vercel.com/blog/how-we-optimized-package-imports-in-next-js
    optimizePackageImports: ["tailwindcss"],
  },

  // On static export builds we want to enable the export feature
  output: ENABLE_STATIC_EXPORT ? undefined : "standalone",
};

export default nextConfig;
