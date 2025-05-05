import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export function ThresholdSelectorModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [threshold, setThreshold] = useState<string>("0.6");

  const prefMutation = useMutation({
    mutationFn: async (threshold: number) => {
      const token = localStorage.getItem("access_token");
      return api.patch(
        "/api/users/edit-threshold",
        {
          threshold: threshold,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: () => {
      onOpenChange(false);
      setThreshold("0.6");
      toast.success("Threshold atualizado com sucesso!");
    },
    onError: (err) => {
      console.error("Erro ao salvar threshold:", err);
      toast.error("Erro ao salvar threshold");
    },
  });

  const handleSave = () => {
    const numThreshold = parseFloat(threshold);
    if (isNaN(numThreshold) || numThreshold < 0.4 ||numThreshold > 1.0) {
      toast.error("O threshold deve estar entre 0.4 e 1.0");
      return;
    }
    onOpenChange(false);
    prefMutation.mutate(numThreshold);
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
              Configurar Threshold
            </Dialog.Title>
            <Dialog.Description className="text-sm text-muted-foreground">
              Defina o nível de confiança para as respostas do sistema.
            </Dialog.Description>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="block text-sm font-medium">Threshold</Label>
              <Input
                type="number"
                min="0.4"
                max="1.0"
                step="0.1"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                className="w-full mt-1"
                placeholder="Digite um valor entre 0.4 e 1.0"
              />
            </div>

            <div className="text-sm text-muted-foreground space-y-2">
            <p>
              <span className="font-medium">Threshold baixo (ex: 0.4):</span>{" "}
              O sistema será mais permissivo, sinalizando mais comentários como “incivilizados” e disparando sugestões.
              Isso aumenta a cobertura (menos falsos negativos), mas você terá mais falsos positivos —
              comentários relativamente inofensivos podem receber sugestões desnecessárias.
            </p>
            <p>
              <span className="font-medium">Threshold médio (ex: 0.6):</span>{" "}
              Valor padrão equilibrado entre sensibilidade e precisão.
              A maioria dos comentários claramente tóxicos será detectada, sem sobrecarregar o fluxo com sugestões em
              casos duvidosos.
            </p>
            <p>
              <span className="font-medium">Threshold alto (ex: 0.8–1.0):</span>{" "}
              O sistema exige alta confiança para classificar “incivilidade”.
              Isso reduz falsos positivos (apenas o conteúdo realmente problemático é sinalizado),
              mas pode deixar passar comentários moderadamente tóxicos (falsos negativos).
            </p>
            </div>
          </div>

          <div className="border-t pt-4 mt-4 flex justify-end">
            <Button
              onClick={handleSave}
              disabled={prefMutation.status === "pending"}
            >
              {prefMutation.status === "pending" ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
