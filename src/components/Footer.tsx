import React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

const Footer = () => {
    return (
        <footer className="py-12 mt-20 border-t bg-background">
            <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <span className="text-2xl font-bold tracking-tight mb-2 block">
                        Hritujeet
                    </span>
                    <p className="text-sm text-muted-foreground">Developer. Creator. Explorer.</p>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground/80">Quick Links</h3>
                    <ul className="text-sm space-y-3">
                        <li>
                            <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">Home</Link>
                        </li>
                        <li>
                            <Link href="/blogs" className="text-muted-foreground transition-colors hover:text-foreground">Blogs</Link>
                        </li>
                        <li>
                            <Link href="/projects" className="text-muted-foreground transition-colors hover:text-foreground">Projects</Link>
                        </li>
                        <li>
                            <Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">About</Link>
                        </li>
                        <li>
                            <Link href="/contact" className="text-muted-foreground transition-colors hover:text-foreground">Contact</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground/80 mb-4">Connect</h3>
                    <div className="flex flex-wrap gap-2">

                        <Link className={buttonVariants({ variant: "outline" })} href="https://github.com/Hritujeet" target="_blank" rel="noopener noreferrer">
                            Github
                        </Link>

                        <Link className={buttonVariants({ variant: "outline" })} href="https://www.linkedin.com/in/hritujeet-sharma-797ba7281/" target="_blank" rel="noopener noreferrer">
                            LinkedIn
                        </Link>

                        <Link className={buttonVariants({ variant: "outline" })} href="https://x.com/HritujeetS93526">
                            Twitter
                        </Link>

                    </div>
                </div>
            </div>

            <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground container mx-auto">
                © {new Date().getFullYear()} Hritujeet Sharma. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
