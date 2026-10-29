"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

// Dummy link data (replace hrefs with your actual routes)
export default function AdminLayout({
    children,
    user,
}: {
    children: React.ReactNode;
    user: { name: string; email: string; avatar?: string };
}) {
    return (
        <SidebarProvider>
            <AppSidebar user={user} variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <main className="flex flex-1 flex-col p-4 md:p-6">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    );
}
