import type { HTMLAttributeAnchorTarget, PropsWithChildren } from "react";

import { ArrowUpRightIcon, LucideIcon } from "lucide-react";

import { ActiveLink } from "@/components/base/ActiveLink";
import { cn } from "@/lib/utils";

type NavItemProps = {
  href: string;
  type?: "nav" | "footer" | ({} & string);
  icon?: LucideIcon | undefined;
  className?: string;
  target?: HTMLAttributeAnchorTarget | undefined;
};

export function NavItem({
  href = "",
  icon: Icon,
  children,
  type = "nav",
  className,
  target,
}: PropsWithChildren<NavItemProps>) {
  return (
    <ActiveLink
      href={href}
      className={cn(
        "hover:bg-muted hover:text-foreground",
        className,
        type === "nav" &&
          "data-[current=true]:bg-muted flex items-center gap-2 rounded-md px-4 py-2"
      )}
      target={target}
    >
      <span className="text-sm">{children}</span>

      {target === "_blank" && <ArrowUpRightIcon className="size-4" />}
      {Icon && target !== "_blank" ? <Icon className="size-4" /> : null}
    </ActiveLink>
  );
}
