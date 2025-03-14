import Link from "next/link";
import type React from "react";

import { cn } from "@/lib/utils";

export const CustomLink = ({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) => {
  // Automatically determine if the link is external based on the href value
  const isExternalLink = href.startsWith("http");

  if (isExternalLink) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("font-semibold hover:underline", className)}
      >
        {children}
      </a>
    );
  }

  // For internal links, use Next.js' `Link` component
  return (
    <Link href={href} className="font-semibold hover:underline">
      {children}
    </Link>
  );
};
