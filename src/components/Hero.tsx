"use client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

const Hero = () => {
    return (
        <div className="relative w-full overflow-hidden rounded-3xl mt-6 sm:mt-12 mb-16 border bg-muted/10 shadow-sm">
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Modern sleek background"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                    className="object-cover opacity-20 dark:opacity-30 mix-blend-overlay"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-background/20" />
            </div>

            <div className="relative z-10 py-16 sm:py-24 space-y-6 flex flex-col justify-center items-center min-h-[50vh] max-w-4xl mx-auto text-center px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/50 backdrop-blur-md text-xs sm:text-sm font-medium text-foreground shadow-sm"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Available for opportunities
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground"
                >
                    Hi, I'm Hritujeet. <br />
                    <span className="text-muted-foreground font-medium tracking-tight">Full-Stack Engineer.</span>
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed"
                >
                    I build fast, accessible, and scalable digital experiences. With a focus on React, Node.js, and modern web architecture, I craft minimal and highly performant solutions.
                </motion.p>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-wrap gap-4 pt-4 justify-center"
                >
                    <Link href="/projects" className={`${buttonVariants({ variant: "default" })} rounded-full px-6`}>View Work</Link>
                    <Link href="/contact" className={`${buttonVariants({ variant: "outline" })} rounded-full px-6 bg-background/50 backdrop-blur-sm`}>Get in touch</Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
