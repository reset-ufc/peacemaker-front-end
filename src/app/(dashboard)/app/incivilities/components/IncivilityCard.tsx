import { formatDistanceToNow } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Comment } from "@/services/comments/action";

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
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">{incivility.repo_full_name}</h1>
          {!incivility.solutioned && (
            <Badge variant="secondary">Unsolved</Badge>
          )}
        </div>
        <p className="">{incivility.content}</p>
        <div className="flex w-full items-center justify-between">
          <Badge className="w-fit">{incivility.classification}</Badge>
          <p className="text-xs">
            {" "}
            {formatDistanceToNow(new Date(incivility.created_at), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </button>
  );
}
