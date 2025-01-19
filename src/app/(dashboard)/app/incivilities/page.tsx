"use client";

import { ComponentProps, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { format, formatDistanceToNow } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { commentsService } from "@/services/comments";
import { Comment } from "@/services/comments/action";

import { MarkdownDisplay } from "./components/MarkdownDisplay";
import { Suggestions } from "./components/Suggestions";

export interface Incivility {
  id: string;
  repo_name: string;
  comment: string;
  classification_type: string;
  resolved: boolean;
  created_at: string;
  read: boolean;
}

export default function IncivilitiesPage() {
  const { comments: incivilities } = commentsService();
  const [incivility, setIncivility] = useState<{
    selected: string | null;
    incivility: Comment | null;
  }>({
    selected: null,
    incivility: null,
  });

  return (
    <main className="flex h-[calc(100vh-4rem)] flex-row">
      <ScrollArea className="h-full border-r sm:w-2/4">
        <div className="flex flex-col gap-2 p-4 pt-0">
          {incivilities ? (
            incivilities.map(item => (
              <button
                key={item.comment_id}
                className={cn(
                  "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                  incivility.selected === item.comment_id && "bg-muted",
                )}
                onClick={() =>
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  setIncivility((prevState: any) => ({
                    ...prevState,
                    selected: item.comment_id,
                    incivility: item,
                  }))
                }
              >
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">{item.repo_full_name}</div>
                      {!item.solutioned && (
                        <Badge
                          variant="secondary"
                          className="border border-muted-foreground"
                        >
                          Unsolved
                        </Badge>
                      )}
                    </div>
                    <div
                      className={cn(
                        "ml-auto text-xs",
                        incivility.selected === item.comment_id
                          ? "text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {formatDistanceToNow(new Date(item.created_at), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                </div>
                <div className="line-clamp-2 text-xs text-muted-foreground">
                  {item.content.substring(0, 300)}
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    key={item.classification}
                    variant={getBadgeVariantFromLabel(item.classification)}
                    className="w-fit rounded-lg"
                  >
                    {item.classification}
                  </Badge>
                </div>
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              no incivilities detected
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="flex h-full w-3/4 flex-col">
        {incivility ? (
          <div className="flex flex-1 flex-col">
            <div className="flex items-start p-4">
              <div className="flex items-start gap-4 text-sm">
                <Avatar>
                  <AvatarImage
                    alt={`https://github.com/${incivility?.incivility?.login}.png`}
                  />
                  <AvatarFallback>
                    {incivility?.incivility?.login
                      .split(" ")
                      .map(chunk => chunk[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-semibold">
                    {incivility?.incivility?.login}
                  </div>
                  <div className="line-clamp-1 text-xs">
                    {incivility?.incivility?.repo_full_name}
                  </div>
                </div>
              </div>
              {incivility?.incivility?.created_at && (
                <div className="ml-auto text-xs text-muted-foreground">
                  {format(
                    new Date(incivility?.incivility?.created_at),
                    "PPPpp",
                  )}
                </div>
              )}
            </div>
            <Separator />

            <ScrollArea className="h-full w-full">
              <MarkdownDisplay
                className="flex-1 whitespace-pre-wrap p-4 text-sm"
                text={incivility?.incivility?.content as string}
              />
            </ScrollArea>
            <Separator className="mt-auto" />
            <Suggestions
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              suggestions={incivility?.incivility?.suggestions as any}
            />
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            No message selected
          </div>
        )}
      </div>
    </main>
  );
}

function getBadgeVariantFromLabel(
  label: string,
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  return "outline";
}
