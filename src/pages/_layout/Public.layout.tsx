import { Outlet } from "react-router-dom";

import CookieBanner from "@/components/layout/CookiesBanner";
import { Header } from "@/components/layout/Header";

export function PublicLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <CookieBanner />
    </>
  );
}
