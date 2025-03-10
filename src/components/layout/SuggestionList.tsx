"use client";

import { useEffect, useState } from "react";

import { Check, Edit, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { FeedbackSuggestion } from "./FeedbackSuggestion";

interface SuggestionItem {
  content: string;
}

interface SuggestionGroup {
  suggestion_selected_index: number | null;
  gh_comment_id: string;
  suggestions: SuggestionItem[];
  is_edited: boolean;
  created_at: string;
}

export interface SuggestionResponse {
  suggestions: SuggestionGroup[];
}

export function SuggestionList({ suggestions }: SuggestionResponse) {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(
    null
  );
  const [editedContent, setEditedContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Initialize with previously selected suggestion if any
  useEffect(() => {
    if (suggestions.length > 0) {
      const group = suggestions[0];

      // If there's a previously selected suggestion
      if (group.suggestion_selected_index !== null) {
        setSelectedGroup(0); // We're assuming there's only one group for now
        setSelectedSuggestion(group.suggestion_selected_index);
        setEditedContent(
          group.suggestions[group.suggestion_selected_index].content
        );
        setIsAccepted(true);
        setShowFeedback(true);
      }
    }
  }, [suggestions]);

  // Select a suggestion
  const handleSelectSuggestion = (
    groupIndex: number,
    suggestionIndex: number
  ) => {
    const group = suggestions[groupIndex];

    // If there's already a selected suggestion in this group, don't allow new selection
    if (isAccepted || group.suggestion_selected_index !== null) return;

    if (
      selectedGroup === groupIndex &&
      selectedSuggestion === suggestionIndex
    ) {
      setSelectedGroup(null);
      setSelectedSuggestion(null);
    } else {
      setSelectedGroup(groupIndex);
      setSelectedSuggestion(suggestionIndex);
      setEditedContent(group.suggestions[suggestionIndex].content);
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
    if (selectedGroup !== null && selectedSuggestion !== null) {
      setEditedContent(
        suggestions[selectedGroup].suggestions[selectedSuggestion].content
      );
    }
  };

  // Accept suggestion
  const handleAccept = () => {
    // Here you would implement the logic to send the suggestion to the backend
    console.log("Suggestion accepted:", editedContent);

    setIsAccepted(true);
    setShowFeedback(true);
    toast.success("Suggestion accepted", {
      description: "The suggestion has been successfully applied.",
    });
  };

  return (
    <div className="mb-10 w-full">
      <h2 className="mb-2 text-xl font-semibold">Correction Suggestions</h2>
      <Separator className="mb-4" />

      <div className="space-y-6">
        {/* Feedback Component */}
        {showFeedback && <FeedbackSuggestion />}

        <div className="space-y-3 px-2">
          {suggestions.map((suggestionGroup, groupIndex) => (
            <div key={groupIndex} className="space-y-3">
              {suggestionGroup.suggestions.map(
                (suggestion, suggestionIndex) => {
                  const isSelected =
                    selectedGroup === groupIndex &&
                    selectedSuggestion === suggestionIndex;
                  const isPreviouslySelected =
                    suggestionGroup.suggestion_selected_index ===
                    suggestionIndex;
                  const isDisabled =
                    (isAccepted ||
                      suggestionGroup.suggestion_selected_index !== null) &&
                    !isPreviouslySelected;
                  const isActive = isSelected || isPreviouslySelected;

                  return (
                    <Card
                      key={suggestionIndex}
                      className={cn(
                        "p-2 transition-colors",
                        isDisabled && "cursor-not-allowed opacity-50",
                        isActive && "border-primary border-2",
                        !isDisabled &&
                          !isActive &&
                          "hover:border-muted-foreground/50 cursor-pointer",
                        isPreviouslySelected && "bg-primary/5"
                      )}
                      onClick={() =>
                        !isDisabled &&
                        handleSelectSuggestion(groupIndex, suggestionIndex)
                      }
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
                            {isActive && !isEditing
                              ? editedContent
                              : suggestion.content}
                          </p>
                        )}
                      </CardContent>

                      {isSelected &&
                        !isAccepted &&
                        suggestionGroup.suggestion_selected_index === null && (
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
                }
              )}
            </div>
          ))}

          {suggestions.length === 0 && (
            <p className="text-muted-foreground py-4 text-center">
              No suggestions available for this comment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
