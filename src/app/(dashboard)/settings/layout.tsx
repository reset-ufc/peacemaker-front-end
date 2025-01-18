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

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full flex-1 p-4">
      <aside className="w-72 border-r border-border">
        <nav className="flex flex-col gap-4 px-8 pt-4">
          <Link href="/settings">Settings</Link>
          <Link href="/settings/profile">Profile</Link>
        </nav>
      </aside>
      <section className="flex-1 p-4">{children}</section>
    </div>
  );
}
