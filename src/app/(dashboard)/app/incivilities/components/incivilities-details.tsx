"use client";

import { formatDistanceToNow } from "date-fns";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Incivility } from "./incivilities";

interface IncivilitiesDetailsProps {
  incivilities: Array<Incivility>;
}

export function IncivilitiesDetails({
  incivilities,
}: IncivilitiesDetailsProps) {
  return (
    <ScrollArea>
      <div className="flex flex-col gap-2 p-4 py-3">
        {incivilities.map((item) => (
          <button
            type="button"
            key={item.id}
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
            {/* <div className="line-clamp-2 text-xs text-muted-foreground">
						{item.text.substring(0, 300)}
            </div> */}
            {/* {item.labels.length ? (
						<div className="flex items-center gap-2">
            {item.labels.map((label) => (
              <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
              {label}
								</Badge>
                ))}
                </div>
                ) : null} */}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

// function getBadgeVariantFromLabel(
// 	label: string
// ): ComponentProps<typeof Badge>["variant"] {
// 	if (["work"].includes(label.toLowerCase())) {
// 		return "default"
// 	}

// 	if (["personal"].includes(label.toLowerCase())) {
// 		return "outline"
// 	}

// 	return "secondary"
// }
