import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export function ThresholdSelectorModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { t } = useTranslation();
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
      toast.success(t("Threshold updated successfully!"));
    },
    onError: (err) => {
      console.error("Erro ao salvar threshold:", err);
      toast.error(t("Error saving threshold"));
    },
  });

  const handleSave = () => {
    const numThreshold = parseFloat(threshold);
    if (isNaN(numThreshold) || numThreshold < 0.4 ||numThreshold > 1.0) {
      toast.error(t("The threshold must be between 0.4 and 1.0"));
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
              {t("Configure Threshold")}
            </Dialog.Title>
            <Dialog.Description className="text-sm text-muted-foreground">
              {t("Set the confidence level for system responses.")}
            </Dialog.Description>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="block text-sm font-medium">{t("Threshold")}</Label>
              <Input
                type="number"
                min="0.4"
                max="1.0"
                step="0.1"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                className="w-full mt-1"
                placeholder={t("Enter a value between 0.4 and 1.0")}
              />
            </div>

            <div className="text-sm text-muted-foreground space-y-2">
            <p>
              <span className="font-medium">{t("Low threshold (e.g.: 0.4):")}</span>{" "}
              {t("The system will be more permissive, flagging more comments as \"uncivilized\" and triggering suggestions. This increases coverage (fewer false negatives), but you'll have more false positives — relatively harmless comments may receive unnecessary suggestions.")}
            </p>
            <p>
              <span className="font-medium">{t("Medium threshold (e.g.: 0.6):")}</span>{" "}
              {t("Default balanced value between sensitivity and precision. Most clearly toxic comments will be detected, without overloading the flow with suggestions in doubtful cases.")}
            </p>
            <p>
              <span className="font-medium">{t("High threshold (e.g.: 0.8–1.0):")}</span>{" "}
              {t("The system requires high confidence to classify \"incivility\". This reduces false positives (only truly problematic content is flagged), but may miss moderately toxic comments (false negatives).")}
            </p>
            </div>
          </div>

          <div className="border-t pt-4 mt-4 flex justify-end">
            <Button
              onClick={handleSave}
              disabled={prefMutation.status === "pending"}
            >
              {prefMutation.status === "pending" ? t("Saving...") : t("Save")}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
