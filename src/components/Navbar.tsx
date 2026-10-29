"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/blogs", label: "Writing" },
  { href: "/projects", label: "Projects" },
  { href: "/devlogs", label: "Devlogs" },
  { href: "/about", label: "About" },
  { href: "/josephine", label: "Josephine" },
];

const isActivePath = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

const Navbar = ({ isAdmin }: { isAdmin: boolean }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const sheetLinkClass = (active: boolean) =>
    cn(
      "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
      active ? "bg-accent text-foreground" : "text-foreground/60"
    );

  return (
    <div className="sticky top-0 z-30 w-full border-b bg-background">
      <div className="container flex h-14 items-center px-4 md:px-8 mx-auto">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold tracking-tight">Hritujeet</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end md:justify-between space-x-2 md:space-x-4">
          {/* Desktop links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {NAV_LINKS.map(({ href, label }) => {
              const active = isActivePath(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    active ? "text-foreground" : "text-foreground/60"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center space-x-2">
            <SignedIn>
              {isAdmin && (
                <Link
                  href="/dashboard"
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  Admin
                </Link>
              )}
              <SignOutButton redirectUrl="/sign-in">
                <div
                  className={`${buttonVariants({ variant: "destructive", size: "sm" })} cursor-pointer`}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </div>
              </SignOutButton>
            </SignedIn>
            <SignedOut>
              <Link
                href="/sign-in"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Sign In
              </Link>
              <Link href="/sign-up" className={buttonVariants({ size: "sm" })}>
                Sign Up
              </Link>
            </SignedOut>
          </div>

          {/* Mobile sheet */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                className={buttonVariants({ variant: "outline", size: "icon" })}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </SheetTrigger>

              <SheetContent side="right" className="w-64">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                <nav className="mt-4 flex flex-col gap-1 px-2">
                  {NAV_LINKS.map(({ href, label }) => {
                    const active = isActivePath(pathname, href);
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={close}
                        aria-current={active ? "page" : undefined}
                        className={sheetLinkClass(active)}
                      >
                        {label}
                      </Link>
                    );
                  })}

                  <div className="my-2 border-t" />

                  <SignedIn>
                    {isAdmin && (
                      <Link
                        href="/dashboard"
                        onClick={close}
                        className={sheetLinkClass(
                          isActivePath(pathname, "/dashboard")
                        )}
                      >
                        Admin
                      </Link>
                    )}
                    <SignOutButton redirectUrl="/sign-in">
                      <button
                        onClick={close}
                        className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-accent"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </button>
                    </SignOutButton>
                  </SignedIn>

                  <SignedOut>
                    <Link
                      href="/sign-in"
                      onClick={close}
                      className={sheetLinkClass(pathname === "/sign-in")}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={close}
                      className={sheetLinkClass(pathname === "/sign-up")}
                    >
                      Sign Up
                    </Link>
                  </SignedOut>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;