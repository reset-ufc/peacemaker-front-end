"use client";

import { formatDistanceToNow } from "date-fns";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { useState } from "react";
import type { Incivility } from "./incivilities";

interface IncivilitiesListProps {
  incivilities: Array<Incivility>;
}

export function IncivilitiesList({ incivilities }: IncivilitiesListProps) {
  const [selectedIncivility, setSelectedIncivility] =
    useState<Incivility | null>(null);
  const [incivilityId, setIncivilityId] = useQueryState("incivily_id", {
    defaultValue: "",
  });

  const handleSelect = (item: Incivility) => {
    setSelectedIncivility(item);
    setIncivilityId(item.id);
  };

  return (
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
  );
}
