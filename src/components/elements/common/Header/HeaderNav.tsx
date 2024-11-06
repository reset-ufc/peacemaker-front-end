import { cn } from "@/lib/utils";

export function HeaderNav({
  children,
  className,
}: { children: React.ReactNode; className?: string }) {
  return (
    <nav
      className={cn(
        "container h-full flex items-center justify-between",
        className,
      )}
    >
      {children}
    </nav>
  );
}
