import type React from "react";

import { AlertCircle, CheckCircle, Info } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface CalloutProps {
  icon?: string;
  title?: string;
  children?: React.ReactNode;
  type?: "default" | "warning" | "info" | "success";
}

const icons = {
  default: Info,
  info: Info,
  warning: AlertCircle,
  success: CheckCircle,
};

export function Callout({
  children,
  icon,
  title,
  type = "default",
  ...props
}: CalloutProps) {
  const IconComponent = icons[type];

  return (
    <Alert
      variant="default"
      className={cn({
        "border-blue-500 text-blue-500": type === "info",
        "border-yellow-500 text-yellow-500": type === "warning",
        "border-green-500 text-green-500": type === "success",
      })}
      {...props}
    >
      {IconComponent && <IconComponent className="h-4 w-4" />}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
