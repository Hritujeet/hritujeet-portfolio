"use client";

import { BookOpen, Code, Layers, Download, FileText } from "lucide-react";
import CTA from "@/components/CTA";
import { motion } from "framer-motion";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const AboutPage = () => {
    const skills = [
        { name: "JavaScript / TypeScript", level: 90 },
        { name: "React / Next.js", level: 90 },
        { name: "Node.js (MERN / PERN)", level: 85 },
        { name: "Python", level: 95 },
        { name: "MongoDB & PostgreSQL", level: 85 },
        { name: "C++", level: 75 },
    ];

    const stats = [
        { icon: Code, title: "Experience", content: "5 Years of Programming" },
        { icon: Layers, title: "Expertise", content: "MERN & PERN Stacks" },
        { icon: BookOpen, title: "Goal", content: "Quantum Mechanics & Computing" },
    ];

    const fadeInUp = {
        initial: { opacity: 0, y: 20, filter: "blur(10px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <div className="container mx-auto px-6 sm:px-12 md:px-16 lg:px-20 py-16">
                {/* Header */}
                <motion.div 
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                    className="max-w-3xl mb-16"
                >
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        About Me.
                    </h1>
                    <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                        I began my journey with Python in Class 6, and over the past five years, I've grown from a curious hobbyist into a Full-Stack Developer. I aspire to study physics at the highest level while continuing to build impactful technology.
                    </p>
                </motion.div>

                {/* Story Section */}
                <motion.div 
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="grid lg:grid-cols-3 gap-8 items-start mb-24"
                >
                    <motion.div variants={fadeInUp} className="lg:col-span-2 text-muted-foreground max-w-none text-base space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold tracking-tight text-foreground mb-3">Technical Background</h2>
                            <p className="leading-relaxed mb-4">
                                I have primarily worked with the Next.js, MERN, and PERN stacks, building projects that showcase my understanding of complex systems. From leading the end-to-end development of a digital product catalogue at Garg Pharma, to architecting B2B SaaS workflows as CTO of Unifiée, and re-designing responsive portals as an Intern at IIT Guwahati, I've gained practical, hands-on experience in full-stack architecture.
                            </p>
                        </div>
                        
                        <div>
                            <h2 className="text-xl font-semibold tracking-tight text-foreground mb-3">Beyond Code</h2>
                            <p className="leading-relaxed mb-4">
                                Over time, I've realized that what truly excites me isn't just building software, but understanding the universe itself. Physics has become the subject I naturally gravitate toward. 
                            </p>
                            <p className="leading-relaxed mb-4">
                                The frustration of wrestling with a difficult mechanics or electromagnetism problem is strangely enjoyable because every solution feels like uncovering another piece of reality. That curiosity has led me to pursue physics alongside computer science.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold tracking-tight text-foreground mb-3">My Goal</h2>
                            <p className="leading-relaxed">
                                Physics comes more naturally to me despite the experience I have in the world of programming. My long-term goal is to learn and specialize in quantum mechanics, merging my knowledge of software engineering with my love for physics to contribute meaningfully to the frontier field of quantum computing.
                            </p>
                        </div>
                        
                        <div className="pt-2 flex flex-wrap gap-4">
                            <Link href="/resume" className={buttonVariants({ variant: "outline" })}>
                                <FileText className="w-4 h-4 mr-2" />
                                View Resume
                            </Link>
                            <a href="/Professional%20Profile.pdf" download="Hritujeet_Sharma_Resume.pdf" className={buttonVariants({ variant: "default" })} aria-label="Download Resume PDF">
                                <Download className="w-4 h-4 mr-2" />
                                Download Resume
                            </a>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="space-y-4">
                        {stats.map((stat, index) => (
                            <div key={index} className="p-6 rounded-2xl border bg-card flex items-start gap-4 hover:shadow-sm transition-shadow">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm text-foreground">{stat.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{stat.content}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Skills Section */}
                <motion.div 
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="mb-24"
                >
                    <motion.h2 variants={fadeInUp} className="text-xl font-semibold tracking-tight text-foreground mb-8">Technical Proficiency</motion.h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <motion.div variants={fadeInUp}>
                            <h3 className="text-base font-medium mb-6 text-foreground">Languages & Tools</h3>
                            <div className="space-y-6">
                                {skills.map((skill, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium text-foreground">{skill.name}</span>
                                        </div>
                                        <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                                                className="bg-primary h-full rounded-full"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <h3 className="text-base font-medium mb-6 text-foreground">Ecosystems</h3>
                            <div className="space-y-6">
                                <div className="p-6 rounded-2xl border bg-card">
                                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 block">Frontend</span>
                                    <div className="flex flex-wrap gap-2">
                                        {["React", "Next.js", "Tailwind CSS", "HTML & CSS"].map((tech) => (
                                            <span key={tech} className="px-3 py-1.5 bg-secondary rounded-lg text-sm font-medium text-foreground">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="p-6 rounded-2xl border bg-card">
                                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 block">Backend & DB</span>
                                    <div className="flex flex-wrap gap-2">
                                        {["Node.js", "Express", "PostgreSQL", "MongoDB", "Prisma"].map((tech) => (
                                            <span key={tech} className="px-3 py-1.5 bg-secondary rounded-lg text-sm font-medium text-foreground">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                <CTA />
            </div>
        </div>
    );
};

export default AboutPage;
