import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

const Navbar = async () => {
    const user = await currentUser();
    return (
        <div className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center px-4 md:px-8 mx-auto">
                <div className="mr-4 flex">
                    <Link href={"/"} className="mr-6 flex items-center space-x-2">
                        <span className="font-bold tracking-tight">Hritujeet</span>
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-end md:justify-between space-x-2 md:space-x-4">
                    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                        <Link href={"/blogs"} className="transition-colors hover:text-foreground/80 text-foreground/60">Blogs</Link>
                        <Link href={"/projects"} className="transition-colors hover:text-foreground/80 text-foreground/60">Projects</Link>
                        <Link href={"/about"} className="transition-colors hover:text-foreground/80 text-foreground/60">Profile</Link>
                    </nav>

                    <div className="hidden md:flex items-center space-x-2">
                        <SignedIn>
                            {user?.emailAddresses[0].emailAddress == process.env.ADMIN && (
                                <Link href={"/dashboard"} className={buttonVariants({ variant: "outline", size: "sm" })}>
                                    Admin
                                </Link>
                            )}
                            <SignOutButton redirectUrl="/sign-in">
                                <div className={`${buttonVariants({ variant: "destructive", size: "sm" })} cursor-pointer`}>
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Sign Out
                                </div>
                            </SignOutButton>
                        </SignedIn>
                        <SignedOut>
                            <Link href={"/sign-in"} className={buttonVariants({ variant: "outline", size: "sm" })}>
                                Sign In
                            </Link>
                            <Link href={"/sign-up"} className={buttonVariants({ size: "sm" })}>
                                Sign Up
                            </Link>
                        </SignedOut>
                    </div>

                    <div className="md:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger className={buttonVariants({ variant: "outline" })}>
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuItem>
                                    <Link href={"/blogs"} className="w-full">Blogs</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={"/projects"} className="w-full">Projects</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={"/about"} className="w-full">Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <SignedIn>
                                    {user?.emailAddresses[0].emailAddress == process.env.ADMIN && (
                                        <DropdownMenuItem>
                                            <Link href={"/dashboard"} className="w-full">Admin</Link>
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem>
                                        <SignOutButton redirectUrl="/sign-in">
                                            <div className="flex items-center w-full text-destructive cursor-pointer">
                                                <LogOut className="h-4 w-4 mr-2" />
                                                Sign Out
                                            </div>
                                        </SignOutButton>
                                    </DropdownMenuItem>
                                </SignedIn>
                                <SignedOut>
                                    <DropdownMenuItem>
                                        <Link href={"/sign-in"} className="w-full">Sign In</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href={"/sign-up"} className="w-full">Sign Up</Link>
                                    </DropdownMenuItem>
                                </SignedOut>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
