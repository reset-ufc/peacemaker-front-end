import { useState } from "react";

import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";

export function FeedbackSuggestion() {
  // Feedback states
  const [feedbackType, setFeedbackType] = useState<
    "useful" | "not-useful" | null
  >(null);
  const [feedbackReason, setFeedbackReason] = useState<string>("");
  const [feedbackComment, setFeedbackComment] = useState<string>("");
  // Handle feedback submission
  const handleFeedbackSubmit = () => {
    console.log("Feedback submitted:", {
      type: feedbackType,
      reason: feedbackReason,
      comment: feedbackComment,
    });

    toast.success("Feedback submitted", {
      description: "Thank you for your feedback!",
    });
  };
  return (
    <div className="bg-muted/20 rounded-lg border px-4 py-2">
      <h3 className="mb-3 text-lg font-medium">
        Was this selected suggestion useful?
      </h3>

      {!feedbackType ? (
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setFeedbackType("useful")}
            className="flex items-center gap-2"
          >
            <ThumbsUpIcon className="size-4" />
            Yes, it was helpful
          </Button>
          <Button
            variant="outline"
            onClick={() => setFeedbackType("not-useful")}
            className="flex items-center gap-2"
          >
            <ThumbsDownIcon className="size-4" />
            No, it wasn't helpful
          </Button>
        </div>
      ) : feedbackType === "useful" ? (
        <div className="space-y-3">
          <p className="flex items-center gap-2 text-green-600">
            <ThumbsUpIcon className="size-4" />
            Thank you for your feedback!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-muted-foreground flex items-center gap-2">
            <ThumbsDownIcon className="size-4" />
            We're sorry to hear that. Please tell us why:
          </p>

          <RadioGroup
            value={feedbackReason}
            onValueChange={setFeedbackReason}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="incorrect" id="incorrect" />
              <Label htmlFor="incorrect">The suggestion was incorrect</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="inappropriate" id="inappropriate" />
              <Label htmlFor="inappropriate">
                The suggestion was inappropriate
              </Label>
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
            <Label htmlFor="feedback-comment">
              Additional comments (optional)
            </Label>
            <Textarea
              id="feedback-comment"
              placeholder="Please provide more details..."
              value={feedbackComment}
              onChange={e => setFeedbackComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button onClick={handleFeedbackSubmit}>Submit Feedback</Button>
        </div>
      )}
    </div>
  );
}
