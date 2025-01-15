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
