import Link from "next/link";

import { formatDate, getDocPosts } from "@/lib/mdx";

export default function Page() {
  let allDocs = getDocPosts();

  return (
    <div className="container mx-auto pt-12">
      {allDocs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map(doc => (
          <Link
            key={doc.slug}
            className="mb-4 flex flex-col space-y-1"
            href={`/docs/${doc.slug}`}
          >
            <div className="flex w-full flex-col space-x-0 md:flex-row md:space-x-2">
              <p className="w-[100px] text-neutral-600 tabular-nums dark:text-neutral-400">
                {formatDate(doc.metadata.publishedAt, false)}
              </p>
              <p className="tracking-tight text-neutral-900 dark:text-neutral-100">
                {doc.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}
