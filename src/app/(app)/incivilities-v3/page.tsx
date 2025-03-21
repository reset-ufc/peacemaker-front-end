import { Suspense } from "react";

import { CommentModeration } from "@/components/layout/incivilities-v3/CommentModeration";

export default function IncivilitiesPage() {
  return (
    <main className="bg-background h-[calc(100vh-4rem)]">
      <Suspense fallback={<div>Loading...</div>}>
        <CommentModeration
          commentsData={[
            {
              gh_comment_id: "2743606299",
              gh_repository_id: "918463959",
              gh_comment_sender_id: "76269418",
              gh_comment_sender_login: "meiazero",
              content:
                "Hello my nigga, do you would like be more white? like clean code...",
              event_type: "issue_comment",
              toxicity_score: 0.6588125,
              classification: "vulgarity",
              solutioned: false,
              suggestion_id: null,
              comment_html_url:
                "https://github.com/meiazero/blob/issues/13#issuecomment-2743606299",
              issue_id: "2923142048",
              created_at: "2025-03-21T14:54:14.000Z",
              parent: {
                comment_id: "2743606299",
                gh_parent_id: "2923142048",
                title: "Teste",
                html_url: "https://github.com/meiazero/blob/issues/13",
                is_open: "open",
                type: "issue",
                created_at: "2025-03-16T15:41:48.000Z",
              },
            },
            {
              gh_comment_id: "2743607468",
              gh_repository_id: "918463959",
              gh_comment_sender_id: "76269418",
              gh_comment_sender_login: "meiazero",
              content:
                "The fact you need to bitch and moan about someone not wanting to be treated like a fucking piece of garbage just confirms this community is fucking garbage.",
              event_type: "issue_comment",
              toxicity_score: 0.9288007,
              classification: "vulgarity",
              solutioned: false,
              suggestion_id: null,
              comment_html_url:
                "https://github.com/meiazero/blob/issues/13#issuecomment-2743607468",
              issue_id: "2923142048",
              created_at: "2025-03-21T14:54:28.000Z",
              parent: {
                comment_id: "2743607468",
                gh_parent_id: "2923142048",
                title: "Teste",
                html_url: "https://github.com/meiazero/blob/issues/13",
                is_open: "open",
                type: "issue",
                created_at: "2025-03-16T15:41:48.000Z",
              },
            },
          ]}
          suggestionsData={{
            suggestions: [
              {
                _id: "67dd7d55a3679ffefbce97ac",
                gh_comment_id: "2743606299",
                content:
                  "I'd appreciate it if you could rephrase your question in a more respectful and professional tone.",
                is_edited: false,
                created_at: "2025-03-21T14:53:09.975Z",
              },
              {
                _id: "67dd7d55a3679ffefbce97ad",
                gh_comment_id: "2743606299",
                content:
                  "Let's focus on discussing code quality and best practices, shall we?",
                is_edited: false,
                created_at: "2025-03-21T14:53:09.975Z",
              },
              {
                _id: "67dd7d55a3679ffefbce97ab",
                gh_comment_id: "2743606299",
                content:
                  "Hello, I think you're trying to suggest that I should focus on clean code, is that right?",
                is_edited: false,
                created_at: "2025-03-21T14:53:09.974Z",
              },
            ],
          }}
        />
      </Suspense>
    </main>
  );
}
