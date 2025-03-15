import Link from "next/link";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import type { Doc } from "@/lib/mdx";

interface DocsPagerProps {
  doc: Doc;
}

export function DocsPager({ doc }: DocsPagerProps) {
  const { prev, next } = doc;

  return (
    <div className="flex flex-row items-center justify-between px-4 md:px-8">
      {prev ? (
        <Link
          href={prev.href}
          className={buttonVariants({ variant: "outline" })}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          {prev.title}
        </Link>
      ) : (
        <div />
      )}
      {next && (
        <Link
          href={next.href}
          className={buttonVariants({ variant: "outline" })}
        >
          {next.title}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
