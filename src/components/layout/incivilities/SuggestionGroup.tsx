import { Check, Edit, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { SuggestionGroupComponentProps } from "@/types";

import { SuggestionItemCard } from "./SuggestionItemCard";

export function SuggestionGroup({
  group,
  groupIndex,
  selectedGroup,
  selectedSuggestion,
  editedContent,
  isEditing,
  isAccepted,
  handleSelectSuggestion,
  setEditedContent,
  handleEdit,
  handleConfirmEdit,
  handleCancelEdit,
  handleAccept,
}: SuggestionGroupComponentProps) {
  return (
    <div className="space-y-3">
      {group.suggestions?.map((suggestion, suggestionIndex) => {
        const isSelected =
          selectedGroup === groupIndex &&
          selectedSuggestion === suggestionIndex;
        const isPreviouslySelected =
          group.suggestion_selected_index === suggestionIndex;
        const isDisabled =
          (isAccepted || group.suggestion_selected_index !== null) &&
          !isPreviouslySelected;

        return (
          <div
            key={suggestionIndex}
            onClick={() =>
              !isDisabled && handleSelectSuggestion(groupIndex, suggestionIndex)
            }
          >
            <SuggestionItemCard
              suggestion={suggestion}
              isSelected={isSelected}
              isPreviouslySelected={isPreviouslySelected}
              isDisabled={isDisabled}
              isEditing={isEditing}
              editedContent={editedContent}
              onClick={() =>
                !isDisabled &&
                handleSelectSuggestion(groupIndex, suggestionIndex)
              }
              onChange={e => setEditedContent(e.target.value)}
            />
            {isSelected &&
              !isAccepted &&
              group.suggestion_selected_index === null && (
                <CardFooter className="flex justify-end gap-2 p-3 pt-2">
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
          </div>
        );
      })}
    </div>
  );
}
