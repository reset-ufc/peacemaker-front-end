"use client";
// import type { Metadata } from "next";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { commentsService } from "@/services/comments";
import { type Comment, getSugestion } from "@/services/comments/action";
import { format, formatDistanceToNow } from "date-fns";
import { useQueryState } from "nuqs";
import { Suspense, useState } from "react";

/**
 * Force the page to be static and only change with a new build.
 *
 * read more about the Route Segment Config here:
 * https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
 */
// export const dynamic = "force-static";

/**
 * Generate the metadata with dynamic information.
 *
 * Read more about the Dynamic Metadata here:
 * https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
// export function generateMetadata(): Metadata {
//   return {
//     title: "Incivilities",
//   };
// }

export interface Incivility {
  id: string;
  repo_name: string;
  comment: string;
  classification_type: string;
  resolved: boolean;
  created_at: string;
  read: boolean;
}

interface IncivilityCartProps {
  incivility: Comment;
  setIncivility: (item: Comment) => void;
  suggestions: Array<string>;
  setSuggestions: (item: Array<string>) => void;
}

export function IncivilityCart({
  incivility,
  suggestions,
  setIncivility,
  setSuggestions,
}: IncivilityCartProps) {
  return (
    <button
      type="button"
      onClick={() => setIncivility(incivility)}
      className={cn(
        "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
      )}
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold">{incivility.classification}</div>
            {!incivility.solved && (
              <span className="flex h-2 w-2 rounded-full bg-blue-600" />
            )}
          </div>
          {/* <div className={cn("ml-auto text-xs")}>
            {formatDistanceToNow(new Date(incivility.), {
              addSuffix: true,
            })}
          </div> */}
        </div>
        <div className="text-xs font-medium">{incivility.comment}</div>
      </div>
    </button>
  );
}

export default function Page() {
  const { comments: incivilities } = commentsService();
  const [incivility, setIncivility] = useState<Comment | null>(null);
  const [suggestions, setSuggestions] = useState<Array<string>>([]);
  const [like] = useState<boolean>(false);
  const [dislike] = useState<boolean>(false);

  const handleSugestions = async () => {
    const sugestions = await getSugestion();
    setSuggestions(sugestions.map((sugestion) => sugestion.content));
  };

  return (
    <section className="flex flex-row h-[calc(100vh-4rem)]">
      <div className="min-w-52 w-1/3 border-r">
        <ScrollArea>
          <div className="flex flex-col gap-2 p-4 py-3">
            {incivilities ? (
              incivilities?.map((item) => (
                <Suspense key={item.comment_id}>
                  <IncivilityCart
                    incivility={item}
                    suggestions={suggestions}
                    setIncivility={setIncivility}
                    setSuggestions={setSuggestions}
                  />
                </Suspense>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                no incivilities detected
              </div>
            )}
          </div>
          {/* {JSON.stringify({ incivilities }, null, 2)} */}
        </ScrollArea>
      </div>

      <div className="w-2/3">
        {incivility ? (
          <div className="flex flex-1 flex-col">
            <div className="flex items-start p-4">
              <div className="flex items-start gap-4 text-sm">
                <Avatar>
                  <AvatarImage
                    alt={incivility.repo_full_name}
                    src={incivility.repo_full_name}
                  />
                  <AvatarFallback>
                    {incivility.repo_full_name
                      .split(" ")
                      .map((chunk) => chunk[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-semibold">
                    {incivility.repo_full_name}
                  </div>
                  <div className="line-clamp-1 text-xs">
                    {incivility.classification}
                  </div>
                </div>
              </div>
              {/* {incivility.created_at && (
                <div className="ml-auto text-xs text-muted-foreground">
                  {format(new Date(incivility.created_at), "PPpp")}
                </div>
              )} */}
            </div>
            <Separator />
            <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
              {incivility.comment}
            </div>
            <Separator className="mt-auto" />
            <div className="p-4">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-4">
                  <div
                    className={cn(
                      "mt-4 flex flex-col gap-4",
                      suggestions.length === 0 &&
                        "flex flex-row justify-between",
                    )}
                  >
                    <h2 className="text-lg font-bold">
                      Suggestions for fixing your comment
                    </h2>
                    {suggestions.length > 0 ? (
                      <div className=" flex flex-col gap-6">
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Select</TableHead>
                                <TableHead>Suggestion</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {suggestions.map((suggestion, index) => (
                                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                                <TableRow key={index}>
                                  <TableCell>
                                    <input type="radio" value={suggestion} />
                                  </TableCell>
                                  <TableCell>{suggestion}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                        <Textarea
                          className="p-4"
                          placeholder={`Reply ${incivility.repo_full_name}...`}
                          readOnly
                        />
                        <div className="flex items-center">
                          <Button type="submit" size="sm" className="ml-auto">
                            Send
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button onClick={handleSugestions}>
                        Loading suggestions
                      </Button>
                    )}
                  </div>
                  {/* <div className="flex flex-wrap items-center space-x-2">
                    <Button variant={like ? "default" : "outline"} size="icon">
                      👍
                    </Button>
                    <Button
                      variant={dislike ? "default" : "outline"}
                      size="icon"
                    >
                      👎
                    </Button>
                  </div> */}
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            No incivilities selected
          </div>
        )}
      </div>
    </section>
  );
}
