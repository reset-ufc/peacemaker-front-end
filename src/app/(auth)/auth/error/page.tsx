import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

/**
 * Force the page to be static and only change with a new build.
 *
 * read more about the Route Segment Config here:
 * https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
 */
export const dynamic = "force-static";

/**
 * Generate the metadata with dynamic information.
 *
 * Read more about the Dynamic Metadata here:
 * https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export function generateMetadata(): Metadata {
  return {
    title: "Acesso Negado",
  };
}

export default function Page() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Acesso Negado!
        </h1>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground ">
          Isso parece um erro que ocorreu enquanto você estava tentando
          autenticar.
        </p>
      </div>
      <Button asChild variant="outline" type="button">
        <Link href="/auth/sign-in">
          Tentar Novamente
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
