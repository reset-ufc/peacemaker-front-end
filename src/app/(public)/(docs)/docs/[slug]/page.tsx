import { Metadata } from "next";
import { notFound } from "next/navigation";

import { MDXRemote } from "next-mdx-remote/rsc";

import { DocsPageHeader } from "@/components/layout/mdx/docs-page-header";
import { DocsPager } from "@/components/layout/mdx/docs-pager";
import { components } from "@/components/layout/mdx/mdx-components";
import { getDocPosts } from "@/lib/mdx";

interface DocPageProps {
  params: {
    slug: string[];
  };
}

/**
 * Função para buscar um documento baseado no `slug`
 */
async function getDocFromParams(params: DocPageProps["params"]) {
  const slug = params.slug?.join("/") || "getting-started";
  const doc = getDocPosts().find(doc => doc.slug === slug);

  if (!doc) {
    return null;
  }

  return doc;
}

/**
 * Gera os metadados dinâmicos para a página
 */
export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams(params);

  if (!doc) {
    return {};
  }

  return {
    title: doc.metadata.title,
    description: doc.metadata.summary,
  };
}

/**
 * Gera os caminhos estáticos para pré-renderização
 */
export async function generateStaticParams(): Promise<
  DocPageProps["params"][]
> {
  return getDocPosts().map(doc => ({
    slug: doc.slug.split("/"),
  }));
}

/**
 * Página de documentação
 */
export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams(params);

  if (!doc) {
    notFound();
  }

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <DocsPageHeader
          heading={doc.metadata.title}
          text={doc.metadata.summary}
        />
        <div className="mdx px-4 md:px-8">
          <MDXRemote source={doc.content} components={components} />
        </div>
        <hr className="my-4 md:my-6" />
        <DocsPager doc={doc} />
      </div>
    </main>
  );
}
