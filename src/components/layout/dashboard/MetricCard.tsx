import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MetricCardProps {
  value: string | number;
  label: string;
  description?: string;
  icon?: ReactNode;
  variation?: number;
}

export function MetricCard({
  value,
  label,
  description,
  icon,
  variation,
}: MetricCardProps) {
  let variationColor = "";
  if (variation !== undefined) {
    variationColor = variation >= 0 ? "text-green-600" : "text-red-600";
  }

  return (
    <div className="border p-4 rounded shadow flex items-start gap-4">
      <div className="flex flex-col pl-2">
        <span className="text-muted-foreground text-sm">{label}</span>
        <span className="text-2xl font-bold">{value}</span>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
        {variation !== undefined && (
          <span className={cn("text-xs font-medium", variationColor)}>
            {variation >= 0 ? `+${variation}` : `${variation}`}
          </span>
        )}
      </div>
      {icon && (
        <div className="w-full p-2 bg-inherit flex items-end justify-end">
          {icon}
        </div>
      )}
    </div>
  );
}
