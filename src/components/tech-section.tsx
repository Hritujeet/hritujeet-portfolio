"use client"
import img from "@/img/CodeSnippet.png";
import { ArrowUpRight, Code2, Database, Layers3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "motion/react";

const stack = ["Next.js", "React", "TypeScript", "Tailwind", "Prisma", "Node.js"];

const revealVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
};

const staggerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

const strengths = [
    {
        icon: Code2,
        title: "Frontend craft",
        copy: "Responsive interfaces with clean UX and performance-first thinking.",
    },
    {
        icon: Layers3,
        title: "Product thinking",
        copy: "Turning rough ideas into clear, scalable, user-focused experiences.",
    },
    {
        icon: Database,
        title: "Reliable systems",
        copy: "Data-backed builds with thoughtful architecture and maintainable code.",
    },
];

type TechSectionProps = {
    contactHref?: string;
};

const TechSection = ({ contactHref = "#contact" }: TechSectionProps) => {
    return (
        <motion.section
            aria-labelledby="tech-heading"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerVariants}
            className="rounded-2xl border border-border bg-card p-5 sm:rounded-3xl sm:p-8 lg:p-12"
        >
            <motion.div variants={staggerVariants} className="grid items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14">
                {/* Copy: first on mobile, right column on desktop */}
                <motion.div variants={revealVariants} className="order-1 space-y-6 lg:order-2 lg:col-span-7">
                    <motion.div variants={staggerVariants} className="space-y-3 sm:space-y-4">
                        <motion.h2
                            variants={revealVariants}
                            id="tech-heading"
                            className="text-balance text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem] xl:text-[2.75rem]"
                        >
                            Building software that ships.
                        </motion.h2>
                        <motion.p
                            variants={revealVariants}
                            className="max-w-prose text-pretty text-[15px] leading-7 text-muted-foreground sm:text-base"
                        >
                            I turn ideas into polished products, with thoughtful design, clean
                            architecture and practical engineering behind them.
                        </motion.p>
                    </motion.div>

                    <motion.ul variants={staggerVariants} className="divide-y divide-border border-y border-border">
                        {strengths.map(({ icon: Icon, title, copy }) => (
                            <motion.li
                                key={title}
                                variants={revealVariants}
                                className="flex gap-3.5 py-4 sm:gap-4"
                            >
                                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Icon className="h-4 w-4" aria-hidden="true" />
                                </span>
                                <div className="min-w-0">
                                    <h3 className="text-sm font-medium text-foreground">{title}</h3>
                                    <p className="mt-0.5 text-sm leading-6 text-muted-foreground">
                                        {copy}
                                    </p>
                                </div>
                            </motion.li>
                        ))}
                    </motion.ul>

                    <motion.ul
                        variants={staggerVariants}
                        aria-label="Tech stack"
                        className="flex flex-wrap gap-2"
                    >
                        {stack.map((item) => (
                            <motion.li
                                key={item}
                                variants={revealVariants}
                                className="rounded-full border border-border bg-background px-3 py-1 text-[13px] text-foreground/80 hover:border-primary/40 hover:text-foreground motion-safe:transition-colors"
                            >
                                {item}
                            </motion.li>
                        ))}
                    </motion.ul>

                    <motion.div variants={revealVariants}>
                        <Link
                            href={contactHref}
                            className="group inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                            Let&apos;s build something meaningful
                            <ArrowUpRight
                                className="h-4 w-4 text-primary motion-safe:transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                                aria-hidden="true"
                            />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Window: below copy on mobile, left column on desktop */}
                <motion.div variants={revealVariants} className="order-2 lg:order-1 lg:col-span-5">
                    <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
                        <div className="flex items-center gap-1.5 border-b border-border px-3 py-2.5">
                            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
                            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-yellow-400/90" />
                            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-green-500/90" />
                            <span className="ml-auto text-xs text-muted-foreground">
                                Build, test, ship
                            </span>
                        </div>
                        <Image
                            src={img}
                            alt="Code editor window showing a code snippet"
                            placeholder="blur"
                            sizes="(min-width: 1024px) 40vw, 100vw"
                            className="aspect-[4/3] w-full object-cover object-top"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default TechSection;