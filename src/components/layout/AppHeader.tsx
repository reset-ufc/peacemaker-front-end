"use client";

import { HTMLAttributeAnchorTarget } from "react";

import { LucideIcon, PanelLeftIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { NavItem } from "@/components/base/NavItem";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

import { HeaderNav, HeaderRoot, HeaderSide } from "../base/Header";
import { Button } from "../ui/button";

export function AppHeader() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleCurrentTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <HeaderRoot>
      <HeaderNav className="min-w-full">
        <HeaderSide className="gap-8">
          <ul className="hidden flex-row gap-4 sm:flex">
            {[
              {
                text: "Incivilities",
                href: "/incivilities",
                target: undefined,
              },
              {
                text: "Incivilities V2",
                href: "/incivilities-v2",
                target: undefined,
              },
              {
                text: "Incivilities V3",
                href: "/incivilities-v3",
                target: undefined,
              },
              {
                text: "Repositories",
                href: "/repositories",
                target: undefined,
              },
            ].map(
              (link: {
                icon?: LucideIcon;
                text: string;
                href: string;
                target?: HTMLAttributeAnchorTarget | undefined;
              }) => (
                <li key={link.href}>
                  <NavItem
                    key={link.href}
                    href={link.href}
                    icon={link.icon}
                    target={link.target}
                    className="flex flex-row"
                  >
                    {link.text}
                  </NavItem>
                </li>
              )
            )}
          </ul>

          <Button variant="ghost" size="icon" className="block sm:hidden">
            <PanelLeftIcon className="size-6" />
          </Button>
        </HeaderSide>
        <HeaderSide>
          <ThemeToggle onClick={toggleCurrentTheme} />
        </HeaderSide>
      </HeaderNav>
    </HeaderRoot>
  );
}
