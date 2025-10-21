import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
    const user = await currentUser();
    return (
        <div className="navbar bg-base-100/80 shadow-sm px-6 sticky top-0 z-30 backdrop-blur-lg">
            <div className="navbar-start">
                <Link href={"/"} className="text-2xl font-bold tracking-tight">
                    Hritujeet
                </Link>
            </div>
            <div className="navbar-end hidden sm:flex">
                <ul className="flex justify-center items-center gap-4 lg:gap-6">
                    <li className="hover:text-accent duration-150">
                        <Link href={"/blogs"}>Blogs</Link>
                    </li>
                    <li className="hover:text-accent duration-150">
                        <Link href={"/projects"}>Projects</Link>
                    </li>
                    <li className="hover:text-accent duration-150">
                        <Link href={"/about"}>Profile</Link>
                    </li>
                    <SignedIn>
                        {user?.emailAddresses[0].emailAddress ==
                            process.env.ADMIN && (
                            <>
                                <li>
                                    <Link
                                        href={"/dashboard"}
                                        className="btn btn-accent btn-sm md:btn-md"
                                    >
                                        Admin
                                    </Link>
                                </li>
                                <li>
                                    <SignOutButton redirectUrl="/sign-in">
                                        <span className="btn btn-error w-full justify-start">
                                            <LogOut className="h-5 w-5 mr-2" />
                                            Sign Out
                                        </span>
                                    </SignOutButton>
                                </li>
                            </>
                        )}
                    </SignedIn>
                    <SignedOut>
                        <li>
                            <Link
                                href={"/sign-in"}
                                className="btn btn-accent btn-sm md:btn-md"
                            >
                                Sign In
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={"/sign-up"}
                                className="btn btn-accent btn-soft btn-sm md:btn-md"
                            >
                                Sign Up
                            </Link>
                        </li>
                    </SignedOut>
                </ul>
            </div>
            <div className="navbar-end sm:hidden">
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {" "}
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7"
                            />{" "}
                        </svg>
                    </div>
                    <ul className="menu dropdown-content bg-accent rounded-box z-1 mt-3 w-52 p-2 shadow-lg gap-2">
                        <li className="text-black hover:text-slate-900 duration-150">
                            <Link href={"/blogs"}>Blogs</Link>
                        </li>
                        <li className="text-black hover:text-slate-900 duration-150">
                            <Link href={"/projects"}>Projects</Link>
                        </li>
                        <li className="text-black hover:text-slate-900 duration-150">
                            <Link href={"/about"}>Profile</Link>
                        </li>
                        <SignedIn>
                            {user?.emailAddresses[0].emailAddress ==
                                process.env.ADMIN && (
                                <>
                                    <li>
                                        <Link
                                            href={"/dashboard"}
                                            className="btn btn-accent btn-sm md:btn-md"
                                        >
                                            Admin
                                        </Link>
                                    </li>
                                    <li>
                                        <SignOutButton redirectUrl="/sign-in">
                                            <span className="btn btn-error w-full justify-start">
                                                <LogOut className="h-5 w-5 mr-2" />
                                                Sign Out
                                            </span>
                                        </SignOutButton>
                                    </li>
                                </>
                            )}
                        </SignedIn>
                        <SignedOut>
                            <li>
                                <Link
                                    href={"/sign-in"}
                                    className="btn btn-accent btn-soft btn-sm md:btn-md"
                                >
                                    Sign In
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/sign-up"}
                                    className="btn btn-accent btn-soft btn-sm md:btn-md"
                                >
                                    Sign Up
                                </Link>
                            </li>
                        </SignedOut>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
