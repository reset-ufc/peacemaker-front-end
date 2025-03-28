import { useEffect, useState } from "react";

import { AxiosResponse } from "axios";

import { CommentModeration } from "@/components/layout/incivilities/CommentModeration";
import { api } from "@/lib/api";
import { Comment } from "@/types";

export function IncivilitiesPage() {
  const [data, setData] = useState<Array<Comment>>([]);

  const t = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchData = async () => {
      const request: AxiosResponse<{ comments: Array<Comment> }> =
        await api.get("/api/comments?with_parent=true", {
          headers: {
            Authorization: `Bearer ${t}`,
          },
        });

      const data = request.data.comments;
      setData(data);
    };

    fetchData();
  }, [t]);

  return (
    <main className="bg-background h-[calc(100vh-4rem)]">
      <CommentModeration commentsData={data} />
    </main>
  );
}
