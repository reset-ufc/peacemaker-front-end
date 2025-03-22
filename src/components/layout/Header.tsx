"use client";

import Link from "next/link";

import { ArrowUpRightIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { HeaderNav, HeaderRoot, HeaderSide } from "@/components/base/Header";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";

export function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const isClient = typeof window !== "undefined";
  const hasAuthCookie = isClient
    ? window.document.cookie.includes("access_token")
    : false;

  const toggleCurrentTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <HeaderRoot>
      <HeaderNav>
        <HeaderSide className="gap-8">
          <Link href="/">
            <h1 className="text-xl font-bold">PeaceMakerBot</h1>
          </Link>
        </HeaderSide>

        <HeaderSide>
          {hasAuthCookie && (
            <Button asChild variant="outline">
              <Link href="/incivilities-v3">
                Go to incivilities page
                <ArrowUpRightIcon className="ml-2 size-4" />
              </Link>
            </Button>
          )}
          <ThemeToggle onClick={toggleCurrentTheme} />
          <Button asChild>
            <Link href="/sign-in/github">Sign in</Link>
          </Button>
        </HeaderSide>
      </HeaderNav>
    </HeaderRoot>
  );
}
