"use client";

import type { Comment } from "@/services/comments/action";
import { useState } from "react";
import { IncivilityDetails } from "./components/IncivilityDetails";
import { IncivilityList } from "./components/IncivilityList";

export interface Incivility {
  id: string;
  repo_name: string;
  comment: string;
  classification_type: string;
  resolved: boolean;
  created_at: string;
  read: boolean;
}

export default function IncivilitiesPage() {
  const [incivility, setIncivility] = useState<Comment | null>(null);

  return (
    <section className="flex flex-row h-[calc(100vh-4rem)]">
      <IncivilityList setIncivility={setIncivility} />
      <IncivilityDetails incivility={incivility} />
    </section>
  );
}
