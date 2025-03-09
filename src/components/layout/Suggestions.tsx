"use client";

import { useEffect, useState } from "react";

import { Check, Edit, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// Interface da API
interface Suggestions {
  gh_comment_id: string; // id do comentário no GitHub
  // sugestões do comentário
  suggestions: Array<{
    content: string; // solução sugerida
  }>;
  is_edited: boolean; // se o comentário foi editado
  selected_suggestion_index: number | null; // índice da sugestão selecionada
}

export function SuggestionList({ suggestions }: { suggestions: Suggestions }) {
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(
    null
  );
  const [editedContent, setEditedContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  // Initialize with previously selected suggestion if any
  useEffect(() => {
    if (suggestions.selected_suggestion_index !== null) {
      setSelectedSuggestion(suggestions.selected_suggestion_index);
      setIsAccepted(true);
      if (
        suggestions.selected_suggestion_index >= 0 &&
        suggestions.selected_suggestion_index < suggestions.suggestions.length
      ) {
        setEditedContent(
          suggestions.suggestions[suggestions.selected_suggestion_index].content
        );
      }
    }
  }, [suggestions.selected_suggestion_index, suggestions.suggestions]);

  // Select a suggestion
  const handleSelectSuggestion = (index: number) => {
    if (isAccepted || suggestions.selected_suggestion_index !== null) return;

    if (selectedSuggestion === index) {
      setSelectedSuggestion(null);
    } else {
      setSelectedSuggestion(index);
      setEditedContent(suggestions.suggestions[index].content);
      setIsEditing(false);
    }
  };

  // Activate edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Confirm edit
  const handleConfirmEdit = () => {
    setIsEditing(false);
    toast.info("Edit confirmed", {
      description: "You can now accept the edited suggestion.",
    });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(suggestions.suggestions[selectedSuggestion!].content);
  };

  // Accept suggestion
  const handleAccept = () => {
    // Here you would implement the logic to send the suggestion to the backend
    console.log("Suggestion accepted:", editedContent);

    setIsAccepted(true);
    toast.success("Suggestion accepted", {
      description: "The suggestion has been successfully applied.",
    });
  };

  return (
    <div className="w-full">
      <h2 className="mb-2 text-xl font-semibold">Correction Suggestions</h2>
      <Separator className="mb-4" />

      <div className="space-y-3 px-2 pb-10">
        {suggestions.suggestions.map((suggestion, index) => {
          const isSelected = selectedSuggestion === index;
          const isPreviouslySelected =
            suggestions.selected_suggestion_index === index;
          const isDisabled =
            (isAccepted || suggestions.selected_suggestion_index !== null) &&
            !isPreviouslySelected;

          return (
            <Card
              key={index}
              className={cn(
                "p-2 transition-colors",
                isDisabled && "cursor-not-allowed opacity-50",
                (isSelected || isPreviouslySelected) &&
                  "border-primary border-2",
                !isDisabled &&
                  !isSelected &&
                  !isPreviouslySelected &&
                  "hover:border-muted-foreground/50 cursor-pointer"
              )}
              onClick={() => !isDisabled && handleSelectSuggestion(index)}
            >
              <CardContent className="p-2">
                {isEditing && isSelected ? (
                  <Textarea
                    value={editedContent}
                    onChange={e => setEditedContent(e.target.value)}
                    onClick={e => e.stopPropagation()}
                    className="min-h-[100px] w-full outline-none"
                  />
                ) : (
                  <p className="whitespace-pre-wrap">
                    {(isSelected || isPreviouslySelected) && !isEditing
                      ? editedContent
                      : suggestion.content}
                  </p>
                )}
              </CardContent>

              {isSelected &&
                !isAccepted &&
                suggestions.selected_suggestion_index === null && (
                  <CardFooter className="flex justify-end gap-2 p-3 pt-0">
                    {isEditing ? (
                      <>
                        <Button
                          variant="destructive"
                          onClick={e => {
                            e.stopPropagation();
                            handleCancelEdit();
                          }}
                        >
                          <X className="size-4" />
                          Cancel edit
                        </Button>
                        <Button
                          variant="outline"
                          onClick={e => {
                            e.stopPropagation();
                            handleConfirmEdit();
                          }}
                        >
                          <Check className="size-4" />
                          Confirm edit
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          onClick={e => {
                            e.stopPropagation();
                            handleEdit();
                          }}
                        >
                          <Edit className="size-4" />
                          Edit suggestion
                        </Button>
                        <Button
                          variant="outline"
                          onClick={e => {
                            e.stopPropagation();
                            handleAccept();
                          }}
                        >
                          <Check className="size-4" />
                          Accept suggestion
                        </Button>
                      </>
                    )}
                  </CardFooter>
                )}
            </Card>
          );
        })}
        {suggestions.suggestions.length === 0 && (
          <p className="text-muted-foreground py-4 text-center">
            No suggestions available for this comment.
          </p>
        )}
      </div>
    </div>
  );
}
