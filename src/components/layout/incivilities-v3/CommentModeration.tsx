"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { CommentDetail } from "@/components/layout/incivilities-v3/CommentDetail";
import { CommentList } from "@/components/layout/incivilities-v3/CommentList";
// import { mockComments } from "@/data/comments";
// import { mockSuggestions } from "@/data/suggestions";
import type { Comment, Suggestion } from "@/types";

import { TabsCategories } from "./TabsCategories";

interface CommentModerationProps {
  commentsData: Array<Comment>;
  suggestionsData: Record<string, Array<Suggestion>>;
}

export function CommentModeration({
  commentsData,
  suggestionsData,
}: CommentModerationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [comments, setComments] = useState<Comment[]>([]);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  // Get query parameters
  const query = searchParams.get("q") || "";
  const activeFilter = searchParams.get("filter") || "all";
  const selectedId = searchParams.get("id") || "";

  // Update URL with new parameters
  const updateUrlParams = (params: Record<string, string>) => {
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
  };

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
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, []);

  // Fetch suggestions when a comment is selected
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!selectedComment) return;

      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/comments/${selectedComment.gh_comment_id}/suggestions`)
        // const data = await response.json()
        // setSuggestions(data.suggestions)

        //
        const commentSuggestions = suggestionsData.suggestions;

        setSuggestions(commentSuggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [selectedComment]);

  // Filter and search comments
  useEffect(() => {
    if (!comments.length) return;

    let result = [...comments];

    // Apply search filter
    if (query) {
      const searchTerm = query.toLowerCase();
      result = result.filter(
        comment =>
          comment.content.toLowerCase().includes(searchTerm) ||
          (comment.gh_comment_sender_login || "")
            .toLowerCase()
            .includes(searchTerm) ||
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

    setFilteredComments(result);
  }, [comments, query, activeFilter]);

  // Set selected comment from URL
  useEffect(() => {
    if (selectedId && comments.length) {
      const comment = comments.find(c => c.gh_comment_id === selectedId);
      if (comment) {
        setSelectedComment(comment);
      }
    } else if (comments.length && !selectedComment) {
      // Select first comment by default
      setSelectedComment(comments[0]);
      updateUrlParams({ id: comments[0].gh_comment_id });
    }
  }, [comments, selectedId, selectedComment]);

  // Handle search input
  const handleSearch = (searchTerm: string) => {
    updateUrlParams({ q: searchTerm });
  };

  // Handle filter change
  const handleFilterChange = (value: string) => {
    updateUrlParams({ filter: value });
  };

  // Handle comment selection
  const handleSelectComment = (comment: Comment) => {
    setSelectedComment(comment);
    setShowDetails(false);
    updateUrlParams({ id: comment.gh_comment_id });
  };

  // Handle suggestion selection and editing
  const handleSuggestionSelect = (suggestion: Suggestion) => {
    if (!selectedComment) return;

    // Update the selected comment with the selected suggestion
    const updatedComment = {
      ...selectedComment,
      selected_suggestion: suggestion,
    };

    setSelectedComment(updatedComment);

    // Update the comment in the comments list
    const updatedComments = comments.map(c =>
      c.gh_comment_id === updatedComment.gh_comment_id ? updatedComment : c
    );

    setComments(updatedComments);
  };

  // Handle suggestion confirmation
  const handleSuggestionConfirm = (editedContent: string) => {
    if (!selectedComment) return;

    // Update the selected comment with the edited content
    const updatedComment = {
      ...selectedComment,
      edited_content: editedContent,
    };

    setSelectedComment(updatedComment);

    // Update the comment in the comments list
    const updatedComments = comments.map(c =>
      c.gh_comment_id === updatedComment.gh_comment_id ? updatedComment : c
    );

    setComments(updatedComments);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header/Search Bar */}
      {/* <header className="flex h-14 items-center justify-between border-b px-4">
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
      </header> */}

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
            selectedId={selectedComment?.gh_comment_id || ""}
            onSelect={handleSelectComment}
            isLoading={isLoading}
          />
        </div>

        {/* Comment Detail */}
        <div
          className={`${showDetails ? "w-2/3" : "flex-1"} overflow-y-auto transition-all duration-300`}
        >
          {selectedComment && (
            <CommentDetail
              comment={selectedComment}
              suggestions={suggestions}
              showDetails={showDetails}
              onToggleDetails={() => setShowDetails(!showDetails)}
              onSuggestionSelect={handleSuggestionSelect}
              onSuggestionConfirm={handleSuggestionConfirm}
            />
          )}
        </div>
      </div>
    </div>
  );
}
