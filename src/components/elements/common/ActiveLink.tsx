"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type ActiveLocalizedLinkProps = ComponentProps<typeof Link> & {
  activeClassname?: "desactive" | "active" | ({} & string);
  allowSubPath?: boolean;
};

export function ActiveLink({
  children,
  allowSubPath = false,
  className,
  href = "",
  ...props
}: ActiveLocalizedLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      {...props}
      className={cn(className)}
      prefetch={false}
      data-current={
        allowSubPath
          ? // When using allowSubPath we want only to check if
            // the current pathname starts with the utmost upper level
            // of an href (e.g. /docs/...)
            pathname.startsWith(`/${href.toString().split("/")[1]}`)
          : href.toString() === pathname
      }
    >
      {children}
    </Link>
  );
}
