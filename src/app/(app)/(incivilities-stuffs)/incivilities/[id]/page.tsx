import type { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";

import { format } from "date-fns";

import { SuggestionList } from "@/components/layout/SuggestionList";
import { api } from "@/lib/api";
import { Comment } from "@/types";

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
export const dynamic = "force-dynamic";

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

const exampleSuggestions = {
  suggestions: [
    {
      suggestion_selected_index: 0,
      gh_comment_id: "2706675513",
      suggestions: [
        {
          content:
            "@meiazero I'm having trouble getting this bot to run. Could you please help me figure out what's going on?",
        },
        {
          content:
            "I'm experiencing issues with this code. It doesn't seem to be working in any environment. Can someone offer some guidance?",
        },
        {
          content:
            "The bot isn't running as expected. I'd appreciate any assistance in resolving this issue and getting it up and running smoothly.",
        },
      ],
      is_selected: false,
      is_edited: false,
      created_at: "2025-03-09T23:39:42.935Z",
    },
  ],
};

export default async function IncivilityPage({ params }: IncivilityPageProps) {
  const p = await params;
  const c = await cookies();

  const t = c.get("access_token")?.value;

  const requestComment = await api.get<{ comment: Comment }>(
    `/api/comments/${p.id}`,
    {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    }
  );

  const findIncivility = requestComment.data.comment;

  const requestSuggestions = await api.get(
    `/api/comments/${findIncivility._id}/suggestions`,
    {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    }
  );
  const suggestions = requestSuggestions.data.suggestions;

  return (
    <>
      {findIncivility.gh_comment_id ? (
        <div className="flex h-full flex-1 flex-col justify-between">
          <div className="flex flex-col">
            <div className="flex items-start p-4">
              <div className="flex items-start gap-4 text-sm">
                <Image
                  alt={`${findIncivility?.repository_fullname}'s avatar`}
                  className="h-10 w-10 rounded-full"
                  height={40}
                  src={`https://github.com/${findIncivility?.repository_owner}.png`}
                  width={40}
                  unoptimized
                />
                <div className="grid gap-1">
                  <div className="font-semibold">
                    {findIncivility?.repository_owner}
                  </div>
                  <div className="line-clamp-1 text-xs">
                    {findIncivility?.repository_fullname}
                  </div>
                </div>
              </div>
              {findIncivility?.comment_created_at && (
                <div className="text-muted-foreground ml-auto text-xs">
                  {format(
                    new Date(findIncivility?.comment_created_at),
                    "PPPpp"
                  )}
                </div>
              )}
            </div>

            <code className="flex-1 px-2 pt-4 text-sm whitespace-pre-wrap">
              {findIncivility?.content}
            </code>
          </div>

          <SuggestionList suggestions={suggestions} />
        </div>
      ) : (
        <div className="container">
          <h1>Incivility {p.id} not found</h1>
        </div>
      )}
    </>
  );
}
