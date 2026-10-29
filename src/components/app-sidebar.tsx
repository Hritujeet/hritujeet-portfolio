"use client"

import * as React from "react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { BookOpenIcon, CommandIcon, FolderIcon, LayoutDashboardIcon, ListIcon, NotebookPenIcon, PlusIcon } from "lucide-react"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Manage blogs",
      url: "/dashboard/manageBlogs",
      icon: <BookOpenIcon />,
    },
    {
      title: "Manage projects",
      url: "/dashboard/manageProjects",
      icon: <FolderIcon />,
    },
    {
      title: "Manage devlogs",
      url: "/dashboard/manageDevlogs",
      icon: <NotebookPenIcon />,
    },
  ],
  documents: [
    {
      name: "Add blog",
      url: "/dashboard/addBlog",
      icon: <PlusIcon />,
    },
    {
      name: "Add project",
      url: "/dashboard/addProject",
      icon: <PlusIcon />,
    },
    {
      name: "Add devlog",
      url: "/dashboard/addDevlog",
      icon: <PlusIcon />,
    },
  ],
}
export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: { name: string; email: string; avatar?: string };
}) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="data-[slot=sidebar-menu-button]:p-1.5!" render={<a href="/dashboard" />}>
              <CommandIcon className="size-5!" />
              <span className="text-base font-semibold">Hritujeet</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary
          items={[{ title: "View site", url: "/", icon: <FolderIcon /> }]}
          className="mt-auto"
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
