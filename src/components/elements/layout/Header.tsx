"use client";

import Link from "next/link";

import { useTheme } from "next-themes";

import {
  HeaderNav,
  HeaderRoot,
  HeaderSide,
} from "@/components/elements/common/Header";
// import { NavItem } from "@/components/elements/common/NavItem";
import { ThemeToggle } from "@/components/elements/common/ThemeToggle";
// import { PeaceMakeLogo } from "@/components/elements/svg/logo-v2";
import { Button } from "@/components/ui/button";

export function Header() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleCurrentTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <HeaderRoot>
      <HeaderNav>
        <HeaderSide className="gap-8">
          <Link href="/">
            <h1 className="text-2xl font-bold">PeaceMakerBot</h1>
            {/* <PeaceMakeLogo className="w-auto h-10" /> */}
          </Link>

          {/* <ul className="md:flex flex-row gap-4 hidden">
            {[
              {
                text: "Home",
                href: "/home",
                target: undefined,
              },
            ].map((link) => (
              <li key={link.href}>
                <NavItem key={link.href} href={link.href} target={link.target}>
                  {link.text}
                </NavItem>
              </li>
            ))}
          </ul> */}
        </HeaderSide>
        <HeaderSide>
          <ThemeToggle onClick={toggleCurrentTheme} />
          <Button asChild>
            <Link href="/auth/sign-in/github">Sign in</Link>
          </Button>
        </HeaderSide>
      </HeaderNav>
    </HeaderRoot>
  );
}
