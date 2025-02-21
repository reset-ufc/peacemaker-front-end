"use client";

import { useState } from "react";

import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

import { SubmitButton } from "@/components/elements/common/SubmitButton";
import { Separator } from "@/components/ui/separator";
import { useNotification } from "@/hooks/use-notification";
import { cn } from "@/lib/utils";

import { MarkdownDisplay } from "./MarkdownDisplay";

interface SuggestionsProps {
  suggestions: {
    corrected_comment: string;
  };
}

export function Suggestions({ suggestions }: SuggestionsProps) {
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { notifySuccess, notifyError } = useNotification();

  async function approveSuggestion(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      notifySuccess("Suggestion approved");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      notifyError("Something went wrong", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-4 flex flex-col gap-4 px-6 py-4">
      <h2 className="text-md font-bold">Suggestions for fixing your comment</h2>

      <Separator orientation="horizontal" />

      <form className="space-y-12" onSubmit={approveSuggestion}>
        {suggestions ? (
          <>
            <div className="group">
              <div className="flex flex-row gap-4">
                <input
                  id="suggestion"
                  type="radio"
                  value={suggestions.corrected_comment}
                  checked={selectedSuggestion === suggestions.corrected_comment}
                  onChange={() =>
                    setSelectedSuggestion(suggestions.corrected_comment)
                  }
                  disabled={isLoading}
                  required
                />

                <label
                  htmlFor="suggestion"
                  className={cn(
                    "text-base",
                    isLoading && "cursor-not-allowed text-muted-foreground",
                  )}
                >
                  <MarkdownDisplay text={suggestions.corrected_comment} />
                </label>
              </div>

              {/* TODO: Leave the element visible when hovering over the text, but without moving the text. */}
              <div className="ms-10 hidden flex-row gap-2 rounded-lg group-hover:visible group-hover:flex">
                <button className="rounded-lg p-1 hover:bg-muted" type="button">
                  <ThumbsUpIcon className="size-5 text-foreground" />
                </button>
                <button className="rounded-lg p-1 hover:bg-muted" type="button">
                  <ThumbsDownIcon className="size-5 text-foreground" />
                </button>
              </div>
            </div>

            <SubmitButton type="submit" isSubmitting={isLoading} size="sm">
              Approve
            </SubmitButton>
          </>
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            No suggestions found
          </div>
        )}
      </form>
    </div>
  );
}
