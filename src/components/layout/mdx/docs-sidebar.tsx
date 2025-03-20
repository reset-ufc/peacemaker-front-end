"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SearchDialog } from "@/components/layout/mdx/search-dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { docsConfig } from "@/config/docs";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="mt-[80px]">
      {" "}
      {/* Adicionando margin-top para a sidebar */}
      <SidebarHeader className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <SearchDialog />
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        {docsConfig.sidebarNav.map((item, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((subItem, subIndex) => (
                  <SidebarMenuItem key={subIndex}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === subItem.href}
                    >
                      <Link href={subItem.href}>
                        <span>{subItem.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between p-4">
          <Link
            href="https://github.com/yourusername/docs"
            target="_blank"
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            <span>GitHub</span>
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
