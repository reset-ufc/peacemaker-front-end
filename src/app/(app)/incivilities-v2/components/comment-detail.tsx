"use client";

import { format, formatDistanceToNow } from "date-fns";
import {
  AlertTriangle,
  Archive,
  ArrowLeft,
  CheckCircle,
  ExternalLink,
  Flag,
  Forward,
  Link,
  MoreHorizontal,
  Reply,
  Trash2,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { mockParents, mockRepositories, mockUsers } from "@/lib/mock-data";
import type { Comment } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CommentDetailProps {
  comment: Comment;
  onBack: () => void;
  onMarkAsResolved: (id: string) => void;
}

export function CommentDetail({
  comment,
  onBack,
  onMarkAsResolved,
}: CommentDetailProps) {
  const getToxicityColor = (level: string) => {
    switch (level) {
      case "high":
        return "text-destructive";
      case "medium":
        return "text-warning";
      case "low":
        return "text-info";
      default:
        return "text-muted-foreground";
    }
  };

  const getToxicityLabel = (level: string) => {
    switch (level) {
      case "high":
        return "High Toxicity";
      case "medium":
        return "Medium Toxicity";
      case "low":
        return "Low Toxicity";
      default:
        return "Unknown";
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

  const user = mockUsers.find(u => u.gh_id === comment.gh_comment_sender_id);
  const repository = mockRepositories.find(
    r => r.gh_id === comment.gh_repository_id
  );
  const parent = mockParents.find(p => p.gh_comment_id === comment.gh_id);

  return (
    <div className="bg-background flex flex-1 flex-col overflow-y-auto">
      {/* Header with action buttons */}
      <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border sticky top-0 z-10 border-b backdrop-blur">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="md:hidden"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="hidden text-lg font-medium md:block">
              Comment Details
            </h2>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onMarkAsResolved(comment._id)}
                  >
                    <CheckCircle
                      className={cn(
                        "h-4 w-4",
                        comment.solutioned && "text-success"
                      )}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {comment.solutioned
                    ? "Mark as unresolved"
                    : "Mark as resolved"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const url = new URL(window.location.href);
                      url.searchParams.set("commentId", comment._id);
                      navigator.clipboard.writeText(url.toString());
                    }}
                  >
                    <Link className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy link to comment</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Archive className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Archive</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Reply className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Reply</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Forward className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Forward</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Flag className="mr-2 h-4 w-4" />
                  Report
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Block user
                </DropdownMenuItem>
                {comment.comment_html_url && (
                  <DropdownMenuItem asChild>
                    <a
                      href={comment.comment_html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View on GitHub
                    </a>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Status badges */}
        <div className="flex flex-wrap items-center gap-2 px-4 pb-2">
          <Badge
            variant="outline"
            className={cn(
              "text-xs",
              getToxicityColor(comment.toxicityLevel || "low")
            )}
          >
            {comment.toxicityLevel && getToxicityLabel(comment.toxicityLevel)}
          </Badge>

          <Badge variant="outline" className="text-xs">
            {comment.category && getCategoryLabel(comment.category)}
          </Badge>

          {comment.solutioned && (
            <Badge
              variant="outline"
              className="bg-success/10 text-success border-success/20 text-xs"
            >
              Resolved
            </Badge>
          )}

          {parent && (
            <Badge variant="outline" className="text-xs">
              {parent.type === "issue" ? "Issue" : "Pull Request"}
            </Badge>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Comment header with user info */}
          <div className="mb-4 flex items-start gap-3">
            <Avatar className="h-10 w-10 border">
              {user?.avatar_url ? (
                <AvatarImage src={user.avatar_url} alt={user.username} />
              ) : (
                <AvatarFallback>
                  {user?.username?.charAt(0) || "?"}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">
                    {user?.username || comment.gh_comment_sender_id}
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    {repository
                      ? repository.gh_url.split("/").slice(-2).join("/")
                      : comment.gh_repository_id}
                  </p>
                </div>
                <div className="text-muted-foreground text-xs">
                  {formatDistanceToNow(new Date(comment.created_at), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Comment content */}
          <div className="bg-muted/50 mb-6 rounded-lg p-4">
            <p className="whitespace-pre-line">{comment.content}</p>
          </div>

          {/* Timeline  */}

          {/* {comment.history && comment.history.length > 0 && (
            <div className="mt-6">
              <h4 className="text-muted-foreground mb-3 text-sm font-medium">
                Activity Timeline
              </h4>
              <div className="space-y-0">
                {comment.history.map((item, index) => (
                  <div key={index} className="relative pb-4 pl-6">
                    {index < comment.history.length - 1 && (
                      <div className="bg-border absolute top-[18px] bottom-0 left-[9px] w-[2px]" />
                    )}

                    <div className="border-border bg-background absolute top-1 left-0 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2">
                      <Clock className="text-muted-foreground h-3 w-3" />
                    </div>

                    <div className="text-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.action}</span>
                        <span className="text-muted-foreground text-xs">
                          {formatDistanceToNow(new Date(item.date), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                      {item.note && (
                        <p className="text-muted-foreground mt-1 text-xs">
                          {item.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </div>

        {/* Metadata sidebar */}
        <div className="border-border bg-muted/10 overflow-y-auto p-3 md:w-64 md:border-l">
          <h4 className="text-muted-foreground mb-3 text-xs font-medium tracking-wider uppercase">
            Details
          </h4>

          <div className="space-y-4">
            <div>
              <h5 className="text-muted-foreground mb-1 text-xs">User</h5>
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                  {user?.avatar_url ? (
                    <AvatarImage src={user.avatar_url} alt={user.username} />
                  ) : (
                    <AvatarFallback className="text-[10px]">
                      {user?.username?.charAt(0) || "?"}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span className="truncate text-sm">
                  {user?.username || comment.gh_comment_sender_id}
                </span>
              </div>
            </div>

            <div>
              <h5 className="text-muted-foreground mb-1 text-xs">Repository</h5>
              <p className="truncate text-sm">
                {repository
                  ? repository.gh_url.split("/").slice(-2).join("/")
                  : comment.gh_repository_id}
              </p>
            </div>

            <div>
              <h5 className="text-muted-foreground mb-1 text-xs">Date</h5>
              <p className="text-sm">
                {format(new Date(comment.created_at), "MMM d, yyyy")}
              </p>
              <p className="text-muted-foreground text-xs">
                {format(new Date(comment.created_at), "h:mm a")}
              </p>
            </div>

            <div>
              <h5 className="text-muted-foreground mb-1 text-xs">
                Toxicity Score
              </h5>
              <div className="flex items-center gap-2">
                <div className="bg-muted h-2 flex-1 overflow-hidden rounded-full">
                  <div
                    className={cn(
                      "h-full",
                      comment.toxicity_score >= 0.7
                        ? "bg-destructive"
                        : comment.toxicity_score >= 0.4
                          ? "bg-warning"
                          : "bg-info"
                    )}
                    style={{ width: `${comment.toxicity_score * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium">
                  {(comment.toxicity_score * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            {parent && (
              <div>
                <h5 className="text-muted-foreground mb-1 text-xs">
                  Related {parent.type}
                </h5>
                <a
                  href={parent.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary flex items-center gap-1 text-sm hover:underline"
                >
                  {parent.title}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}

            {comment.comment_html_url && (
              <div>
                <h5 className="text-muted-foreground mb-1 text-xs">
                  Original Comment
                </h5>
                <a
                  href={comment.comment_html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary flex items-center gap-1 text-sm hover:underline"
                >
                  View on GitHub
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
