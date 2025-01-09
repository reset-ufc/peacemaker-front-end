"use client";

import { Suspense, useState } from "react";
import { Comment } from "@/services/comments/action";
import { IncivilityCart } from "./IncivilityCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { commentsService } from "@/services/comments";

interface IncivilitiesListProps {
  setIncivility: (item: Comment) => void;
}

export function IncivilityList({ setIncivility }: IncivilitiesListProps) {
  const [suggestions, setSuggestions] = useState<Array<string>>([]);
  const { comments: incivilities } = commentsService();

  return (
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
  );
}
