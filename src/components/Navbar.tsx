"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";

const Navbar = () => {
    const [isOpen, setisOpen] = useState(false);
    return (
        <header
            className="flex drop-shadow-xl shadow-blue-400/40 backdrop-blur-lg justify-between items-center px-10 py-2 h-16 bg-transparent md:sticky md:top-0 text-gray-300 relative font-semibold z-50"
            role="navigation"
        >
            <Link href={"/"} className="left text-2xl md:text-3xl text-gray-300 font-bold">
                Hritujeet
            </Link>
            {/* Desktop Menu */}
            <nav className="right hidden md:block">
                <ul className="flex gap-6 justify-center items-center">
                    <li className="hover:text-blue-500 text-gray-300 duration-150">
                        <Link href={"/"}>Home</Link>
                    </li>
                    <li className="hover:text-blue-500 text-gray-300 duration-150">
                        <Link href={"/blogs"}>Blogs</Link>
                    </li>
                    <li className="hover:text-blue-500 text-gray-300 duration-150">
                        <Link onClick={() => setisOpen(!open)} href={"/about"}>
                            About
                        </Link>
                    </li>
                    <li className="hover:text-blue-500 text-gray-300 duration-150">
                        <Link href={"/contact"}>Contact</Link>
                    </li>
                    <li className="duration-150">
                        <Link
                            onClick={() => setisOpen(!open)}
                            href={"https://github.com/Hritujeet"}
                            className="bg-gray-400 px-4 py-2 translate-0 hover:translate-y-5 transition-all cursor-pointer rounded-md text-base shadow-md hover:drop-shadow-white text-black hover:bg-gray-200 duration-150"
                        >
                            Github
                        </Link>
                    </li>
                </ul>
            </nav>
            {/* Ham Burger */}
            <button
                className="burger block md:hidden cursor-pointer py-1 px-3 rounded-md text-sm border border-blue-800/40 hover:bg-blue-800/60 duration-150 z-50"
                onClick={() => {
                    setisOpen(!isOpen);
                }}
            >
                Menu
            </button>

            {/* Mobile Menu */}
            <div
                className={`right md:hidden ${
                    isOpen ? "translate-0 overflow-hidden" : "-translate-x-full overflow-y"
                } transition-all block absolute top-0 left-0 w-screen h-screen bg-gray-950`}
            >
                <ul className="flex flex-col gap-4 justify-center items-center h-full w-full">
                    <li className="mb-6">
                        <button
                            className="burger cursor-pointer py-1 px-3 rounded-md text-sm border border-blue-800/40 hover:bg-blue-800/60 hover:border-blue-800 duration-150"
                            onClick={() => {
                                setisOpen(!isOpen);
                            }}
                        >
                            Close
                        </button>
                    </li>
                    <li className="hover:text-gray-300 duration-150">
                        <Link onClick={() => setisOpen(!open)} href={"/"}>
                            Home
                        </Link>
                    </li>
                    <li className="hover:text-gray-300 duration-150">
                        <Link onClick={() => setisOpen(!open)} href={"/blogs"}>
                            Blogs
                        </Link>
                    </li>
                    <li className="hover:text-gray-300 duration-150">
                        <Link onClick={() => setisOpen(!open)} href={"/about"}>
                            About
                        </Link>
                    </li>
                    <li className="hover:text-gray-300 duration-150">
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
                            className="bg-gray-400 px-4 py-2 translate-0 hover:translate-y-5 transition-all cursor-pointer rounded-md text-base shadow-md hover:drop-shadow-white text-black hover:bg-gray-200 duration-150"
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
