"use client";

import { useMutation } from "@tanstack/react-query";
import { Check, Edit, ThumbsDown, ThumbsUp, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Comment, Suggestion } from "@/types";
import { useTranslation } from "react-i18next";

interface SuggestionListProps {
  suggestions: Suggestion[];
  comment: Comment;
  suggestionAcceptedId: string | null;
}

export function SuggestionList({
  suggestions,
  comment,
  suggestionAcceptedId,
}: SuggestionListProps) {
  const [selectedSuggestionId, setSelectedSuggestionId] = useState<string | null>(null);
  const [localSuggestions, setLocalSuggestions] = useState(suggestions);
  const [editedContent, setEditedContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isContentEdited, setIsContentEdited] = useState<boolean>(false);

  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [feedbackType, setFeedbackType] = useState<"positive" | "negative" | null>(null);
  const [feedbackJustification, setFeedbackJustification] = useState<string>("");

  const [showRejectModal, setShowRejectModal] = useState<boolean>(false);
  const [showNeedsAttentionModal, setShowNeedsAttentionModal] = useState(false);
  const [showFirstEditModal, setShowFirstEditModal] = useState(false);
  // const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  // const [eventSource, setEventSource] = useState<EventSource>();

  useEffect(() => {
    if (comment.editAttempts === 1) {
      setShowFirstEditModal(true);
    } else if (comment.needsAttention) {
      setShowNeedsAttentionModal(true);
    }
  }, [comment.editAttempts, comment.needsAttention]);

  useEffect(() => {
    setLocalSuggestions(suggestions);
    setEditedContent("");
  }, [suggestions]);

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
        `api/comments/${commentId}/suggestions/${suggestionId}/accept`,
        { suggestion_content: content, is_edited: isEdited },
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
      // setShowFeedback(true);
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message;
      if (msg?.includes("configure seu GitHub token")) {
        toast.error(msg);
      } else if (msg?.includes("inválido")) {
        toast.error(msg);
      } else {
        toast.error("Falha ao aceitar sugestão. Tente novamente.");
      }
    },
  });

  const rejectSuggestionMutation = useMutation({
    mutationFn: async (suggestionId: string) => {
      const token = localStorage.getItem("access_token");
      const response = await api.patch(`api/suggestions/${suggestionId}/reject`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Suggestion rejected", {
        description: "The suggestion has been rejected successfully.",
      });

      setEditedContent("");
      setIsEditing(false);
      setIsContentEdited(false);

      setShowFeedback(true);
    },
    onError: () => {
      toast.error("Failed to reject suggestion", {
        description: "Please try again later.",
      });
    },
  });

  const feedbackMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("access_token");
      return api.post(
        "/api/suggestions/feedback",
        {
          comment_id: comment.gh_comment_id,
          suggestion_id: selectedSuggestionId,
          type: feedbackType,
          comment: feedbackJustification,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      toast.success("Feedback sent");

      setLocalSuggestions((prev) =>
        prev.filter((s) => s._id !== selectedSuggestionId)
      );
      setShowFeedback(false);
      setSelectedSuggestionId(null);
      setFeedbackType(null);
      setFeedbackJustification("");
    },
    onError: () => {
      toast.error("Failed to send feedback");
    },
  });

  const handleSelectSuggestion = (suggestionId: string) => {
    if (suggestionAcceptedId) return;

    if (selectedSuggestionId === suggestionId) {
      setSelectedSuggestionId(null);
      setEditedContent("");
    } else {
      const suggestion = localSuggestions.find(s => s._id === suggestionId);
      if (suggestion) {
        setSelectedSuggestionId(suggestionId);
        setEditedContent(suggestion.content);
        setIsEditing(false);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleConfirmEdit = (content: string) => {
    setIsContentEdited(true);
    setEditedContent(content);
    setIsEditing(false);
    toast.info("Edit confirmed", {
      description: "You can now accept the edited suggestion.",
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (selectedSuggestionId) {
      const suggestion = localSuggestions.find(s => s._id === selectedSuggestionId);
      if (suggestion) {
        setEditedContent(suggestion.content);
      }
    }
    setIsContentEdited(false);
  };

  const handleAccept = () => {
    if (!selectedSuggestionId) return;
    // setLoadingSuggestions(true);
    acceptSuggestionMutation.mutate({
      commentId: comment.gh_comment_id,
      suggestionId: selectedSuggestionId,
      content: editedContent,
      isEdited: isContentEdited,
    });
  };

  const handleOpenRejectModal = () => {
    setShowRejectModal(true);
  };

  const handleCancelReject = () => {
    setShowRejectModal(false);
  };

  const handleConfirmReject = () => {
    if (!selectedSuggestionId) return;
    rejectSuggestionMutation.mutate(selectedSuggestionId);
    setShowRejectModal(false);
  };

  const handleFeedbackSubmit = () => {
    if (!selectedSuggestionId || !feedbackType) return;

    feedbackMutation.mutate();
  };

  const { t } = useTranslation()

  return (
    <div className='flex flex-col'>
      {showFirstEditModal && (
       <div className="fixed inset-0 z-50 bg-opacity-100 flex items-center justify-center">
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h2 className="text-xl font-bold mb-4">⚠️ Atenção!</h2>
            <p className="mb-6">
              Você editou esta sugestão pela primeira vez.<br/>
              Ainda demonstra traços de incivilidade.<br/>
              Por favor, revise bem antes de enviar outra edição.
            </p>
            <Button onClick={() => setShowFirstEditModal(false)}>
              Entendi
            </Button>
          </div>
        </div>
      )}

      {showNeedsAttentionModal && (
        <div className="fixed inset-0 z-50 bg-opacity-100 flex items-center justify-center">
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-lg max-w-lg text-center">
            <h2 className="text-xl font-bold mb-4">⛔ Atenção!</h2>
            <p className="mb-6">
              Você editou esta sugestão {comment.editAttempts} vezes e ela continua com traços de incivilidade.<br/>
              Entendemos que você pode ter tentado melhorar a sugestão, mas ainda assim ela não atende aos padrões de civilidade.<br/>
              Desta vez deixamos você enviar a edição, sem sugestões.<br/>
              Por favor, revise cuidadosamente antes de enviar outra edição.
            </p>
            <Button onClick={() => setShowNeedsAttentionModal(false)}>
              Entendi
            </Button>
          </div>
        </div>
      )}
      {showRejectModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-100 z-50">
          <div className="bg-card text-card-foreground p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Rejection</h2>
            <p className="mb-4">
              Are you sure you want to reject this suggestion? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" className="cursor-pointer" onClick={handleCancelReject}>
                Cancel
              </Button>
              <Button variant="destructive" className="cursor-pointer" onClick={handleConfirmReject}>
                Confirm Reject
              </Button>
            </div>
          </div>
        </div>
      )}

      <Feedback
        showFeedback={showFeedback}
        selectedSuggestionId={selectedSuggestionId}
        feedbackType={feedbackType}
        setFeedbackType={setFeedbackType}
        feedbackJustification={feedbackJustification}
        setFeedbackJustification={setFeedbackJustification}
        handleFeedbackSubmit={handleFeedbackSubmit}
      />

      {
        comment.needsAttention ? (
          <h2 className='mb-2 text-xl font-semibold pl-3'>{t("Personal Correction")}</h2>
        ) : (
          <h2 className='mb-2 text-xl font-semibold pl-3'>{t("Correction Suggestions")}</h2>
        )
      }

      {
        comment.needsAttention && (
          <div className='space-y-3 pl-2 pr-2 pb-5'>
            <Card
              className={cn(
                "p-2 transition-colors",
              )}
              onClick={() => {}}
            >
              <CardContent className='p-2'>
                <Textarea
                  value={editedContent}
                  onChange={e => {
                    setEditedContent(e.target.value);
                    if (e.target.value === "") {
                      setIsContentEdited(false);
                    }
                  }}
                  onClick={e => e.stopPropagation()}
                  className='min-h-[100px] w-full outline-none'
                />
              </CardContent>
              <CardFooter className='flex justify-end gap-2 p-3 pt-0'>
                  <>
                    <Button
                      variant='outline'
                      onClick={e => {
                        e.stopPropagation();
                        handleAccept();
                      }}
                    >
                      <Check className='size-4' />
                      Submit
                    </Button>
                  </>
              </CardFooter>
            </Card>
          </div>
        )
      }
      <Separator className='mb-4' />

      <div className='space-y-3 px-2 pb-5'>
        {localSuggestions.map(suggestion => {
          const isSelected = selectedSuggestionId === suggestion._id;
          const isAccepted = suggestionAcceptedId === suggestion._id;
          const isDisabled = (!!suggestionAcceptedId && suggestionAcceptedId !== suggestion._id) || comment.needsAttention;

          return (
            <Card
              key={suggestion._id}
              className={cn(
                "p-2 transition-colors",
                isDisabled && "cursor-not-allowed opacity-50",
                isSelected && "border-primary border-2",
                isAccepted && "bg-primary/10",
                !isDisabled &&
                  !isSelected &&
                  !isAccepted &&
                  "hover:border-muted-foreground/50 cursor-pointer",
                isSelected && suggestionAcceptedId && "bg-primary/5"
              )}
              onClick={() =>
                !isDisabled && handleSelectSuggestion(suggestion._id)
              }
            >
              <CardContent className='p-2'>
                {isEditing && isSelected ? (
                  <Textarea
                    value={editedContent}
                    onChange={e => {
                      setEditedContent(e.target.value);
                      if (e.target.value === "") {
                        setIsContentEdited(false);
                      }
                    }}
                    onClick={e => e.stopPropagation()}
                    className='min-h-[100px] w-full outline-none'
                  />
                ) : (
                  <p className='whitespace-pre-wrap'>
                    {isSelected ? editedContent : suggestion.content}
                  </p>
                )}
              </CardContent>

              {isSelected && !suggestionAcceptedId && (
                <CardFooter className='flex justify-end gap-2 p-3 pt-0'>
                  {isEditing ? (
                    <>
                      <Button
                        variant='destructive'
                        onClick={e => {
                          e.stopPropagation();
                          handleCancelEdit();
                        }}
                      >
                        <X className='size-4' />
                        Cancel edit
                      </Button>
                      <Button
                        variant='outline'
                        onClick={e => {
                          e.stopPropagation();
                          handleConfirmEdit(editedContent);
                        }}
                        disabled={
                          editedContent === "" ||
                          editedContent === suggestion.content.trimEnd() ||
                          editedContent === comment.content.trimEnd()
                        }
                      >
                        <Check className='size-4' />
                        Confirm edit
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant='outline'
                        onClick={e => {
                          e.stopPropagation();
                          handleEdit();
                        }}
                      >
                        <Edit className='size-4' />
                        Edit suggestion
                      </Button>
                      <Button
                        variant='outline'
                        onClick={e => {
                          e.stopPropagation();
                          handleAccept();
                        }}
                      >
                        <Check className='size-4' />
                        {acceptSuggestionMutation.isPending ? "Verificando token…" : "Accept suggestion"}
                      </Button>
                      <Button
                        variant='destructive'
                        className="cursor-pointer"
                        onClick={e => {
                          e.stopPropagation();
                          handleOpenRejectModal();
                        }}
                      >
                        <ThumbsDown className='size-4' />
                        Reject suggestion
                      </Button>
                    </>
                  )}
                </CardFooter>
              )}
            </Card>
          );
        })}

        {localSuggestions.length === 0 && (
          <p className='text-muted-foreground py-4 text-center'>
            No suggestions available for this comment.
          </p>
        )}
      </div>
    </div>
  );
}

function Feedback({
  showFeedback,
  selectedSuggestionId,
  feedbackType,
  setFeedbackType,
  feedbackJustification,
  setFeedbackJustification,
  handleFeedbackSubmit,
}: {
  showFeedback: boolean;
  selectedSuggestionId: string | null;
  feedbackType: "positive" | "negative" | null;
  setFeedbackType: (type: "positive" | "negative" | null) => void;
  feedbackJustification: string;
  setFeedbackJustification: (justification: string) => void;
  handleFeedbackSubmit: () => void;
}) {
  if (!showFeedback || !selectedSuggestionId) return null;

  return (
    <div className='bg-muted/20 rounded-lg border p-4'>
      <h3 className='mb-3 text-lg font-medium'>Was this suggestion helpful?</h3>

      {!feedbackType ? (
        <div className='flex gap-3'>
          <Button
            variant='outline'
            onClick={() => setFeedbackType("positive")}
            className='flex items-center gap-2'
          >
            <ThumbsUp className='size-4' />
            Yes, it was helpful
          </Button>
          <Button
            variant='outline'
            onClick={() => setFeedbackType("negative")}
            className='flex items-center gap-2'
          >
            <ThumbsDown className='size-4' />
            No, it wasn't helpful
          </Button>
        </div>
      ) : feedbackType === "positive" ? (
        <div className='space-y-3'>
          <p className='flex items-center gap-2 text-green-600'>
            <ThumbsUp className='size-4' />
            Thank you for your feedback!
          </p>
          <Button onClick={handleFeedbackSubmit}>Submit Feedback</Button>
        </div>
      ) : (
        <div className='space-y-4'>
          <p className='text-muted-foreground flex items-center gap-2'>
            <ThumbsDown className='size-4' />
            We're sorry to hear that. Please tell us why:
          </p>
          <RadioGroup
            value={feedbackJustification}
            onValueChange={setFeedbackJustification}
            className='space-y-2'
          >
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='incorrect' id='incorrect' />
              <Label htmlFor='incorrect'>The suggestion was incorrect</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='inappropriate' id='inappropriate' />
              <Label htmlFor='inappropriate'>
                The suggestion was inappropriate
              </Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='not-useful' id='not-useful' />
              <Label htmlFor='not-useful'>The suggestion wasn't useful</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='other' id='other' />
              <Label htmlFor='other'>Other reason</Label>
            </div>
          </RadioGroup>
          <Button onClick={handleFeedbackSubmit}>Submit Feedback</Button>
        </div>
      )}
    </div>
  );
}
