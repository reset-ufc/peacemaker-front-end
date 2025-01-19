"use client";

import { useTheme } from "next-themes";

import {
  HeaderNav,
  HeaderRoot,
  HeaderSide,
} from "@/components/elements/common/Header";
import { NavItem } from "@/components/elements/common/NavItem";
import { ThemeToggle } from "@/components/elements/common/ThemeToggle";

import { NavUser } from "./NavUser";

export function AppHeader() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleCurrentTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <HeaderRoot>
      <HeaderNav className="min-w-full">
        <HeaderSide className="gap-8">
          <ul className="hidden flex-row gap-4 md:flex">
            {[
              {
                text: "Incivilities",
                href: "/app/incivilities",
                target: undefined,
              },
              {
                text: "Repositories",
                href: "/app/repositories",
                target: undefined,
              },
            ].map(link => (
              <li key={link.href}>
                <NavItem key={link.href} href={link.href} target={link.target}>
                  {link.text}
                </NavItem>
              </li>
            ))}
          </ul>
        </HeaderSide>
        <HeaderSide>
          <ThemeToggle onClick={toggleCurrentTheme} />
          <NavUser />
        </HeaderSide>
      </HeaderNav>
    </HeaderRoot>
  );
}
