"use client";

import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";

const CTA = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full rounded-[2.5rem] border bg-gradient-to-b from-muted/50 to-muted/20 p-8 md:p-16 my-16 flex flex-col items-center text-center overflow-hidden relative shadow-sm"
        >
            <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,transparent,black)] pointer-events-none" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 z-10">
                Let's build something together.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-8 z-10 leading-relaxed">
                I'm currently open for new opportunities. Whether you have a project in mind, need a developer for your team, or just want to say hi, my inbox is always open.
            </p>
            <div className="flex gap-4 z-10">
                <Link href="/contact" className={`${buttonVariants({ variant: "default", size: "lg" })} rounded-full px-8 h-14 text-base group flex items-center shadow-md`}>
                    Send a message 
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </motion.div>
    );
};

export default CTA;
