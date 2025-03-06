import { cn } from "@/lib/utils";

export function HeaderRoot({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "border/40 bg-background/95 h-16 w-full border-b",
        className
      )}
    >
      {children}
    </header>
  );
}
