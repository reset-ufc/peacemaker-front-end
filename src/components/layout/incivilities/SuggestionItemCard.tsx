import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { SuggestionItemCardProps } from "@/types"

export function SuggestionItemCard({
  suggestion,
  isSelected,
  isPreviouslySelected,
  isDisabled,
  isEditing,
  editedContent,
  onClick,
  onChange,
}: SuggestionItemCardProps) {
  return (
    <Card
      className={cn(
        "p-2 transition-colors",
        isDisabled && "cursor-not-allowed opacity-50",
        (isSelected || isPreviouslySelected) && "border-primary border-2",
        !isDisabled && !(isSelected || isPreviouslySelected) && "hover:border-muted-foreground/50 cursor-pointer",
        isPreviouslySelected && "bg-primary/5"
      )}
      onClick={onClick}
    >
      <CardContent className="p-2">
        {isEditing && isSelected ? (
          <Textarea
            value={editedContent}
            onChange={onChange}
            onClick={(e) => e.stopPropagation()}
            className="min-h-[100px] w-full outline-none"
          />
        ) : (
          <p className="whitespace-pre-wrap">
            {(isSelected || isPreviouslySelected) ? editedContent : suggestion.content}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
