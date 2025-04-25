import { memo, useCallback } from "react";

import { format, formatDistanceToNow, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import { AlertTriangle, ChevronRight, Clock, ExternalLink, FileText, Github, Reply, User } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { Comment, CommentState, Suggestion } from "@/types";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";
import { SuggestionList } from "./SuggestionList";
interface CommentDetailProps {
  comment: Comment;
  showDetails: boolean;
  onToggleDetails: () => void;
  onSuggestionSelect: (suggestion: Suggestion | null) => void;
  onSuggestionConfirm: (editedContent: string) => void;
  commentState: CommentState | null;
}

export const CommentDetail = memo(function CommentDetail({
  comment,
  showDetails,
  onToggleDetails,
  commentState,
}: CommentDetailProps) {
  const getToxicityLevel = useCallback((score: number) => {
    if (score >= 0.75) return "High";
    if (score >= 0.5) return "Medium";
    if (score >= 0.25) return "Low";
    return "Neutral";
  }, []);

  const getTimeAgo = useCallback((dateString: string) => {
    try {
      const date = parseISO(dateString);
      return formatDistanceToNow(date, { locale: enUS });
    } catch {
      return dateString;
    }
  }, []);

  const getFormattedDate = useCallback((dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, "MMM d, yyyy", { locale: enUS });
    } catch {
      return dateString;
    }
  }, []);

  const getToxicityColor = (score: number) => {
    if (score < 0.3) return "bg-green-500"
    if (score < 0.7) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getFormattedTime = useCallback((dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, "HH:mm", { locale: enUS });
    } catch {
      return "";
    }
  }, []);

  const toxicityLevel = getToxicityLevel(comment.toxicity_score);

  const { t } = useTranslation()

  return (
    <div className='flex h-full flex-col'>
      {/* Header with Action Buttons */}
      <div className='border-b p-4'>
        <div className='mb-2 flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>{t("Comment Details")}</h2>
          <div className='flex items-center gap-2'>
            <a
              className={cn(
                "hidden items-center gap-1 md:flex",
                buttonVariants({ variant: "outline", size: "sm" })
              )}
              title='Reply on GitHub'
              href={comment.comment_html_url}
              target='_blank'
              rel='noreferrer'
            >
              <Reply className='h-4 w-4' />
              <span>{t("Reply on GitHub")}</span>
            </a>

            {/* Mobile buttons (icons only) */}
            <a
              className={cn(
                "md:hidden",
                buttonVariants({ variant: "ghost", size: "icon" })
              )}
              title='Reply on GitHub'
              href={comment.comment_html_url}
              target='_blank'
              rel='noreferrer'
            >
              <Reply className='h-4 w-4' />
            </a>
          </div>
        </div>
        <div className='flex gap-2'>
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
            {toxicityLevel} Toxicity
          </Badge>
          <Badge variant='outline'>{comment.classification}</Badge>
          {(comment.parent || comment.parentType) && (
            <Badge variant='outline'>
              {comment.parentType ? comment.parentType : String(comment.parent?.type)}
            </Badge>
          )}
          {comment.editAttempts >= 1 && (
            <Badge variant='outline' className='border-red-500/20 bg-red-500/10 text-red-500'>
              ⚠️ Needs Attention
            </Badge>
          )}
        </div>
      </div>

      {/* Comment Content */}
      <div className='flex flex-1 p-4'>
        <div className='flex flex-1 flex-col justify-between'>
          <div className='flex flex-col gap-2'>
            <div className='mb-4 flex items-center gap-3'>
              <Avatar className='h-10 w-10'>
                <div className='bg-primary text-primary-foreground flex h-full w-full items-center justify-center rounded-full'>
                  {comment.gh_comment_sender_login.charAt(0).toUpperCase()}
                </div>
              </Avatar>
              <div>
                <div className='font-medium'>
                  {comment.gh_comment_sender_login}
                </div>
                <div className='text-muted-foreground text-sm'>
                  {comment.gh_repository_name}
                </div>
              </div>
              <div className='text-muted-foreground ml-auto text-sm'>
                {getTimeAgo(comment.created_at)}
              </div>
            </div>

            {/* Original Comment */}
            <div className='mb-4 overflow-x-auto'>
                <div className="flex flex-col gap-2 ml-2">
                  <span className="text-muted-foreground">{t("Original Comment")}:</span>
                  <pre className='font-sans text-base whitespace-pre-wrap'>
                    {comment.content}
                  </pre>
                </div>

              {/* Show Details Button - More Discrete */}
              <Button
                variant='ghost'
                size='sm'
                className='cursor-pointer mt-4 rounded-lg'
                onClick={onToggleDetails}
              >
                <span>{showDetails ? t("Hide details") : t("Show details")}</span>
                <ChevronRight
                  className={`h-3 w-3 transition-transform ${showDetails ? "rotate-180" : ""}`}
                />
              </Button>
            </div>
            {/* Sidebar with Details */}
                {showDetails && (
                  <div className="p-4">
                    <div className="grid gap-6 md:grid-cols-2">
                      {/* User Information */}
                      <div className="space-y-4">
                        <div className="rounded-lg border bg-card p-3 shadow-sm">
                          <h4 className="mb-2 flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                            <User className="h-3.5 w-3.5" />
                            {t("User")}
                          </h4>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 ring-2 ring-primary/10">
                              <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                                {comment.gh_comment_sender_login.charAt(0).toUpperCase()}
                              </div>
                            </Avatar>
                            <div>
                              <div className="font-medium">{comment.gh_comment_sender_login}</div>
                              <div className="text-xs text-muted-foreground">GitHub User</div>
                            </div>
                          </div>
                        </div>

                        {/* Repository Information */}
                        <div className="rounded-lg border bg-card p-3 shadow-sm">
                          <h4 className="mb-2 flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                            <Github className="h-3.5 w-3.5" />
                            {t("Repository")}
                          </h4>
                          <div className="space-y-1">
                            <div className="font-medium">{comment.gh_repository_name}</div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <span>{comment.gh_repository_owner}</span>
                            </div>
                          </div>
                        </div>

                        {/* Date Information */}
                        <div className="rounded-lg border bg-card p-3 shadow-sm">
                          <h4 className="mb-2 flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            {t("DATE")}
                          </h4>
                          <div className="space-y-1">
                            <div className="font-medium">{getFormattedDate(comment.created_at)}</div>
                            <div className="text-xs text-muted-foreground">{getFormattedTime(comment.created_at)}</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {/* Toxicity Score */}
                        <div className="rounded-lg border bg-card p-3 shadow-sm">
                          <h4 className="mb-2 flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                            <AlertTriangle className="h-3.5 w-3.5" />
                            {t("Toxicity Score")}
                          </h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Badge
                                variant={
                                  comment.toxicity_score > 0.7
                                    ? "destructive"
                                    : comment.toxicity_score > 0.3
                                      ? "secondary"
                                      : "default"
                                }
                              >
                                {getToxicityLevel(comment.toxicity_score)}
                              </Badge>
                              <span className="text-sm font-medium">{Math.round(comment.toxicity_score * 100)}%</span>
                            </div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Progress
                                     value={comment.toxicity_score * 100}
                                     className="h-2"
                                     indicatorClassName={cn("transition-all", getToxicityColor(comment.toxicity_score))}
                                    />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Toxicity: {Math.round(comment.toxicity_score * 100)}%</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>

                        {/* Parent Information (if exists) */}
                        {comment.parent && (
                          <div className="rounded-lg border bg-card p-3 shadow-sm">
                            <h4 className="mb-2 flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                              <FileText className="h-3.5 w-3.5" />
                              {t("Related")} {comment.parent.type}
                            </h4>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-medium">#{comment.parent.gh_parent_number}</span>
                                  <Badge variant={comment.parent.is_open === "open" ? "outline" : "secondary"}>
                                    {comment.parent.is_open}
                                  </Badge>
                                </div>
                              </div>
                              <div className="text-sm line-clamp-2">{comment.parent.title}</div>
                            </div>
                          </div>
                        )}

                        {/* Original Comment Link */}
                        <div className="rounded-lg border bg-card p-3 shadow-sm">
                          <h4 className="mb-2 flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                            <Github className="h-3.5 w-3.5" />
                            {t("Original Comment")}
                          </h4>
                          <Button variant="outline" size="sm" className="w-full justify-between" asChild>
                            <a href={comment.comment_html_url} target="_blank" rel="noreferrer">
                              <span>{t("View on GitHub")}</span>
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

            {/* Edited Content (if available) */}
            {commentState?.editedContent && (
              <div className='bg-primary/5 border-primary/10 mb-6 rounded-lg border p-3'>
                <div className='text-muted-foreground mb-1 text-xs'>
                  {t("Edited Comment")}
                </div>
                <pre className='font-sans text-base whitespace-pre-wrap'>
                  {commentState.editedContent}
                </pre>
              </div>
            )}
          </div>

          {/* Suggestion Selector */}
          {comment.suggestions.length > 0 && !commentState?.editedContent && (
            <SuggestionList
              suggestions={comment.suggestions}
              comment={comment}
              suggestionAcceptedId={comment.suggestion_id}
            />
          )}
        </div>
      </div>
    </div>
  );
});
