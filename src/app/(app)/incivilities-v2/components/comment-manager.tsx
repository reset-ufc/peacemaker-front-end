"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { mockComments, mockUsers } from "@/lib/mock-data";
import type { Comment, CommentCategory } from "@/lib/types";

import { CommentDetail } from "./comment-detail";
import { CommentList } from "./comment-list";
import { EmptyState } from "./empty-state";
import { FilterBar } from "./filter-bar";
import { SearchBar } from "./search-bar";

export default function CommentManager() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const commentId = searchParams.get("commentId");

  const isMobile = useIsMobile();
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<CommentCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDetail, setShowDetail] = useState(!isMobile);

  // Load comments
  useEffect(() => {
    // In a real app, this would fetch from an API
    setComments(mockComments);
  }, []);

  // Handle URL-based comment selection
  useEffect(() => {
    if (commentId && comments.length > 0) {
      const comment = comments.find(c => c._id === commentId);
      if (comment) {
        setSelectedComment(comment);
        setShowDetail(true);
      }
    }
  }, [commentId, comments]);

  const filteredComments = comments.filter(comment => {
    const matchesCategory =
      selectedCategory === "all" ||
      comment.category === selectedCategory ||
      (selectedCategory === "resolved" && comment.solutioned);

    const matchesSearch =
      searchQuery === "" ||
      (comment.gh_comment_sender_id &&
        mockUsers
          .find(u => u.gh_id === comment.gh_comment_sender_id)
          ?.username.toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      comment.content.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleCommentSelect = (comment: Comment) => {
    // Update URL with comment ID
    const params = new URLSearchParams(searchParams.toString());
    params.set("commentId", comment._id);
    router.push(`?${params.toString()}`);

    setSelectedComment(comment);
    if (isMobile) {
      setShowDetail(true);
    }
  };

  const handleBackToList = () => {
    // Remove comment ID from URL
    const params = new URLSearchParams(searchParams.toString());
    params.delete("commentId");
    router.push(`?${params.toString()}`);

    setSelectedComment(null);
    if (isMobile) {
      setShowDetail(false);
    }
  };

  const handleMarkAsResolved = (id: string) => {
    setComments(
      comments.map(comment =>
        comment._id === id
          ? { ...comment, solutioned: !comment.solutioned }
          : comment
      )
    );
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden">
      <div className="flex flex-1 flex-col overflow-hidden">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <FilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="flex flex-1 overflow-hidden">
          {(!isMobile || !showDetail) && (
            <CommentList
              comments={filteredComments}
              selectedComment={selectedComment}
              onSelectComment={handleCommentSelect}
            />
          )}

          {(!isMobile || showDetail) &&
            (selectedComment ? (
              <CommentDetail
                comment={selectedComment}
                onBack={handleBackToList}
                onMarkAsResolved={handleMarkAsResolved}
              />
            ) : (
              <EmptyState onBack={handleBackToList} />
            ))}
        </div>
      </div>
    </div>
  );
}
