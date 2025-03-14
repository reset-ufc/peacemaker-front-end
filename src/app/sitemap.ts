import { env } from "@/env.mjs";
import { getDocPosts } from "@/lib/mdx";

export const baseUrl = env.NEXT_PUBLIC_BASE_URL;

export default async function sitemap() {
  let docs = getDocPosts().map(doc => ({
    url: `${baseUrl}/docs/${doc.slug}`,
    lastModified: doc.metadata.publishedAt,
  }));

  let routes = ["", "/docs"].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...docs];
}
