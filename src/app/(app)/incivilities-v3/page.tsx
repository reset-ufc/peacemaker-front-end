import { cookies } from "next/headers";
import { Suspense } from "react";

import { AxiosResponse } from "axios";

import { CommentModeration } from "@/components/layout/incivilities-v3/CommentModeration";
import { api } from "@/lib/api";
import { Comment } from "@/types";

export default async function IncivilitiesPage() {
  const c = await cookies();

  const t = c.get("access_token")?.value;

  const request: AxiosResponse<{ comments: Array<Comment> }> = await api.get(
    "/api/comments?with_parent=true",
    {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    }
  );

  const data = request.data;

  return (
    <main className="bg-background h-[calc(100vh-4rem)]">
      <Suspense fallback={<div>Loading...</div>}>
        <CommentModeration commentsData={data.comments} />
      </Suspense>
    </main>
  );
}
