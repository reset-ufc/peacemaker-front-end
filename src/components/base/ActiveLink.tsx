import type { ComponentProps } from "react";

import { Link, useLocation } from "react-router-dom";

import { cn } from "@/lib/utils";

type ActiveLocalizedLinkProps = ComponentProps<typeof Link> & {
  activeClassname?: "desactive" | "active" | ({} & string);
  allowSubPath?: boolean;
};

export function ActiveLink({
  children,
  allowSubPath = false,
  className,
  to = "",
  ...props
}: ActiveLocalizedLinkProps) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Link
      to={to}
      {...props}
      className={cn(className)}
      data-current={
        allowSubPath
          ? pathname.startsWith(`/${to.toString().split("/")[1]}`)
          : to.toString() === pathname
      }
    >
      {children}
    </Link>
  );
}
