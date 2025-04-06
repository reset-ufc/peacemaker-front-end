import { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import { AppHeader } from "@/components/layout/AppHeader";
import { useAuth } from "@/hooks/user-auth";

export function AppLayout() {
  const { isAuthenticated } = useAuth();
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
