import { AppHeader } from "@/components/elements/layout/AppHeader";
import { AppSidebar } from "@/components/elements/layout/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <AppHeader />
        {children}
      </main>
    </SidebarProvider>
  );
}
