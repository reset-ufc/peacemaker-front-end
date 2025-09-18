// components/LLMSelectorModal.tsx
import { useEffect, useRef, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";

interface ModelInfo {
  name: string;
  provider: string;
  contextWindow?: number;
  maxCompletionTokens?: number;
}
interface ModelResponse {
  models: ModelInfo[];
}

export function LLMSelectorModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { t } = useTranslation();
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const requestInProgressRef = useRef(false);

  const fetchModels = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("access_token");
      const response = await api.get("/api/llms/models", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data as ModelResponse;
    },
    onSuccess: data => {
      setModels(data.models);
      requestInProgressRef.current = false;
    },
    onError: error => {
      console.error("Failed to fetch models, error: ", error);
      requestInProgressRef.current = false;
    },
  });

  const prefMutation = useMutation({
    mutationFn: async () => {
      const tokenJWT = localStorage.getItem("access_token");
      return api.patch(
        "/api/llms/preference",
        {
          llm_id: selectedModel,
          ...(models.find((m: ModelInfo) => m.name === selectedModel)
            ?.provider === "openai"
            ? { openai_api_key: token }
            : { groq_api_key: token }),
        },
        {
          headers: { Authorization: `Bearer ${tokenJWT}` },
        }
      );
    },
    onSuccess: () => {
      onOpenChange(false);
      setSelectedModel("");
      setToken("");
      setModels([]);

      toast.success(t("Preference saved successfully!"));
    },
    onError: err => {
      console.error("Erro ao salvar preferência:", err);
    },
  });

  useEffect(() => {
    if (open && !requestInProgressRef.current) {
      requestInProgressRef.current = true;
      fetchModels.mutate();
    }
  }, [open]);

  const handleSave = () => {
    prefMutation.mutate();
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/50' />
        <Dialog.Content
          className='
            bg-card text-card-foreground fixed
            top-1/2 left-1/2
            w-full max-w-md
            -translate-x-1/2 -translate-y-1/2
            rounded-lg p-6 shadow-lg
          '
        >
          <div className='mb-4 border-b pb-4'>
            <Dialog.Title className='text-lg font-semibold'>
              {t("Select LLM")}
            </Dialog.Title>
            <Dialog.Description className='text-muted-foreground text-sm'>
              {t("Choose the model and enter your token to use the LLM.")}
            </Dialog.Description>
          </div>

          <div className='space-y-4'>
            <div>
              <Label className='block text-sm font-medium'>{t("Model")}</Label>
              <Select
                value={selectedModel}
                onValueChange={setSelectedModel}
                // disabled={fetchModels.status === 'pending'}
              >
                <SelectTrigger className='mt-1 w-full'>
                  <SelectValue placeholder={t("Select a model")} />
                </SelectTrigger>
                <SelectContent>
                  {models.map(m => (
                    <SelectItem
                      key={m.name}
                      value={m.name}
                      disabled={[
                        "llama-guard-3-8b",
                        "gemma2-9b-it",
                        "llama-3.1-8b-instant",
                      ].includes(m.name)}
                    >
                      {m.name}{" "}
                      <span className='text-muted-foreground text-xs'>
                        ({m.provider})
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className='block text-sm font-medium'>{t("Token")}</Label>
              <Input
                placeholder={t("Your personal token")}
                value={token}
                onChange={e => setToken(e.target.value)}
                className='mt-1 w-full'
              />
            </div>
          </div>

          <div className='mt-4 flex justify-end border-t pt-4'>
            <Button
              onClick={handleSave}
              disabled={!selectedModel || prefMutation.status === "pending"}
            >
              {prefMutation.status === "pending" ? t("Saving...") : t("Save")}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
