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
import { format, formatDistanceToNow } from "date-fns";
import { useQueryState } from "nuqs";
import { useState } from "react";

/**
 * Force the page to be static and only change with a new build.
 *
 * read more about the Route Segment Config here:
 * https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
 */
export const dynamic = "force-static";

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
  repo_name: string;
  id: string;
  comment: string;
  classification_type: string;
  resolved: boolean;
  created_at: string;
  read: boolean;
}

const incivilitiesData = [
  {
    id: "1",
    comment:
      "YOUR COMMENT: \n\nHelp. I have same problem. I can't wait 3 hours! Very slow! Stupid!",
    classification_type: "Impatience",
    created_at: "2024-08-26T18:43:19.000Z",
    read: false,
    repo_name: "ThePeacemakerBot/peacemaker-test-repo",
    resolved: false,
  },
  {
    id: "2",
    comment:
      "Damn, I'm having the same issue. Waiting 3 hours is too slow, this is unacceptable.",
    classification_type: "Impatience",
    created_at: "2024-08-26T18:43:19.000Z",
    read: false,
    repo_name: "ThePeacemakerBot/peacemaker-test-repo",
    resolved: false,
  },
];

const suggestions = [
  "I'm experiencing the same issue. Waiting for 3 hours is simply too slow and frustrating. It's incredibly unacceptable.",
  "I'm having the same issue. Waiting 3 hours is too frustrating.",
  "I'm having the same issue, 3 hours is too slow, this is unacceptable.",
];

export default function Page() {
  const [incivilities] = useState<Incivility[]>(incivilitiesData);
  const [invility, setInvility] = useState<Incivility | null>(null);
  const [like] = useState<boolean>(false);
  const [dislike] = useState<boolean>(false);
  const [incivilyId, setIncivilyId] = useQueryState("incivilyId", {
    clearOnDefault: true,
    shallow: true,
  });

  const handleSelect = (item: Incivility) => {
    setInvility(item);
    setIncivilyId(item.id);
  };

  return (
    <section className="flex flex-row h-[calc(100vh-4rem)]">
      <div className="min-w-52 w-1/3">
        <div className="flex items-center  px-4 py-2">
          <h1 className="text-xl font-bold">Incivilities</h1>
        </div>
        <Separator />
        <ScrollArea>
          <div className="flex flex-col gap-2 p-4 py-3">
            {incivilities.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => handleSelect(item)}
                className={cn(
                  "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                )}
              >
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">
                        {item.classification_type}
                      </div>
                      {!item.resolved && (
                        <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                      )}
                    </div>
                    <div className={cn("ml-auto text-xs")}>
                      {formatDistanceToNow(new Date(item.created_at), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                  <div className="text-xs font-medium">{item.comment}</div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="w-2/3 border">
        {invility ? (
          <div className="flex flex-1 flex-col">
            <div className="flex items-start p-4">
              <div className="flex items-start gap-4 text-sm">
                <Avatar>
                  <AvatarImage
                    alt={invility.repo_name}
                    src={invility.repo_name}
                  />
                  <AvatarFallback>
                    {invility.repo_name
                      .split(" ")
                      .map((chunk) => chunk[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-semibold">{invility.repo_name}</div>
                  <div className="line-clamp-1 text-xs">
                    {invility.classification_type}
                  </div>
                </div>
              </div>
              {invility.created_at && (
                <div className="ml-auto text-xs text-muted-foreground">
                  {format(new Date(invility.created_at), "PPpp")}
                </div>
              )}
            </div>
            <Separator />
            <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
              {invility.comment}
            </div>
            <Separator className="mt-auto" />
            <div className="p-4">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-4">
                  <div className="mt-4">
                    <h2 className="mb-2 text-lg font-bold">
                      Suggestions for fixing your comment
                    </h2>
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
                                <input type="checkbox" />
                              </TableCell>
                              <TableCell>{suggestion}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center space-x-2">
                    <Button
                      variant={like ? "default" : "outline"}
                      className={
                        like
                          ? "bg-blue-500 text-white"
                          : "border-gray-500 text-blue-500"
                      }
                    >
                      👍 Like
                    </Button>
                    <Button
                      variant={dislike ? "default" : "outline"}
                      className={
                        dislike
                          ? "bg-blue-500 text-white"
                          : "border-gray-500 text-blue-500"
                      }
                    >
                      👎 Dislike
                    </Button>
                    {/* <Button
                      onClick={handleReport}
                      variant={report ? "default" : "outline"}
                      className={
                        report
                          ? "bg-blue-500 text-white"
                          : "border-gray-500 text-blue-500"
                      }
                    >
                      🚩 Report
                    </Button> */}
                  </div>
                  <Textarea
                    className="p-4"
                    placeholder={`Reply ${invility.repo_name}...`}
                    readOnly
                  />
                  <div className="flex items-center">
                    <Button type="submit" size="sm" className="ml-auto">
                      Send
                    </Button>
                  </div>
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
