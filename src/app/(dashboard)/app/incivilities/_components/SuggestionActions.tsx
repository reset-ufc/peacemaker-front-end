interface SuggestionActionsProps {
  selectedSuggestion: string;
  suggestion: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SuggestionActions(props: SuggestionActionsProps) {
  return (
    <div className="flex flex-wrap items-center space-x-2">
      <button
        type="button"
        className="rounded-full border px-2.5 py-2 data-[selected=true]:bg-muted"
      >
        👍
      </button>
      <button
        type="button"
        className="rounded-full border px-2.5 py-2 data-[selected=true]:bg-muted"
      >
        👎
      </button>

      <button
        type="button"
        className="rounded-full border px-2.5 py-2 data-[selected=true]:bg-muted"
      >
        🚩
      </button>
    </div>
  );
}
