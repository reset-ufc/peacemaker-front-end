import { cn } from "@/lib/utils";

export function HeaderNav({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <nav
      className={cn(
        "container mx-auto flex h-full items-center justify-between px-8",
        className
      )}
    >
      {children}
    </nav>
  );
}
