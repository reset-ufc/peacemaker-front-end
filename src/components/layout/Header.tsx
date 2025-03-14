"use client";

import Link from "next/link";
import { HTMLAttributeAnchorTarget } from "react";

import { useTheme } from "next-themes";

import { HeaderNav, HeaderRoot, HeaderSide } from "@/components/base/Header";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";

import { NavItem } from "../base/NavItem";

export function Header() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleCurrentTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <HeaderRoot>
      <HeaderNav>
        <HeaderSide className="gap-8">
          <Link href="/">
            <h1 className="text-xl font-bold">PeaceMakerBot</h1>
          </Link>
          <ul className="hidden flex-row gap-4 sm:flex">
            {[
              {
                text: "Documentation",
                href: "/docs",
                target: undefined,
              },
            ].map(
              (link: {
                text: string;
                href: string;
                target?: HTMLAttributeAnchorTarget | undefined;
              }) => (
                <li key={link.href}>
                  <NavItem
                    key={link.href}
                    href={link.href}
                    target={link.target}
                    className="flex flex-row"
                  >
                    {link.text}
                  </NavItem>
                </li>
              )
            )}
          </ul>
        </HeaderSide>

        <HeaderSide>
          <ThemeToggle onClick={toggleCurrentTheme} />
          <Button asChild>
            <Link href="/sign-in/github">Sign in</Link>
          </Button>
        </HeaderSide>
      </HeaderNav>
    </HeaderRoot>
  );
}
