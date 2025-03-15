import Link from "next/link";

import { DocsSidebar } from "@/components/layout/mdx/docs-sidebar";
import { SearchProvider } from "@/components/layout/mdx/search-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { formatDate, getDocPosts } from "@/lib/mdx";

export default function DocsPage() {
  let allDocs = getDocPosts();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar exclusiva para esta página */}
      <SearchProvider>
        <SidebarProvider>
          <DocsSidebar />
        </SidebarProvider>
      </SearchProvider>

      {/* Conteúdo principal */}
      <div className="container mx-auto flex-1 pt-12">
        <h1 className="text-4xl font-extrabold tracking-tight">Documentação</h1>
        <p className="text-muted-foreground text-xl">
          Selecione um documento para começar:
        </p>

        <div className="mt-8 space-y-4">
          {allDocs
            .sort((a, b) =>
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
                ? -1
                : 1
            )
            .map(doc => (
              <Link
                key={doc.slug}
                className="block rounded-lg border border-gray-200 p-4 transition hover:bg-gray-100 dark:hover:bg-gray-800"
                href={`/docs/${doc.slug}`}
              >
                <div className="flex flex-col space-y-1">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {formatDate(doc.metadata.publishedAt, false)}
                  </p>
                  <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    {doc.metadata.title}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
