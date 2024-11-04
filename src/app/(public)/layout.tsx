import { Header } from "@/components/elements/layout/Header";

export default function PublicLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
