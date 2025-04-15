import { HTMLAttributeAnchorTarget } from "react";

import { LucideIcon, PanelLeftIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { HeaderNav, HeaderRoot, HeaderSide } from "@/components/base/Header";
import { NavItem } from "@/components/base/NavItem";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { UserProfile } from "@/components/layout/UserProfile";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleCurrentTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <HeaderRoot>
      <HeaderNav className='min-w-full'>
        <HeaderSide className='gap-8'>
          <ul className='hidden flex-row gap-4 sm:flex'>
            {[
              {
                text: "Home",
                href: "/",
                target: undefined,
              },
              {
                text: "Incivilities",
                href: "/incivilities",
                target: undefined,
              },
              {
                text: "Repositories",
                href: "/repositories",
                target: undefined,
              },
              {
                text: "Dashboard",
                href: "/dashboard",
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
                    className='flex flex-row'
                  >
                    {link.text}
                  </NavItem>
                </li>
              )
            )}
          </ul>

          <Button variant='ghost' size='icon' className='block sm:hidden'>
            <PanelLeftIcon className='size-6' />
          </Button>
        </HeaderSide>
        <HeaderSide>
          <ThemeToggle onClick={toggleCurrentTheme} />
          <UserProfile />
        </HeaderSide>
      </HeaderNav>
    </HeaderRoot>
  );
}
