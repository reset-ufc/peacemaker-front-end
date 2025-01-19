import { AppHeader } from "@/components/elements/layout/AppHeader";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <main className="w-full">
        <AppHeader />
        {children}
      </main>
    </SidebarProvider>
  );
}
