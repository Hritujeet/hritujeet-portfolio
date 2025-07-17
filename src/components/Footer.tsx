import React from "react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="py-10 mt-20 cursor-default">
            <div className="w-[90vw] max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand & Description */}
                <div>
                    <span className="text-2xl font-bold mb-2">Hritujeet</span>
                    <p className="text-sm">Developer. Creator. Explorer.</p>
                </div>

                {/* Navigation Links */}
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                    <ul className="text-sm space-y-2">
                        <li>
                            <Link
                                href="/"
                                className="duration-150"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/blogs"
                                className="duration-150"
                            >
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                className="duration-150"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className="duration-150"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Social Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Connect</h3>
                    <div className="flex gap-4 items-center">
                        <Link
                            href="https://github.com/Hritujeet"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-sm border px-2 py-1 duration-150 rounded-md"
                        >
                            Github
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/hritujeet-sharma-797ba7281/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-sm border px-3 py-1 duration-150 rounded-md"
                        >
                            LinkedIn
                        </Link>
                        <Link
                            href="https://x.com/HritujeetS93526"
                            className="font-medium text-sm border px-3 py-1 duration-150 rounded-md"
                        >
                            Twitter
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom line */}
            <div className="border-t mt-10 pt-4 text-center text-sm md:w-[80vw] mx-auto">
                © {new Date().getFullYear()} Hritujeet Sharma. All rights
                reserved.
            </div>
        </footer>
    );
};

export default Footer;
