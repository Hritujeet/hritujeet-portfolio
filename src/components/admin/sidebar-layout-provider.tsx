"use client";
import Link from "next/link";
import { Menu, LogOut, Globe, Plus, X, List, LayoutList } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";

// Dummy link data (replace hrefs with your actual routes)
const mainLinks = [
    { href: "/dashboard/addBlog", label: "Add Blog", icon: Plus },
    { href: "/dashboard/addProject", label: "Add Project", icon: Plus },
    { href: "/dashboard/manageBlogs", label: "Manage Blogs", icon: List },
    { href: "/dashboard/manageProjects", label: "Manage Projects", icon: LayoutList },
];

const bottomLinks = [{ href: "/", label: "Go to Site", icon: Globe }];

const SidebarContent = () => (
    <div className="flex h-full flex-col bg-muted/10 w-full">
        {/* Title Section */}
        <div className="p-6 border-b">
            <Link href={"/dashboard"} className="text-xl font-bold tracking-tight">
                Admin Dashboard
            </Link>
        </div>

        {/* Main Navigation Menu */}
        <div className="flex-1 overflow-auto py-6">
            <nav className="grid gap-2 px-4">
                {mainLinks.map((item) => (
                    <Link key={item.href} className={`${buttonVariants({ variant: "ghost" })} justify-start text-muted-foreground hover:text-foreground`} href={item.href}>
                        <item.icon className="mr-3 h-5 w-5" />
                        <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>
        </div>

        {/* Bottom Section: Go to Site & Sign Out */}
        <div className="p-4 border-t grid gap-3">
            {bottomLinks.map((item) => (
                <Link key={item.href} className={`${buttonVariants({ variant: "outline" })} justify-start text-muted-foreground hover:text-foreground`} href={item.href}>
                    <item.icon className="mr-3 h-5 w-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                </Link>
            ))}

            <SignOutButton redirectUrl="/sign-in">
                <div className={`${buttonVariants({ variant: "destructive" })} justify-start cursor-pointer w-full`}>
                    <LogOut className="mr-3 h-5 w-5" />
                    <span className="text-sm font-medium">Sign Out</span>
                </div>
            </SignOutButton>
        </div>
    </div>
);

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr] bg-background">
            <aside className="hidden border-r bg-muted/10 md:block">
                <SidebarContent />
            </aside>
            <div className="flex flex-col flex-1 w-full overflow-hidden">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/10 px-4 lg:h-[60px] lg:px-6 md:hidden">
                    <Sheet>
                        <SheetTrigger className={`${buttonVariants({ variant: "outline" })} cursor-pointer size-10 shrink-0 md:hidden`}>
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-72">
                            <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
                            <SidebarContent />
                        </SheetContent>
                    </Sheet>
                    <Link href="/dashboard" className="font-semibold tracking-tight text-lg">
                        Dashboard
                    </Link>
                </header>
                <main className="flex-1 p-4 md:p-8 w-full overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
