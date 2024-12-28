"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { cn } from "@/lib/utils";
import { commentsService } from "@/services/comments";
import { type Comment, getSugestion } from "@/services/comments/action";
import { Suspense, useState } from "react";

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
  setIncivility,
}: IncivilityCartProps) {
  return (
    <button
      type="button"
      onClick={() => setIncivility(incivility)}
      className={cn(
        "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
      )}
    >
      <div className="flex w-full flex-col gap-1 ">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold ">{incivility.repo_full_name}</h1>
            {!incivility.solved && (
              <span className="flex h-2 w-2 rounded-full bg-blue-600" />
            )}
          </div>
          <div>
            <p className={cn(incivility.solved === true && "font-bold")}>
              {incivility.comment}
            </p>
          </div>
          {/* <div className={cn("ml-auto text-xs")}>
            {formatDistanceToNow(new Date(incivility.), {
              addSuffix: true,
            })}
          </div> */}
          <Badge className="w-fit">{incivility.classification}</Badge>
        </div>
      </div>
    </button>
  );
}

export default function Page() {
  const { comments: incivilities } = commentsService();
  const [incivility, setIncivility] = useState<Comment | null>(null);
  const [suggestions, setSuggestions] = useState<Array<string>>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>("");

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
        </ScrollArea>
      </div>

      <div className="w-2/3">
        {incivility ? (
          <div className="flex flex-1 flex-col">
            <div className="flex items-start p-4">
              <div className="flex items-start gap-4 text-sm">
                <Avatar>
                  <AvatarImage
                    alt={`https://github.com/${incivility.repo_full_name}`}
                    src={`https://github.com/${incivility.repo_full_name}.png`}
                  />
                  <AvatarFallback>
                    {incivility.repo_full_name
                      .split(" ")
                      .map((chunk) => chunk[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-2">
                  <div className="font-semibold text-2xl">
                    {incivility.repo_full_name}
                  </div>
                  <Badge className="w-fit">{incivility.classification}</Badge>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex-1 px-4 py-8 text-md">{incivility.comment}</div>
            <Separator className="mt-auto" />
            <div className="p-4">
              <div className="grid gap-4">
                <div
                  className={cn(
                    "mt-4 flex flex-col gap-4",
                    suggestions.length === 0 && "flex flex-row justify-between",
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
                                  <form>
                                    <input
                                      type="radio"
                                      value={suggestion}
                                      checked={
                                        selectedSuggestion === suggestion
                                      }
                                      onChange={() =>
                                        setSelectedSuggestion(suggestion)
                                      }
                                    />
                                  </form>
                                </TableCell>
                                <TableCell className="flex flex-row justify-between">
                                  {suggestion}

                                  {selectedSuggestion === suggestion && (
                                    <div className="flex flex-wrap items-center space-x-2">
                                      <button
                                        type="button"
                                        data-selected={
                                          selectedSuggestion === suggestion
                                        }
                                        className="px-2.5 py-2 border rounded-full data-[selected=true]:bg-muted"
                                      >
                                        👍
                                      </button>
                                      <button
                                        type="button"
                                        className="px-2.5 py-2 border rounded-full data-[selected=true]:bg-muted"
                                      >
                                        👎
                                      </button>

                                      <button
                                        type="button"
                                        className="px-2.5 py-2 border rounded-full data-[selected=true]:bg-muted"
                                      >
                                        🚩
                                      </button>
                                    </div>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

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
              </div>
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
