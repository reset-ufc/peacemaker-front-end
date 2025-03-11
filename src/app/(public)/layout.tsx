import CookieBanner from "@/components/layout/CookiesBanner";
import { Header } from "@/components/layout/Header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <CookieBanner />
    </>
  );
}
