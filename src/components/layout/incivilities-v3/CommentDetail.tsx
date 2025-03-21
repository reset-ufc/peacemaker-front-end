"use client";

import { memo, useCallback, useMemo, useState } from "react";

import { format, formatDistanceToNow, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import { ChevronRight, ExternalLink, Reply } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Comment, CommentState, Suggestion } from "@/types";

import { SuggestionSelector } from "./SuggestionSelector";

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
  onSuggestionSelect,
  onSuggestionConfirm,
  commentState,
}: CommentDetailProps) {
  const [editedContent, setEditedContent] = useState<string>("");

  // Update edited content when comment state changes
  useState(() => {
    if (commentState?.editedContent) {
      setEditedContent(commentState.editedContent);
    }
  });

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
    } catch (error) {
      return dateString;
    }
  }, []);

  const getFormattedDate = useCallback((dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, "MMM d, yyyy", { locale: enUS });
    } catch (error) {
      return dateString;
    }
  }, []);

  const getFormattedTime = useCallback((dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, "HH:mm", { locale: enUS });
    } catch (error) {
      return "";
    }
  }, []);

  const handleReply = useCallback(() => {
    window.open(comment.comment_html_url, "_blank");
  }, [comment.comment_html_url]);

  const handleUpdateEditedContent = useCallback((content: string) => {
    setEditedContent(content);
  }, []);

  const selectedSuggestion = useMemo(() => {
    if (!commentState?.selectedSuggestionId) return null;
    return (
      comment.suggestions.find(
        s => s._id === commentState.selectedSuggestionId
      ) || null
    );
  }, [comment.suggestions, commentState?.selectedSuggestionId]);

  const toxicityLevel = getToxicityLevel(comment.toxicity_score);

  return (
    <div className="flex h-full flex-col">
      {/* Header with Action Buttons */}
      <div className="border-b p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Comment Details</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="hidden items-center gap-1 md:flex"
              onClick={handleReply}
            >
              <Reply className="h-4 w-4" />
              <span>Reply on GitHub</span>
            </Button>

            {/* Mobile buttons (icons only) */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              title="Reply on GitHub"
              onClick={handleReply}
            >
              <Reply className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge
            variant="outline"
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
          <Badge variant="outline">{comment.classification}</Badge>
          {comment.parent && (
            <Badge variant="outline">{comment.parent.type}</Badge>
          )}
        </div>
      </div>

      {/* Comment Content */}
      <div className="flex flex-1 p-4">
        <div className="flex-1">
          <div className="mb-4 flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <div className="bg-primary text-primary-foreground flex h-full w-full items-center justify-center rounded-full">
                {comment.gh_comment_sender_login.charAt(0).toUpperCase()}
              </div>
            </Avatar>
            <div>
              <div className="font-medium">
                {comment.gh_comment_sender_login}
              </div>
              <div className="text-muted-foreground text-sm">
                {comment.gh_repository_name}
              </div>
            </div>
            <div className="text-muted-foreground ml-auto text-sm">
              {getTimeAgo(comment.created_at)}
            </div>
          </div>

          {/* Original Comment */}
          <div className="mb-4 overflow-x-auto">
            <pre className="font-sans text-base whitespace-pre-wrap">
              {comment.content}
            </pre>

            {/* Show Details Button - More Discrete */}
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground mt-2 flex h-auto items-center gap-1 p-0 text-xs hover:bg-transparent"
              onClick={onToggleDetails}
            >
              <span>{showDetails ? "Hide details" : "Show details"}</span>
              <ChevronRight
                className={`h-3 w-3 transition-transform ${showDetails ? "rotate-180" : ""}`}
              />
            </Button>
          </div>

          {/* Edited Content (if available) */}
          {commentState?.editedContent && (
            <div className="bg-primary/5 border-primary/10 mb-6 rounded-lg border p-3">
              <div className="text-muted-foreground mb-1 text-xs">
                Edited Comment
              </div>
              <pre className="font-sans text-base whitespace-pre-wrap">
                {commentState.editedContent}
              </pre>
            </div>
          )}

          {/* Suggestion Selector */}
          {comment.suggestions.length > 0 && !commentState?.editedContent && (
            <SuggestionSelector
              suggestions={comment.suggestions}
              selectedSuggestion={selectedSuggestion}
              onSelect={onSuggestionSelect}
              onConfirm={onSuggestionConfirm}
              editedContent={editedContent}
              setEditedContent={handleUpdateEditedContent}
            />
          )}
        </div>

        {/* Sidebar with Details */}
        {showDetails && (
          <div className="ml-4 h-full w-64 overflow-y-auto border-l p-4">
            <h3 className="text-muted-foreground mb-4 text-sm font-medium uppercase">
              Details
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="text-muted-foreground mb-1 text-xs">User</h4>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <div className="bg-primary text-primary-foreground flex h-full w-full items-center justify-center rounded-full text-xs">
                      {comment.gh_comment_sender_login.charAt(0).toUpperCase()}
                    </div>
                  </Avatar>
                  <span className="text-sm">
                    {comment.gh_comment_sender_login}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-muted-foreground mb-1 text-xs">
                  Repository
                </h4>
                <div className="text-sm">{comment.gh_repository_name}</div>
                <div className="text-muted-foreground text-xs">
                  {comment.gh_repository_owner}
                </div>
              </div>

              <div>
                <h4 className="text-muted-foreground mb-1 text-xs">Date</h4>
                <div className="text-sm">
                  {getFormattedDate(comment.created_at)}
                </div>
                <div className="text-muted-foreground text-xs">
                  {getFormattedTime(comment.created_at)}
                </div>
              </div>

              <div>
                <h4 className="text-muted-foreground mb-1 text-xs">
                  Toxicity Score
                </h4>
                <Progress
                  value={comment.toxicity_score * 100}
                  className="mb-1 h-2"
                />
                <div className="text-right text-sm">
                  {Math.round(comment.toxicity_score * 100)}%
                </div>
              </div>

              {comment.parent && (
                <>
                  <div>
                    <h4 className="text-muted-foreground mb-1 text-xs">
                      Related {comment.parent.type}
                    </h4>
                    <div className="flex items-center gap-1 text-sm">
                      <span>#{comment.parent.gh_parent_number}</span>
                      <ExternalLink className="h-3 w-3" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-muted-foreground mb-1 text-xs">
                      {comment.parent.type} Title
                    </h4>
                    <div className="text-sm">{comment.parent.title}</div>
                  </div>

                  <div>
                    <h4 className="text-muted-foreground mb-1 text-xs">
                      {comment.parent.type} Status
                    </h4>
                    <div className="text-sm">{comment.parent.is_open}</div>
                  </div>
                </>
              )}

              <div>
                <h4 className="text-muted-foreground mb-1 text-xs">
                  Original Comment
                </h4>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-1 text-sm"
                  onClick={() =>
                    window.open(comment.comment_html_url, "_blank")
                  }
                >
                  <span>View on GitHub</span>
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
