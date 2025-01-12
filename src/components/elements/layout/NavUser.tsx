"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { userService } from "@/services/user";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";

export function NavUser() {
  const { user } = userService();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border border-primary"
            >
              <img
                src={user?.profile?.avatar_url}
                alt={user?.profile?.name}
                className="size-8 rounded-md"
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                {user?.profile?.name ? (
                  <span className="truncate font-semibold">
                    {user?.profile?.name}
                  </span>
                ) : (
                  <span className="bg-muted py-2 animate-pulse" />
                )}
                {user?.profile?.email ? (
                  <span className="truncate text-xs">
                    {user?.profile?.email}
                  </span>
                ) : (
                  <span className="truncate text-xs">No e-mail provided</span>
                )}
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-md"
            side="top"
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOutIcon className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
