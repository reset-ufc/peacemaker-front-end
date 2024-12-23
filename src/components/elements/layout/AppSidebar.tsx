import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  BarChart3Icon,
  CircleAlertIcon,
  FolderGit2Icon,
  Home,
} from "lucide-react";
import Link from "next/link";
import { NavUser } from "./NavUser";

const user = {
  name: "Emanuel Avila",
  email: "avilaemanueel@gmail.com",
  avatar: "https://avatars.githubusercontent.com/u/76269418?v=4",
};

// Sample data for the sidebar
const sidebarmenu = {
  navMain: [
    {
      title: "Home",
      url: "/app",
      icon: Home,
      items: [
        {
          title: "Dashboard",
          icon: BarChart3Icon,
          url: "/app",
        },
        {
          title: "Repositories",
          icon: FolderGit2Icon,
          url: "/app/repositories",
        },
        {
          title: "Incivilities",
          icon: CircleAlertIcon,
          url: "/app/incivilities",
        },
      ],
    },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      {/* <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <LineChartIcon className="size-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">ModerateHub</span>
                <span className="text-xs text-muted-foreground">
                  Moderation Dashboard
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader> */}
      <SidebarContent>
        {sidebarmenu.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link href={item.url}>
                        {item.icon && <item.icon className="mr-2 size-4" />}
                        {item.title}
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
        <NavUser data={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
