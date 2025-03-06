import { AppHeader } from "@/components/layout/AppHeader";

export default function IncivilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}
