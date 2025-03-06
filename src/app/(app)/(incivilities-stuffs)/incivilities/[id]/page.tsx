import type { Metadata } from "next";
import Image from "next/image";

import { format } from "date-fns";

import { Suggestions } from "@/components/layout/Suggestions";
import { mockData } from "@/mock";

interface IncivilityPageProps {
  params: Promise<{
    id: string;
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

/**
 * Generate the metadata with dynamic information.
 *
 * Read more about the Dynamic Metadata here:
 * https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata({
  params,
}: IncivilityPageProps): Promise<Metadata> {
  const p = await params;
  return {
    title: `Incivility ${p.id}`,
  };
}

export default async function IncivilityPage({ params }: IncivilityPageProps) {
  const p = await params;

  const findIncivility = mockData.githubComments.find(
    item => item.comment_id === p.id
  );

  return (
    <div className="flex h-full flex-1 flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex items-start p-4">
          <div className="flex items-start gap-4 text-sm">
            <Image
              alt={`${findIncivility?.login}'s avatar`}
              className="h-10 w-10 rounded-full"
              height={40}
              src={`https://github.com/${findIncivility?.login}.png`}
              width={40}
              unoptimized
            />
            <div className="grid gap-1">
              <div className="font-semibold">{findIncivility?.login}</div>
              <div className="line-clamp-1 text-xs">
                {findIncivility?.repo_full_name}
              </div>
            </div>
          </div>
          {findIncivility?.created_at && (
            <div className="text-muted-foreground ml-auto text-xs">
              {format(new Date(findIncivility?.created_at), "PPPpp")}
            </div>
          )}
        </div>

        <code className="flex-1 text-xs whitespace-pre-wrap">
          {findIncivility?.content}
        </code>
      </div>

      <Suggestions suggestions={findIncivility?.suggestions} />
    </div>
  );
}
