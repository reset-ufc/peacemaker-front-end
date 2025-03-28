import { ArrowUpRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-y-8">
      <section className="container flex flex-col justify-center space-y-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tighter text-pretty md:text-7xl">
          404 - Page not found
        </h1>
        <p className="text-muted-foreground mx-auto max-w-sm text-lg text-pretty md:text-xl">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>

        <Link
          to="/"
          className="border-muted-foreground mx-auto flex w-fit flex-row items-center gap-2 rounded-md border px-4 py-2"
        >
          Go back home
          <ArrowUpRightIcon className="size-4" />
        </Link>
      </section>
    </main>
  );
}
