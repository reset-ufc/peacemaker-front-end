"use client";

import { useState } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SuggestionsProps {
  suggestions: Array<string> | null | undefined;
}

export function Suggestions({ suggestions }: SuggestionsProps) {
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function approveSuggestion(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      // capture the value of fields of the form
      const formData = new FormData(e.target as HTMLFormElement);
      const suggestion = formData.get("suggestion");
      console.log(suggestion);

      toast.success("Suggestion approved");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Something went wrong", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-4 flex flex-col gap-4 px-6 py-4">
      <h2 className="text-md font-bold">Suggestions for fixing your comment</h2>
      <span className="fill-foreground w-full border-b"></span>

      <form className="space-y-4" onSubmit={approveSuggestion}>
        {suggestions ? (
          <>
            <div className="space-y-4">
              <div className="group flex flex-col gap-2">
                {suggestions.map((suggestion, index) => (
                  <div className="flex flex-row gap-4">
                    <input
                      id="suggestion"
                      type="radio"
                      value={selectedSuggestion}
                      checked={selectedSuggestion === suggestion}
                      onChange={() => setSelectedSuggestion(suggestion)}
                      disabled={isLoading}
                      required
                    />

                    <label
                      htmlFor="suggestion"
                      className={cn(
                        "text-sm",
                        isLoading && "text-muted-foreground cursor-not-allowed"
                      )}
                    >
                      {suggestion}
                    </label>
                  </div>
                ))}
              </div>

              <textarea
                name=""
                id=""
                className="w-full border"
                value={selectedSuggestion}
                onChange={e => setSelectedSuggestion(e.target.value)}
              ></textarea>
            </div>

            <Button type="submit" size="sm" disabled={isLoading}>
              Approve
            </Button>
          </>
        ) : (
          <div className="text-muted-foreground p-8 text-center">
            No suggestions found
          </div>
        )}
      </form>
    </div>
  );
}
