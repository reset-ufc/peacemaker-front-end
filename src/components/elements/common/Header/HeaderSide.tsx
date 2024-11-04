import { cn } from "@/lib/utils";

export function HeaderSide({
  children,
  className,
}: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-row gap-2 items-center", className)}>
      {children}
    </div>
  );
}
