import { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import { AppHeader } from "@/components/layout/AppHeader";
import { useAuthentication } from "@/hooks/use-authentication";

export function AppLayout() {
  const { isAuthenticated } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/sign-in/github");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
}
