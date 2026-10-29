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
            className="my-16 flex w-full flex-col items-center overflow-hidden rounded-lg border bg-muted/30 p-8 text-center md:p-16"
        >
            <h2 className="z-10 mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                Have a thought to share?
            </h2>
            <p className="z-10 mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                If something here sparked an idea, raised a question, or just made you want to say hello, I&apos;d be glad to hear from you.
            </p>
            <div className="flex gap-4 z-10">
                <Link href="/contact" className={`${buttonVariants({ variant: "default", size: "lg" })} px-8 text-base`}>
                    Send a message 
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </motion.div>
    );
};

export default CTA;
