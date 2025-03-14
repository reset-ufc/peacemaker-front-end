import { Metadata } from "next";
import { notFound } from "next/navigation";

import { baseUrl } from "@/app/sitemap";
import { CustomMDX } from "@/components/layout/Mdx";
import { formatDate, getDocPosts } from "@/lib/mdx";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Force the page to be static and only change with a new build.
 *
 * read more about the Route Segment Config here:
 * https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
 * 'auto' | 'error' | 'force-static' | 'force-dynamic'
 */
export const dynamic = "force-static";

/**
 * Configure the dynamicParams option.
 *
 * read more about the dynamicParams option here:
 * https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
 */
export const dynamicParams = true;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  let docs = getDocPosts();

  return docs.map(doc => ({
    slug: doc.slug,
  }));
}

/**
 * Generate the metadata with dynamic information.
 *
 * Read more about the Dynamic Metadata here:
 * https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | undefined> {
  const promiseProps = await params;

  const { slug } = promiseProps;

  let doc = getDocPosts().find(doc => doc.slug === slug);

  if (!doc) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = doc.metadata;
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${doc.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const paramsPromise = await params;

  const { slug } = paramsPromise;
  let doc = getDocPosts().find(doc => doc.slug === slug);

  if (!doc) {
    notFound();
  }

  // return (
  //   <>
  //     <pre>{JSON.stringify(doc, null, 2)}</pre>
  //   </>
  // );
  return (
    <section className="container mx-auto pt-12">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: doc.metadata.title,
            datePublished: doc.metadata.publishedAt,
            dateModified: doc.metadata.publishedAt,
            description: doc.metadata.summary,
            image: doc.metadata.image
              ? `${baseUrl}${doc.metadata.image}`
              : `/og?title=${encodeURIComponent(doc.metadata.title)}`,
            url: `${baseUrl}/blog/${doc.slug}`,
            author: {
              "@type": "Person",
              name: "My Portfolio",
            },
          }),
        }}
      />

      <h1 className="title text-2xl font-semibold tracking-tighter">
        {doc.metadata.title}
      </h1>
      <div className="mt-2 mb-8 flex items-center justify-between text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(doc.metadata.publishedAt)}
        </p>
      </div>
      <article className="font-thin">
        <CustomMDX source={doc.content} />
        {/* <pre>{JSON.stringify(doc.content, null, 2)}</pre> */}
      </article>
    </section>
  );
}
