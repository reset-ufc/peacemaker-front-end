"use client";

import { SubmitButton } from "@/components/elements/common/SubmitButton";
import { useNotification } from "@/hooks/use-notification";
import { api } from "@/lib/api";
import { REPOSITORIES_LOADER_ROUTE } from "@/lib/routes";
import { useState } from "react";

export function ButtonLoadRepositories() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { notifySuccess, notifyError } = useNotification();

  async function handleLoadRepositories() {
    setIsLoading(true);

    try {
      await api.get(REPOSITORIES_LOADER_ROUTE());

      notifySuccess(
        "Repositories loaded successfully!",
        "Reload the page to see the changes.",
      );
    } catch (error) {
      notifyError("Error loading repositories!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SubmitButton onClick={handleLoadRepositories} isSubmitting={isLoading}>
      Load Repositories
    </SubmitButton>
  );
}
