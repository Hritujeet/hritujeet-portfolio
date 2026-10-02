"use client";

import Link from "next/link";
import { ArrowUpRight, Atom, Code2, Layers3, Terminal } from "lucide-react";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.12 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
};

const HomeAbout = () => (
    <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="mb-16 mt-12"
        aria-label="A little about me"
    >
        <div className="mb-6 flex items-end justify-between gap-4">
            <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    A little about me
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    Curious by nature. Builder by practice.
                </h2>
            </div>
            <Link
                href="/about"
                className="hidden shrink-0 items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
                More about me <ArrowUpRight className="size-4" />
            </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <motion.div
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-colors hover:bg-accent/30 sm:p-7 md:col-span-2"
            >
                <div className="mb-8 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Code2 className="size-5" />
                </div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                    From first program to full-stack
                </p>
                <p className="max-w-lg text-base leading-relaxed text-foreground">
                    I started with Python in Class 6. Five years on, I build
                    full-stack products and enjoy taking ideas from first sketch
                    to deployment.
                </p>
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="relative overflow-hidden rounded-2xl border border-border/70 bg-muted/40 p-6 transition-colors hover:bg-muted/70 sm:p-7 md:col-span-2"
            >
                <div className="mb-8 flex size-10 items-center justify-center rounded-xl bg-background text-foreground shadow-sm">
                    <Atom className="size-5" />
                </div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                    Beyond software
                </p>
                <p className="max-w-lg text-base leading-relaxed text-foreground">
                    Physics is the curiosity that keeps pulling me deeper—with a
                    long-term goal of exploring quantum mechanics and computing.
                </p>
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="relative self-start overflow-hidden rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition-colors hover:bg-accent/20 sm:p-5 col-span-full"
            >
                <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Terminal className="size-4" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-foreground">
                                Tools I build with
                            </p>
                            <p className="text-xs text-muted-foreground">
                                My everyday stack
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:justify-end">
                        {["React", "Next.js", "Node.js", "Python", "PostgreSQL"].map(
                            (tool, index) => (
                                <span
                                    key={tool}
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-background/80 px-2.5 py-1.5 text-xs font-medium text-foreground/85 transition-colors hover:border-primary/30 hover:bg-primary/5"
                                >
                                    <span className="text-[10px] font-semibold tabular-nums text-muted-foreground/70">
                                        0{index + 1}
                                    </span>
                                    {tool}
                                </span>
                            )
                        )}
                    </div>
                </div>
            </motion.div>
        </div>

        <Link
            href="/about"
            className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:hidden"
        >
            More about me <ArrowUpRight className="size-4" />
        </Link>
    </motion.section>
);

export default HomeAbout;
