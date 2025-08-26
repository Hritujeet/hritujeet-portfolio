import Link from "next/link";
import React from "react";

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm px-6">
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
                    <li>
                        <Link
                            href={"https://github.com/Hritujeet"}
                            className="btn btn-soft btn-accent btn-sm md:btn-md"
                        >
                            Github
                        </Link>
                    </li>
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
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-lg border border-t-transparent dark:border-white/5 gap-2">
                        <li>
                            <Link href={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link href={"/blogs"}>Blogs</Link>
                        </li>
                        <li>
                            <Link href={"/about"}>About</Link>
                        </li>
                        <li>
                            <Link href={"/contact"}>Contact</Link>
                        </li>
                        <li>
                            <Link
                                href={"https://github.com/Hritujeet"}
                                className="btn btn-soft btn-accent"
                            >
                                Github
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
