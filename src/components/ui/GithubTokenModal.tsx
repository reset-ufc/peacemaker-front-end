// components/ui/GitHubTokenModal.tsx
import { useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";

// components/ui/GitHubTokenModal.tsx

export function GitHubTokenModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useTranslation();
  const [token, setToken] = useState("");
  const mutation = useMutation({
    mutationFn: async (newToken: string) => {
      const jwt = localStorage.getItem("access_token");
      return api.patch(
        "/api/users/github-token",
        { github_token: newToken },
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
    },
    onSuccess: () => {
      toast.success(t("GitHub token saved successfully!"));
      setToken("");
      onOpenChange(false);
    },
    onError: () => {
      toast.error(t("Failed to save token. Try again."));
    },
  });

  const handleSave = () => {
    if (!token.trim()) {
      toast.error(t("Enter a valid token"));
      return;
    }
    mutation.mutate(token);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 ' />
        <Dialog.Content
          className='
            bg-card text-card-foreground fixed
            top-1/2 left-1/2
            w-full max-w-sm
            -translate-x-1/2 -translate-y-1/2
            rounded-lg p-6 shadow-lg
          '
        >
          <div className='mb-4 border-b pb-4'>
            <Dialog.Title className='text-lg font-semibold'>
              {t("GitHub Personal Token")}
            </Dialog.Title>
            <Dialog.Description className='text-muted-foreground text-sm'>
              {t("Enter a GitHub personal access token (with comments scope).")}
            </Dialog.Description>
          </div>

          <div className='space-y-4'>
            <div>
              <Label
                htmlFor='github-token'
                className='block text-sm font-medium'
              >
                {t("Token")}
              </Label>
              <Input
                id='github-token'
                type='password'
                placeholder='ghp_********************************'
                value={token}
                onChange={e => setToken(e.target.value)}
                className='mt-1 w-full'
              />
            </div>
          </div>

          <div className='mt-4 flex justify-end border-t pt-4'>
            <Button
              onClick={handleSave}
              disabled={mutation.isPending}
              variant='default'
            >
              {mutation.isPending ? t("Saving...") : t("Save")}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
