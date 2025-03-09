import type { Metadata } from "next";
import Image from "next/image";

import { format } from "date-fns";

import { SuggestionList } from "@/components/layout/Suggestions";
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

const exampleSuggestions = {
  gh_comment_id: "123456789",
  suggestions: [
    {
      content:
        "Sugiro alterar o termo 'idiota' para 'inadequado'. Isso mantém a crítica sem usar linguagem ofensiva.",
    },
    {
      content:
        "Recomendo remover completamente a frase ofensiva e focar apenas nos aspectos técnicos da discussão.",
    },
    {
      content:
        "Você poderia reformular seu comentário para: 'Discordo dessa abordagem pois ela não considera os casos de uso X e Y'.",
    },
  ],
  is_edited: false,
  selected_suggestion_index: null,
};

export default async function IncivilityPage({ params }: IncivilityPageProps) {
  const p = await params;

  const request = await api.get<{ comment: Comment }>(`/api/comments/${p.id}`);

  const findIncivility = request.data.comment;

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

            <code className="flex-1 text-xs whitespace-pre-wrap">
              {findIncivility?.content}
            </code>
          </div>

          <SuggestionList suggestions={exampleSuggestions} />
        </div>
      ) : (
        <div className="container">
          <h1>Incivility {p.id} not found</h1>
        </div>
      )}
    </>
  );
}
