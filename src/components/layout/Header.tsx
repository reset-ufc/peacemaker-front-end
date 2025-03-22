import { ArrowUpRightIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";

import { HeaderNav, HeaderRoot, HeaderSide } from "@/components/base/Header";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";

export function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const hasAuthCookie = localStorage.getItem("access_token") ?? false;

  const toggleCurrentTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <HeaderRoot>
      <HeaderNav>
        <HeaderSide className="gap-8">
          <Link to="/">
            <h1 className="text-xl font-bold">PeaceMakerBot</h1>
          </Link>
        </HeaderSide>

        <HeaderSide>
          {hasAuthCookie && (
            <Button asChild variant="outline">
              <Link to="/incivilities">
                Go to incivilities page
                <ArrowUpRightIcon className="ml-2 size-4" />
              </Link>
            </Button>
          )}
          <ThemeToggle onClick={toggleCurrentTheme} />
          <Button asChild>
            <Link to="/auth/sign-in/github">Sign in</Link>
          </Button>
        </HeaderSide>
      </HeaderNav>
    </HeaderRoot>
  );
}
