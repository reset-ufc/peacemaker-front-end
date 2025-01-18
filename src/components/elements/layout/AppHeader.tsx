"use client";

import React from "react";

import { useTheme } from "next-themes";

import {
  HeaderNav,
  HeaderRoot,
  HeaderSide,
} from "@/components/elements/common/Header";
// import { NavItem } from "@/components/elements/common/NavItem";
import { ThemeToggle } from "@/components/elements/common/ThemeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppHeader() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleCurrentTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <HeaderRoot>
      <HeaderNav className="min-w-full">
        <HeaderSide className="gap-8">
          <SidebarTrigger />

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
        </HeaderSide>
      </HeaderNav>
    </HeaderRoot>
  );
}
