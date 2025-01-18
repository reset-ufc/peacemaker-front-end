import { Suspense } from "react";

import { GithubCallbackInner } from "./components/GithubCallbackInner";

export default function GithubCallbackPage() {
  return (
    <Suspense>
      <GithubCallbackInner />
    </Suspense>
  );
}
