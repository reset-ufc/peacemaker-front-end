import { Loader2Icon } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SubmitButton({
  children,
  isSubmitting,
  ...props
}: {
  children?: React.ReactNode;
  isSubmitting: boolean;
} & ButtonProps) {
  return (
    <Button disabled={isSubmitting} {...props} className="group relative">
      <span className={cn({ "opacity-0": isSubmitting })}>{children}</span>
      {isSubmitting && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader2Icon className="size-5 animate-spin" />
        </span>
      )}
    </Button>
  );
}
