"use client";
import React, { FC, useEffect } from "react";

import { useAuth } from "@/context/AuthContext";
import { useScroll } from "@/lib/hooks";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "../ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChevronRight,
  Command,
  Frame,
  GalleryVerticalEnd,
  Globe,
  icons,
  LayoutDashboard,
  Menu,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { MdDashboard } from "react-icons/md";
import Link from "next/link";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Site Items",
      url: "#",
      icon: Globe,
      isActive: true,
      items: [
        {
          title: "Novels",
          url: "/admin/novel",
        },
        {
          title: "Slides",
          url: "/admin/slides",
        },
        {
          title: "Blogs",
          url: "/admin/blogs",
        },
        {
          title: "News",
          url: "/admin/news",
        },
      ],
    },
  ],
};

const AdminSidebar: FC = () => {
  const { isLoading, user } = useAuth();
  const path = usePathname();
  return (
    <Sidebar>
      <SidebarHeader>
        {isLoading ? (
          <Skeleton className="w-full h-5" />
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <Avatar>
                    <AvatarImage src={user?.photoURL || "/logo.jpg"} />
                    <AvatarFallback>
                      {user?.displayName?.split(" ")[0][0]}
                      {user?.displayName?.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">{user?.displayName}</span>
                    <span className="text-muted-foreground truncate">{user?.email}</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) =>
              item.items ? (
                <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto group-data-[state=open]/collapsible:rotate-90 transition-transform duration-200" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuButton key={item.url} tooltip={item.title} asChild>
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              )
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarRail />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
