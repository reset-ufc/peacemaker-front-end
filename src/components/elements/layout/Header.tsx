"use client";

import {
  HeaderNav,
  HeaderRoot,
  HeaderSide,
} from "@/components/elements/common/Header";
// import { NavItem } from "@/components/elements/common/NavItem";
import { ThemeToggle } from "@/components/elements/common/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";

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
            <Link href="/auth/sign-in">Sign in</Link>
          </Button>
        </HeaderSide>
      </HeaderNav>
    </HeaderRoot>
  );
}
