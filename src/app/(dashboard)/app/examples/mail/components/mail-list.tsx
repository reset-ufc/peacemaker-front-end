import { ComponentProps } from "react";

import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import { Mail } from "../data";
import { useMailStore } from "../use-mail";

interface MailListProps {
  items: Mail[];
}

export function MailList({ items }: MailListProps) {
  const { selected: mail, setSelected: setMail } = useMailStore();

  return (
    <div className="min-w-52 border-r">
      <ScrollArea className="h-full">
        <div className="flex flex-col gap-2 p-4 pt-0">
          {items.map(item => (
            <button
              key={item.id}
              className={cn(
                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                mail === item.id && "bg-muted",
              )}
              onClick={() => setMail(item.id === mail ? null : item.id)}
            >
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{item.name}</div>
                    {!item.read && (
                      <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "ml-auto text-xs",
                      mail === item.id
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {formatDistanceToNow(new Date(item.date), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
                <div className="text-xs font-medium">{item.subject}</div>
              </div>
              <div className="line-clamp-2 text-xs text-muted-foreground">
                {item.text.substring(0, 300)}
              </div>
              {item.labels.length ? (
                <div className="flex items-center gap-2">
                  {item.labels.map(label => (
                    <Badge
                      key={label}
                      variant={getBadgeVariantFromLabel(label)}
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function getBadgeVariantFromLabel(
  label: string,
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
}
