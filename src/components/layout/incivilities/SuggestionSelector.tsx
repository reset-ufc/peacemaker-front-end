import { memo, useCallback, useState } from "react";

import { Check, Edit, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Suggestion } from "@/types";

interface SuggestionSelectorProps {
  suggestions: Suggestion[];
  selectedSuggestion: Suggestion | null;
  onSelect: (suggestion: Suggestion | null) => void;
  onConfirm: (editedContent: string) => void;
  editedContent: string;
  setEditedContent: (content: string) => void;
}

export const SuggestionSelector = memo(function SuggestionSelector({
  suggestions,
  selectedSuggestion,
  onSelect,
  onConfirm,
  editedContent,
  setEditedContent,
}: SuggestionSelectorProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSelectSuggestion = useCallback(
    (suggestion: Suggestion) => {
      onSelect(suggestion);
      setEditedContent(suggestion.content);
    },
    [onSelect, setEditedContent]
  );

  const handleStartEditing = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCancelEditing = useCallback(() => {
    setIsEditing(false);
    if (selectedSuggestion) {
      setEditedContent(selectedSuggestion.content);
    }
  }, [selectedSuggestion, setEditedContent]);

  const handleConfirm = useCallback(() => {
    onConfirm(editedContent);
    setIsEditing(false);
  }, [editedContent, onConfirm]);

  const handleCancelSelection = useCallback(() => {
    onSelect(null);
  }, [onSelect]);

  return (
    <div className='mb-6'>
      <h3 className='mb-3 text-sm font-medium'>Suggested Alternatives</h3>

      {!selectedSuggestion ? (
        <div className='space-y-3'>
          {suggestions.map(suggestion => (
            <div
              key={suggestion._id}
              className='bg-muted/50 border-border hover:bg-muted cursor-pointer rounded-lg border p-3'
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              <p className='text-sm'>{suggestion.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className='space-y-3'>
          {isEditing ? (
            <div className='space-y-3'>
              <Textarea
                value={editedContent}
                onChange={e => setEditedContent(e.target.value)}
                className='min-h-[100px]'
              />
              <div className='flex gap-2'>
                <Button variant='default' size='sm' onClick={handleConfirm}>
                  <Check className='mr-1 h-4 w-4' />
                  Confirm
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={handleCancelEditing}
                >
                  <X className='mr-1 h-4 w-4' />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className='space-y-3'>
              <div className='bg-primary/10 border-primary/20 rounded-lg border p-3'>
                <p className='text-sm'>{selectedSuggestion.content}</p>
              </div>
              <div className='flex gap-2'>
                <Button variant='default' size='sm' onClick={handleConfirm}>
                  <Check className='mr-1 h-4 w-4' />
                  Use This Suggestion
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={handleStartEditing}
                >
                  <Edit className='mr-1 h-4 w-4' />
                  Edit
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={handleCancelSelection}
                >
                  <X className='mr-1 h-4 w-4' />
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});
