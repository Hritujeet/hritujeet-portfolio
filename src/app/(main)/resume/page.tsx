"use client";

import { Download, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";

const ResumePage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans py-16">
            <div className="container mx-auto px-6 sm:px-12 max-w-5xl">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6"
                >
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Resume.</h1>
                        <p className="text-muted-foreground text-base">My professional experience and academic background.</p>
                    </div>
                    
                    <div className="flex gap-4">
                        <a 
                            href="/Professional%20Profile.pdf" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={buttonVariants({ variant: "outline" })}
                        >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Open in New Tab
                        </a>
                        <a 
                            href="/Professional%20Profile.pdf" 
                            download="Hritujeet_Sharma_Resume.pdf" 
                            className={buttonVariants({ variant: "default" })}
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                        </a>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="h-[75vh] w-full overflow-hidden rounded-lg border bg-card"
                >
                    <iframe 
                        src="/Professional%20Profile.pdf#toolbar=0" 
                        className="w-full h-full border-0"
                        title="Hritujeet Sharma Resume"
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default ResumePage;
