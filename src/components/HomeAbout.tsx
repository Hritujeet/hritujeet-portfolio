"use client";

import React from "react";
import { Server, Layout, Rocket } from "lucide-react";
import { motion, Variants } from "framer-motion";

const HomeAbout = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-16"
        >
            <motion.div variants={itemVariants} className="p-6 sm:p-8 rounded-2xl border bg-card hover:bg-accent/50 transition-colors duration-300 shadow-sm flex flex-col items-start group">
                <div className="p-3 bg-primary/10 rounded-2xl mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                    <Server className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold tracking-tight text-foreground mb-3">Backend Systems</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    Designing robust APIs and scalable architectures. I focus on security, performance, and clean code principles to ensure reliable infrastructure.
                </p>
            </motion.div>

            <motion.div variants={itemVariants} className="p-6 sm:p-8 rounded-2xl border bg-card hover:bg-accent/50 transition-colors duration-300 shadow-sm flex flex-col items-start group">
                <div className="p-3 bg-primary/10 rounded-2xl mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                    <Layout className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold tracking-tight text-foreground mb-3">Frontend Interfaces</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    Building pixel-perfect, accessible, and responsive interfaces. I turn complex requirements into intuitive and engaging digital experiences.
                </p>
            </motion.div>

            <motion.div variants={itemVariants} className="p-6 sm:p-8 rounded-2xl border bg-card hover:bg-accent/50 transition-colors duration-300 shadow-sm flex flex-col items-start group">
                <div className="p-3 bg-primary/10 rounded-2xl mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                    <Rocket className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold tracking-tight text-foreground mb-3">Product Strategy</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    From ideation to deployment, I think critically about the product lifecycle, aiming to deliver solutions that solve real problems efficiently.
                </p>
            </motion.div>
        </motion.div>
    );
};

export default HomeAbout;
