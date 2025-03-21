"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ArrowUpDown, Filter, Search } from "lucide-react";

import { CommentDetail } from "@/components/layout/incivilities-v3/CommentDetail";
import { CommentList } from "@/components/layout/incivilities-v3/CommentList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Comment, CommentState, Suggestion } from "@/types";

import { TabsCategories } from "./TabsCategories";

interface CommentModerationProps {
  commentsData: Array<Comment>;
}

export function CommentModeration({ commentsData }: CommentModerationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [commentStates, setCommentStates] = useState<CommentState[]>([]);

  // Get query parameters
  const query = searchParams.get("q") || "";
  const activeFilter = searchParams.get("filter") || "all";
  const selectedId = searchParams.get("id") || "";

  // Memoize filtered comments to avoid unnecessary recalculations
  const filteredComments = useMemo(() => {
    if (!comments.length) return [];

    let result = [...comments];

    // Apply search filter
    if (query) {
      const searchTerm = query.toLowerCase();
      result = result.filter(
        comment =>
          comment.content.toLowerCase().includes(searchTerm) ||
          comment.gh_comment_sender_login.toLowerCase().includes(searchTerm) ||
          comment.gh_repository_name.toLowerCase().includes(searchTerm) ||
          comment.gh_repository_id.toLowerCase().includes(searchTerm)
      );
    }

    // Apply category filter
    if (activeFilter !== "all") {
      if (activeFilter === "resolved") {
        result = result.filter(comment => comment.solutioned);
      } else {
        result = result.filter(
          comment =>
            comment.classification.toLowerCase() === activeFilter.toLowerCase()
        );
      }
    }

    return result;
  }, [comments, query, activeFilter]);

  // Memoize selected comment
  const selectedComment = useMemo(() => {
    if (!selectedId || !comments.length) return null;
    return comments.find(c => c.gh_comment_id === selectedId) || null;
  }, [comments, selectedId]);

  // Get comment state for the selected comment
  const selectedCommentState = useMemo(() => {
    if (!selectedId) return null;
    return commentStates.find(state => state.commentId === selectedId) || null;
  }, [commentStates, selectedId]);

  // Update URL with new parameters
  const updateUrlParams = useCallback(
    (params: Record<string, string>) => {
      const url = new URL(window.location.href);

      // Update existing parameters
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          url.searchParams.set(key, value);
        } else {
          url.searchParams.delete(key);
        }
      });

      // Replace the current URL without reloading the page
      router.replace(url.pathname + url.search, { scroll: false });
    },
    [router]
  );

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/comments?with_parent=true')
        // const data = await response.json()
        // setComments(data.comments)

        // Using mock data for now
        setComments(commentsData);

        // Initialize comment states
        const initialStates = commentsData.map(comment => ({
          commentId: comment.gh_comment_id,
        }));
        setCommentStates(initialStates);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, []);

  // Set selected comment from URL
  useEffect(() => {
    if (selectedId && comments.length) {
      const comment = comments.find(c => c.gh_comment_id === selectedId);
      if (!comment && comments.length > 0) {
        // If the selected ID doesn't exist, select the first comment
        updateUrlParams({ id: comments[0].gh_comment_id });
      }
    } else if (comments.length && !selectedId) {
      // Select first comment by default
      updateUrlParams({ id: comments[0].gh_comment_id });
    }
  }, [comments, selectedId, updateUrlParams]);

  // Handle search input
  const handleSearch = useCallback(
    (searchTerm: string) => {
      updateUrlParams({ q: searchTerm });
    },
    [updateUrlParams]
  );

  // Handle filter change
  const handleFilterChange = useCallback(
    (value: string) => {
      updateUrlParams({ filter: value });
    },
    [updateUrlParams]
  );

  // Handle comment selection
  const handleSelectComment = useCallback(
    (comment: Comment) => {
      setShowDetails(false);
      updateUrlParams({ id: comment.gh_comment_id });
    },
    [updateUrlParams]
  );

  // Handle suggestion selection
  const handleSuggestionSelect = useCallback(
    (suggestion: Suggestion | null) => {
      if (!selectedId) return;

      setCommentStates(prevStates => {
        const updatedStates = [...prevStates];
        const stateIndex = updatedStates.findIndex(
          state => state.commentId === selectedId
        );

        if (stateIndex >= 0) {
          // @ts-ignore
          updatedStates[stateIndex] = {
            ...updatedStates[stateIndex],
            selectedSuggestionId: suggestion?._id,
            editedContent: suggestion?.content,
          };
        } else if (suggestion) {
          updatedStates.push({
            commentId: selectedId,
            selectedSuggestionId: suggestion._id,
            editedContent: suggestion.content,
          });
        }

        return updatedStates;
      });
    },
    [selectedId]
  );

  // Handle suggestion confirmation
  const handleSuggestionConfirm = useCallback(
    (editedContent: string) => {
      if (!selectedId) return;

      setCommentStates(prevStates => {
        const updatedStates = [...prevStates];
        const stateIndex = updatedStates.findIndex(
          state => state.commentId === selectedId
        );

        if (stateIndex >= 0) {
          updatedStates[stateIndex] = {
            ...updatedStates[stateIndex],
            editedContent,
          };
        } else {
          updatedStates.push({
            commentId: selectedId,
            editedContent,
          });
        }

        return updatedStates;
      });
    },
    [selectedId]
  );

  // Handle toggle details
  const handleToggleDetails = useCallback(() => {
    setShowDetails(prev => !prev);
  }, []);

  return (
    <div className="bg-background text-foreground flex h-screen flex-col overflow-hidden">
      {/* Header/Search Bar */}
      <header className="flex h-14 items-center justify-between border-b px-4">
        <div className="flex w-full max-w-md items-center gap-2">
          <Search className="text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search comments, users or repositories..."
            className="bg-background h-9 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            value={query}
            onChange={e => handleSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowUpDown className="h-4 w-4" />
            <span>Sort</span>
          </Button>
        </div>
      </header>

      {/* Category Tabs */}
      <TabsCategories
        activeFilter={activeFilter}
        handleFilterChange={handleFilterChange}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Comment List */}
        <div
          className={`${showDetails ? "w-1/3" : "w-2/5"} overflow-y-auto border-r transition-all duration-300`}
        >
          <CommentList
            comments={filteredComments}
            selectedId={selectedId}
            onSelect={handleSelectComment}
            isLoading={isLoading}
            commentStates={commentStates}
          />
        </div>

        {/* Comment Detail */}
        <div
          className={`${showDetails ? "w-2/3" : "flex-1"} overflow-y-auto transition-all duration-300`}
        >
          {selectedComment && (
            <CommentDetail
              comment={selectedComment}
              showDetails={showDetails}
              onToggleDetails={handleToggleDetails}
              onSuggestionSelect={handleSuggestionSelect}
              onSuggestionConfirm={handleSuggestionConfirm}
              commentState={selectedCommentState}
            />
          )}
        </div>
      </div>
    </div>
  );
}
