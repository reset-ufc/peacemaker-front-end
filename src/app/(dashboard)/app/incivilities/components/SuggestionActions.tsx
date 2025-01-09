interface SuggestionActionsProps {
  selectedSuggestion: string;
  suggestion: string;
}

export function SuggestionActions({
  selectedSuggestion,
  suggestion,
}: SuggestionActionsProps) {
  return (
    <div className="flex flex-wrap items-center space-x-2">
      <button
        type="button"
        data-selected={selectedSuggestion === suggestion}
        className="px-2.5 py-2 border rounded-full data-[selected=true]:bg-muted"
      >
        👍
      </button>
      <button
        type="button"
        className="px-2.5 py-2 border rounded-full data-[selected=true]:bg-muted"
      >
        👎
      </button>

      <button
        type="button"
        className="px-2.5 py-2 border rounded-full data-[selected=true]:bg-muted"
      >
        🚩
      </button>
    </div>
  );
}
