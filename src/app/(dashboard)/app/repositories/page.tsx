import type { Metadata } from "next";
import { RepositoriesTable } from "./components/repositories-table";

/**
 * Generate the metadata with dynamic information.
 *
 * Read more about the Dynamic Metadata here:
 * https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export function generateMetadata(): Metadata {
  return {
    title: "Repositories",
  };
}

export default function Page() {
  return <RepositoriesTable />;
}
