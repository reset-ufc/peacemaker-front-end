"use client";

import { useSearchParams } from "next/navigation";

import { ArrowLeft, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onBack?: () => void;
}

export function EmptyState({ onBack }: EmptyStateProps) {
  const searchParams = useSearchParams();
  const hasCommentId = searchParams.has("commentId");

  return (
    <div className="bg-background flex flex-1 flex-col items-center justify-center p-6">
      <div className="flex max-w-md flex-col items-center text-center">
        {hasCommentId && (
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to list
            </Button>
          </div>
        )}

        <div className="bg-muted/30 mb-6 flex h-16 w-16 items-center justify-center rounded-full">
          <MessageSquare className="text-muted-foreground h-8 w-8" />
        </div>

        {hasCommentId ? (
          <>
            <h2 className="mb-2 text-xl font-medium">Comment not found</h2>
            <p className="text-muted-foreground mb-6">
              The comment you're looking for might have been deleted or doesn't
              exist.
            </p>
          </>
        ) : (
          <>
            <h2 className="mb-2 text-xl font-medium">No comment selected</h2>
            <p className="text-muted-foreground mb-6">
              Select a comment from the list to view its details and take
              actions.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
