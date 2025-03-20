import { DocsSidebar } from "@/components/layout/mdx/docs-sidebar";
import { SearchProvider } from "@/components/layout/mdx/search-provider";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SearchProvider>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <DocsSidebar />

          <div className="ml-[200px] flex flex-1 flex-col">
            {" "}
            <div className="mt-10 flex-1">
              <main className="p-6">{children}</main>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </SearchProvider>
  );
}
