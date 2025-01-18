"use client";

import { useState } from "react";

import { SubmitButton } from "@/components/elements/common/SubmitButton";
import { Separator } from "@/components/ui/separator";
import { useNotification } from "@/hooks/use-notification";
import { cn } from "@/lib/utils";

import { SuggestionActions } from "./SuggestionActions";

interface SuggestionTableProps {
  suggestions: {
    corrected_comment: string;
  };
}

export function SuggestionTable({ suggestions }: SuggestionTableProps) {
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
    <div className="mt-4 flex flex-col gap-4 rounded-md border px-6 py-4">
      <h2 className="text-md font-bold">Suggestions for fixing your comment</h2>

      <Separator orientation="horizontal" />

      <form className="space-y-8" onSubmit={approveSuggestion}>
        <div className="flex flex-row items-center justify-between">
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
              {suggestions.corrected_comment}
            </label>
          </div>

          <SuggestionActions
            selectedSuggestion={selectedSuggestion}
            suggestion={suggestions.corrected_comment}
          />
        </div>

        <SubmitButton type="submit" isSubmitting={isLoading}>
          Approve
        </SubmitButton>
      </form>
    </div>
  );
}
