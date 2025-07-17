"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useState } from "react";

const Navbar = () => {
    const [isOpen, setisOpen] = useState(false);
    return (
        <header
            className="flex drop-shadow-xl shadow-blue-400/40 backdrop-blur-lg justify-between items-center px-10 py-2 h-14 md:sticky md:top-0 relative font-semibold z-50"
            role="navigation"
        >
            <Link
                href={"/"}
                className="left text-2xl md:text-3xl font-bold"
            >
                Hritujeet
            </Link>
            {/* Desktop Menu */}
            <nav className="right hidden md:block">
                <ul className="flex gap-6 justify-center items-center">
                    <li className="duration-150">
                        <Link href={"/"}>Home</Link>
                    </li>
                    <li className="duration-150">
                        <Link href={"/blogs"}>Blogs</Link>
                    </li>
                    <li className="duration-150">
                        <Link onClick={() => setisOpen(!open)} href={"/about"}>
                            About
                        </Link>
                    </li>
                    <li className="duration-150">
                        <Link href={"/contact"}>Contact</Link>
                    </li>
                    <li className="duration-150">
                        <Link
                            onClick={() => setisOpen(!open)}
                            href={"https://github.com/Hritujeet"}
                            className="px-4 py-2 translate-0 hover:translate-y-5 transition-all cursor-pointer rounded-md text-base shadow-md hover:drop-shadow-white duration-150"
                        >
                            Github
                        </Link>
                    </li>
                </ul>
            </nav>
            {/* Ham Burger */}
            <button
                className={`burger block md:hidden cursor-pointer py-1 px-2 rounded-md text-sm border border-blue-800/40 duration-150 z-50`}
                onClick={() => {
                    setisOpen(!isOpen);
                }}
            >
                {isOpen ? <X /> : <Menu />}
            </button>

            {/* Mobile Menu */}
            <div
                className={`right md:hidden ${
                    isOpen
                        ? "translate-0 overflow-hidden"
                        : "-translate-x-full overflow-y"
                } transition-all top-0 fixed left-0 bottom-0 w-screen h-screen`}
            >
                <ul className="flex flex-col gap-4 justify-center items-center h-full w-full">
                    <li className="duration-150">
                        <Link onClick={() => setisOpen(!open)} href={"/"}>
                            Home
                        </Link>
                    </li>
                    <li className="duration-150">
                        <Link onClick={() => setisOpen(!open)} href={"/blogs"}>
                            Blogs
                        </Link>
                    </li>
                    <li className="duration-150">
                        <Link onClick={() => setisOpen(!open)} href={"/about"}>
                            About
                        </Link>
                    </li>
                    <li className="duration-150">
                        <Link
                            onClick={() => setisOpen(!open)}
                            href={"/contact"}
                        >
                            Contact
                        </Link>
                    </li>
                    <li className="duration-150">
                        <Link
                            onClick={() => setisOpen(!open)}
                            href={"https://github.com/Hritujeet"}
                            className="px-4 py-2 translate-0 hover:translate-y-5 transition-all cursor-pointer rounded-md text-base shadow-md hover:drop-shadow-white duration-150"
                        >
                            Github
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
