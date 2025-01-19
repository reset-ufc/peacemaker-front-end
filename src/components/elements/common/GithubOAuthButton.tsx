"use client";

import { LoaderCircle } from "lucide-react";

import { GitHubIcon } from "@/components/elements/svg/Github";
import { Button } from "@/components/ui/button";
import { githubAuthService } from "@/services/auth";

export function GithubOAuthButton() {
  const { url, isLoading } = githubAuthService();
  const handleLoginToGithub = async () => {
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <>
      <Button onClick={handleLoginToGithub} disabled={isLoading}>
        <GitHubIcon />
        {isLoading ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          "Login with Github"
        )}
      </Button>
    </>
  );
}
