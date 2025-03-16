"use client";

import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

import { Badge } from "@/components/ui/badge";
import { mockRepositories, mockUsers } from "@/lib/mock-data";
import type { Comment } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CommentListProps {
  comments: Comment[];
  selectedComment: Comment | null;
  onSelectComment: (comment: Comment) => void;
}

const getToxicityColor = (level: string) => {
  switch (level) {
    case "high":
      return "bg-destructive text-muted dark:text-foreground rounded-xl border border-red-500";
    case "medium":
      return "bg-amber-500 text-muted dark:text-foreground rounded-xl border border-amber-500";
    case "low":
      return "bg-sky-500 text-muted dark:text-foreground rounded-xl border border-sky-500";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case "bitter_frustration":
      return "Frustration";
    case "mocking":
      return "Mockery";
    case "irony":
      return "Irony";
    case "insulting":
      return "Insult";
    case "vulgarity":
      return "Vulgarity";
    case "identity_attack":
      return "Identity Attack";
    case "entitlement":
      return "Entitlement";
    case "impatience":
      return "Impatience";
    case "threat":
      return "Threat";
    case "neutral":
      return "Neutral";
    default:
      return category;
  }
};

const getUserName = (userId: string) => {
  const user = mockUsers.find(u => u.gh_id === userId);
  return user ? user.username : userId;
};

const getRepoName = (repoId: string) => {
  const repo = mockRepositories.find(r => r.gh_id === repoId);
  return repo ? repo.gh_url.split("/").slice(-2).join("/") : repoId;
};

export function CommentList({
  comments,
  selectedComment,
  onSelectComment,
}: CommentListProps) {
  return (
    <div className="border-border w-full overflow-y-auto border-r md:w-[26%]">
      <div className="space-y-2 divide-y px-2 pt-4">
        {comments.length === 0 ? (
          <div className="text-muted-foreground flex h-32 items-center justify-center">
            No comments found
          </div>
        ) : (
          comments.map(comment => (
            <div
              key={comment.gh_id}
              onClick={() => onSelectComment(comment)}
              className={cn(
                "hover:bg-muted/50 cursor-pointer rounded-xl border p-3 transition-colors",
                selectedComment?.gh_id === comment.gh_id && "bg-muted/50"
              )}
            >
              <div className="mb-1 flex items-center justify-between">
                <div className="truncate font-medium">
                  {getUserName(comment.gh_comment_sender_id)}
                </div>
                <div className="text-muted-foreground ml-2 text-xs whitespace-nowrap">
                  {formatDistanceToNow(new Date(comment.created_at), {
                    addSuffix: true,
                    locale: enUS,
                  })}
                </div>
              </div>

              <div className="mb-2 flex items-center justify-between">
                <div className="text-muted-foreground truncate text-xs">
                  {getRepoName(comment.gh_repository_id)}
                </div>
              </div>

              <div className="mb-2 flex flex-wrap gap-1">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    getToxicityColor(comment.toxicityLevel || "low")
                  )}
                >
                  {comment.toxicityLevel === "high" && "High"}
                  {comment.toxicityLevel === "medium" && "Medium"}
                  {comment.toxicityLevel === "low" && "Low"}
                </Badge>

                <Badge variant="outline" className="bg-background text-xs">
                  {comment.category && getCategoryLabel(comment.category)}
                </Badge>
              </div>

              <div className="line-clamp-2 text-xs">{comment.content}</div>

              {comment.solutioned && (
                <div className="mt-2">
                  <Badge
                    variant="outline"
                    className="bg-emerald/10 text-success border-emerald/20 text-xs"
                  >
                    Resolved
                  </Badge>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
