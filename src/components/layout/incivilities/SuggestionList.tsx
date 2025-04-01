import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/lib/api"
import type { Suggestion } from "@/types"
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group"
import { useMutation } from "@tanstack/react-query"
import { ThumbsDown, ThumbsUp } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { SuggestionGroup } from "./SuggestionGroup"

export function SuggestionList({ suggestions }: { suggestions: Suggestion[] | any[] }) {
  const groups = useMemo(() => {
    return suggestions.length > 0 && suggestions[0].suggestions === undefined
      ? [{
          suggestion_selected_index: null,
          gh_comment_id: suggestions[0].gh_comment_id || "",
          suggestions: suggestions,
          is_edited: false,
          created_at: suggestions[0].created_at || "",
        }]
      : suggestions
  }, [suggestions])

  const [selectedGroup, setSelectedGroup] = useState<number | null>(null)
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null)
  const [editedContent, setEditedContent] = useState<string>("")
  const [isEditing, setIsEditing] = useState(false)
  const [isAccepted, setIsAccepted] = useState(false)

  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackType, setFeedbackType] = useState<"useful" | "not-useful" | null>(null)
  const [feedbackReason, setFeedbackReason] = useState<string>("")
  const [feedbackComment, setFeedbackComment] = useState<string>("")

  const acceptSuggestionMutation = useMutation({
    mutationFn: async ({
      commentId,
      suggestionId,
      content,
      isEdited = false,
    }: {
      commentId: string;
      suggestionId: string;
      content: string;
      isEdited?: boolean;
    }) => {
      const token = localStorage.getItem("access_token");
      const response = await api.post(
        `comments/${commentId}/suggestions/${suggestionId}/accept`,
        { suggestion_content: content, is_edited: isEdited,  },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Suggestion accepted", {
        description: "The suggestion has been successfully applied.",
      });
      setIsAccepted(true);
      setShowFeedback(true);
    },
    onError: () => {
      toast.error("Failed to accept suggestion", {
        description: "Please try again later.",
      });
    },
  });

  useEffect(() => {
    console.log(groups)
    if (groups && groups.length > 0) {
      const group = groups[0]
      if (
        group.suggestion_selected_index !== null &&
        group.suggestions &&
        group.suggestions[group.suggestion_selected_index]
      ) {
        setSelectedGroup(0)
        setSelectedSuggestion(group.suggestion_selected_index)
        setEditedContent(group.suggestions[group.suggestion_selected_index].content)
        setIsAccepted(true)
        setShowFeedback(true)
      }
    }
  }, [groups])

  useEffect(() => {
    setShowFeedback(false);
    setFeedbackType(null);
    setFeedbackReason("");
    setFeedbackComment("");
    setSelectedGroup(null);
    setSelectedSuggestion(null);
    setEditedContent("");
    setIsAccepted(false);
  }, [suggestions]);

  const handleSelectSuggestion = (groupIndex: number, suggestionIndex: number) => {
    const group = groups[groupIndex]
    if (isAccepted || group?.suggestion_selected_index !== null) return

    if (selectedGroup === groupIndex && selectedSuggestion === suggestionIndex) {
      setSelectedGroup(null)
      setSelectedSuggestion(null)
    } else {
      setSelectedGroup(groupIndex)
      setSelectedSuggestion(suggestionIndex)
      setEditedContent(group.suggestions[suggestionIndex].content)
      setIsEditing(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleConfirmEdit = () => {
    setIsEditing(false)
    toast.info("Edit confirmed", {
      description: "You can now accept the edited suggestion.",
    })
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    if (selectedGroup !== null && selectedSuggestion !== null) {
      setEditedContent(groups[selectedGroup].suggestions[selectedSuggestion].content)
    }
  }

  const handleAccept = () => {
    console.log("Suggestion accepted:", editedContent);
    if (selectedGroup !== null && selectedSuggestion !== null) {
      acceptSuggestionMutation.mutate({
        commentId: groups[selectedGroup].gh_comment_id,
        suggestionId: groups[selectedGroup].suggestions[selectedSuggestion]._id,
        content: editedContent,
      });
    }
  };

  const feedbackMutation = useMutation({
    mutationFn: async (feedbackData: { type: string | null; reason: string; comment: string }) => {
      const token = localStorage.getItem("access_token");
      const response = await api.post("/suggestions/feedback", feedbackData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Feedback submitted", {
        description: "Thank you for your feedback!",
      });
      setFeedbackType(null);
      setFeedbackReason("");
      setFeedbackComment("");
    },
    onError: () => {
      toast.error("Error submitting feedback", {
        description: "Please try again later.",
      });
    }
  });

  const handleFeedbackSubmit = () => {
    feedbackMutation.mutate({
      type: feedbackType,
      reason: feedbackReason,
      comment: feedbackComment,
    });
  };

  return (
    <div className="w-full">
      <h2 className="mb-2 text-xl font-semibold">Correction Suggestions</h2>
      <Separator className="mb-4" />

      <div className="space-y-3 px-2 pb-10">
        {groups.map((group, groupIndex) => (
          <SuggestionGroup
            key={groupIndex}
            group={group}
            groupIndex={groupIndex}
            selectedGroup={selectedGroup}
            selectedSuggestion={selectedSuggestion}
            editedContent={editedContent}
            isEditing={isEditing}
            isAccepted={isAccepted}
            handleSelectSuggestion={handleSelectSuggestion}
            setEditedContent={setEditedContent}
            handleEdit={handleEdit}
            handleConfirmEdit={handleConfirmEdit}
            handleCancelEdit={handleCancelEdit}
            handleAccept={handleAccept}
          />
        ))}
        {groups.length === 0 && (
          <p className="py-4 text-center text-muted-foreground">
            No suggestions available for this comment.
          </p>
        )}
      </div>

      {showFeedback && (
        <div className="mt-6 border rounded-lg p-4 bg-muted/20">
          <h3 className="text-lg font-medium mb-3">Was this suggestion helpful?</h3>
          {!feedbackType ? (
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setFeedbackType("useful")} className="flex items-center gap-2">
                <ThumbsUp className="size-4" />
                Yes, it was helpful
              </Button>
              <Button variant="outline" onClick={() => setFeedbackType("not-useful")} className="flex items-center gap-2">
                <ThumbsDown className="size-4" />
                No, it wasn't helpful
              </Button>
            </div>
          ) : feedbackType === "useful" ? (
            <div className="space-y-3">
              <p className="text-green-600 flex items-center gap-2">
                <ThumbsUp className="size-4" />
                Thank you for your feedback!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground flex items-center gap-2">
                <ThumbsDown className="size-4" />
                We're sorry to hear that. Please tell us why:
              </p>
              <RadioGroup value={feedbackReason} onValueChange={setFeedbackReason} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="incorrect" id="incorrect" />
                  <Label htmlFor="incorrect">The suggestion was incorrect</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inappropriate" id="inappropriate" />
                  <Label htmlFor="inappropriate">The suggestion was inappropriate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not-useful" id="not-useful" />
                  <Label htmlFor="not-useful">The suggestion wasn't useful</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other reason</Label>
                </div>
              </RadioGroup>
              <div className="space-y-2">
                <Label htmlFor="feedback-comment">Additional comments (optional)</Label>
                <Textarea
                  id="feedback-comment"
                  placeholder="Please provide more details..."
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <Button onClick={handleFeedbackSubmit}>Submit Feedback</Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
