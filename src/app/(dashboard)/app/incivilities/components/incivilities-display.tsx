"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns/format";
import { useState } from "react";
import type { Incivility } from "./incivilities";
import { SuggestionCorrectingIncivilities } from "./suggestions";

interface IncivilitiesDisplayProps {
  incivilities: Incivility;
}

const suggestions = [
  "I'm experiencing the same issue. Waiting for 3 hours is simply too slow and frustrating. It's incredibly unacceptable.",
  "I'm having the same issue. Waiting 3 hours is too frustrating.",
  "I'm having the same issue, 3 hours is too slow, this is unacceptable.",
];

export function IncivilitiesDisplay({
  incivilities,
}: IncivilitiesDisplayProps) {
  const today = new Date();
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [report, setReport] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  function handleSend(e: React.MouseEvent) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Check if selectedSuggestion is empty
    if (!selectedSuggestion.trim()) {
      alert("Please select a suggestion before sending."); // Alert the user
      return; // Exit the function early
    }

    const githubLink =
      "https://github.com/ThePeacemakerBot/peacemaker-test-repo/pull/3"; // Your GitHub link
    window.location.href = githubLink; // Redirect the user to the GitHub link
  }

  const handleSelectSuggestion = (suggestion: string) => {
    setSelectedSuggestion(suggestion);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLike(true);
    setDislike(false);
    setReport(false);
    setHasInteracted(true); // User has interacted
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLike(false);
    setDislike(true);
    setReport(false);
    setHasInteracted(true); // User has interacted
  };

  const handleReport = (e: React.MouseEvent) => {
    e.preventDefault();
    setLike(false);
    setDislike(false);
    setReport(true);
  };

  return (
    <div className="flex h-full flex-col">
      {incivilities ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage alt={incivilities.repo_name} />
                <AvatarFallback>
                  {incivilities.repo_name
                    .split(" ")
                    .map((chunk) => chunk[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">{incivilities.repo_name}</div>
                <div className="line-clamp-1 text-xs">
                  {incivilities.classification_type}
                </div>
              </div>
            </div>
            {incivilities.created_at && (
              <div className="ml-auto text-xs text-muted-foreground">
                {format(new Date(incivilities.created_at), "PPpp")}
              </div>
            )}
          </div>
          <Separator />
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {incivilities.comment}
          </div>
          <Separator className="mt-auto" />
          <div className="p-4">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4">
                <SuggestionCorrectingIncivilities
                  suggestions={suggestions}
                  onSelect={handleSelectSuggestion}
                />
                <div className="flex flex-wrap items-center space-x-2">
                  <Button
                    onClick={handleLike}
                    variant={like ? "default" : "outline"}
                    className={
                      like
                        ? "bg-blue-500 text-white"
                        : "border-gray-500 text-blue-500"
                    }
                  >
                    👍 Like
                  </Button>
                  <Button
                    onClick={handleDislike}
                    variant={dislike ? "default" : "outline"}
                    className={
                      dislike
                        ? "bg-blue-500 text-white"
                        : "border-gray-500 text-blue-500"
                    }
                  >
                    👎 Dislike
                  </Button>
                  {/* <Button
										onClick={handleReport}
										variant={report ? "default" : "outline"}
										className={
											report
												? "bg-blue-500 text-white"
												: "border-gray-500 text-blue-500"
										}
									>
										🚩 Report
									</Button> */}
                </div>
                <Textarea
                  className="p-4"
                  placeholder={`Reply ${incivilities.repo_name}...`}
                  value={selectedSuggestion}
                  readOnly
                  onChange={(e) => setSelectedSuggestion(e.target.value)}
                />
                <div className="flex items-center">
                  <Button
                    type="submit"
                    size="sm"
                    className="ml-auto"
                    onClick={handleSend}
                    disabled={!selectedSuggestion.trim() || !hasInteracted} // Disable button if selectedSuggestion is empty
                  >
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No incivilities selected
        </div>
      )}
    </div>
  );
}
