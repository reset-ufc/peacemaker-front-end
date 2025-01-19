import type { HTMLAttributeAnchorTarget, PropsWithChildren } from "react";

import { ArrowUpRightIcon } from "lucide-react";

import { ActiveLink } from "@/components/elements/common/ActiveLink";
import { cn } from "@/lib/utils";

type NavItemProps = {
  href: string;
  type?: "nav" | "footer" | ({} & string);
  className?: string;
  target?: HTMLAttributeAnchorTarget | undefined;
};

export function NavItem({
  href = "",
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
          "flex items-center gap-2 rounded-md px-4 py-2 data-[current=true]:bg-muted",
      )}
      activeClassName="active"
      target={target}
    >
      <span className="text-sm">{children}</span>

      {target === "_blank" && <ArrowUpRightIcon className="size-4" />}
    </ActiveLink>
  );
}
