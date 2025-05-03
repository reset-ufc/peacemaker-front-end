// components/LLMSelectorModal.tsx
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
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";


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
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const fetchModels = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("access_token");
      const response = await api.get("/api/llms/models", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data as { models: ModelResponse };
    },
    onSuccess: (data) => {
      setModels(data.models.models);
    },
    onError: (error) => {
      console.error("Failed to fetch models, error: ", error);
    },
  });

  const prefMutation = useMutation({
    mutationFn: async () => {
      const tokenJWT = localStorage.getItem("access_token");
      return api.patch(
        "/api/llms/preference",
        {
          llm_id: selectedModel,
          ...(models.find((m: ModelInfo) => m.name === selectedModel)?.provider === "openai"
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

      toast.success("Preferência salva com sucesso!");
    },
    onError: (err) => {
      console.error("Erro ao salvar preferência:", err);
    },
  });

  useEffect(() => {
    if (open) {
      fetchModels.mutate();
    }
  }, [fetchModels, open]);

  const handleSave = () => {
    prefMutation.mutate();
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content
          className="
            fixed top-1/2 left-1/2
            w-full max-w-md
            -translate-x-1/2 -translate-y-1/2
            bg-card text-card-foreground
            rounded-lg shadow-lg p-6
          "
        >
          <div className="border-b pb-4 mb-4">
            <Dialog.Title className="text-lg font-semibold">
              Selecionar LLM
            </Dialog.Title>
            <Dialog.Description className="text-sm text-muted-foreground">
              Escolha o modelo e insira seu token para usar a LLM.
            </Dialog.Description>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="block text-sm font-medium">Modelo</Label>
                <Select
                value={selectedModel}
                onValueChange={setSelectedModel}
                disabled={fetchModels.status === 'pending'}
                >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Selecione um modelo" />
                </SelectTrigger>
                <SelectContent>
                  {models.map((m) => (
                    <SelectItem
                    key={m.name}
                    value={m.name}
                    disabled={["llama-guard-3-8b", "gemma2-9b-it", "llama-3.1-8b-instant"].includes(m.name)}
                    >
                    {m.name}{" "}
                    <span className="text-xs text-muted-foreground">
                    ({m.provider})
                    </span>
                    </SelectItem>
                  ))}
                </SelectContent>
                </Select>
            </div>

            <div>
              <Label className="block text-sm font-medium">Token</Label>
              <Input
                placeholder="Seu token pessoal"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full mt-1"
              />
            </div>
          </div>

          <div className="border-t pt-4 mt-4 flex justify-end">
            <Button
              onClick={handleSave}
              disabled={!selectedModel || prefMutation.status === "pending"}
            >
              {prefMutation.status === "pending" ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
