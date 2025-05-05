import { memo } from "react";

import { formatDistanceToNow, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { Comment, CommentState } from "@/types";
import { useTranslation } from "react-i18next";
interface CommentListProps {
  comments: Comment[];
  selectedId: string;
  onSelect: (comment: Comment) => void;
  isLoading: boolean;
  commentStates: CommentState[];
}

export const CommentList = memo(function CommentList({
  comments,
  selectedId,
  onSelect,
  isLoading,
  commentStates,
}: CommentListProps) {
  const getToxicityLevel = (score: number) => {
    if (score >= 0.75) return "High";
    if (score >= 0.5) return "Medium";
    if (score >= 0.25) return "Low";
    return "Neutral";
  };

  const getTimeAgo = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return ` ${formatDistanceToNow(date, { locale: enUS })}`;
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className='space-y-4 px-4 py-6'>
        {[1, 2, 3].map(i => (
          <div key={i} className='rounded-xl border p-4'>
            <div className='mb-2 flex justify-between'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-4 w-16' />
            </div>
            <Skeleton className='mb-3 h-3 w-full' />
            <div className='mb-3 flex gap-2'>
              <Skeleton className='h-5 w-16 rounded-full' />
              <Skeleton className='h-5 w-20 rounded-full' />
            </div>
            <Skeleton className='h-10 w-full' />
          </div>
        ))}
      </div>
    );
  }

  const { t } = useTranslation()

  if (comments.length === 0) {
    return (
      <div className='text-muted-foreground px-4 py-6 text-center'>
        {t("No comments found")}
      </div>
    );
  }

  return (
    <div className='space-y-4 px-2 py-6'>
      {comments.map(comment => {
        const toxicityLevel = getToxicityLevel(comment.toxicity_score);
        const hasEdits = commentStates.some(
          state =>
            state.commentId === comment.gh_comment_id && state.editedContent
        );

        return (
          <div
            key={comment.gh_comment_id}
            className={cn(
              "hover:bg-muted/50 cursor-pointer rounded-xl border px-4 py-2",
              selectedId === comment.gh_comment_id
                ? "bg-muted border-muted-foreground/40"
                : ""
            )}
            onClick={() => onSelect(comment)}
          >
            <div className='mb-3 flex justify-between'>
              <div className='font-medium'>
                {comment.gh_comment_sender_login}
              </div>
              <div className='text-muted-foreground text-xs'>
                {getTimeAgo(comment.created_at)}
              </div>
            </div>

            {/* Truncated comment content as title */}
            <div className='mb-3 truncate text-sm'>{comment.content}</div>

            {/* Badges at the bottom */}
            <div className='flex flex-wrap gap-2'>
              <Badge
                variant='outline'
                className={` ${
                  toxicityLevel === "High"
                    ? "border-red-500/20 bg-red-500/10 text-red-500"
                    : toxicityLevel === "Medium"
                      ? "border-amber-500/20 bg-amber-500/10 text-amber-500"
                      : toxicityLevel === "Low"
                        ? "border-blue-500/20 bg-blue-500/10 text-blue-500"
                        : "border-green-500/20 bg-green-500/10 text-green-500"
                } `}
              >
                {toxicityLevel}
              </Badge>
              <Badge variant='outline'>{comment.classification}</Badge>
              {comment.solutioned && (
                <Badge
                  variant='outline'
                  className='border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
                >
                  Resolved
                </Badge>
              )}
              {hasEdits && (
                <Badge
                  variant='outline'
                  className='border-blue-500/20 bg-blue-500/10 text-blue-500'
                >
                  Edited
                </Badge>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
});
