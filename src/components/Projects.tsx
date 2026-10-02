"use client"
import React from "react";
import { useProjects } from "@/hooks/useProjects"
import { motion } from "framer-motion"
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

type Project = {
    id: string;
    title: string;
    decription: string;
    link: string;
    techStack: string[];
};

type ProjectsProps = {
    limit?: number;
};

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

const Projects = ({ limit }: ProjectsProps) => {
    const { data, isPending } = useProjects();
    const projects = limit ? data?.projects?.slice(0, limit) : data?.projects;

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <motion.h2 
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight text-foreground"
            >
                Selected Work
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-center text-base text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
                {"Here's a glimpse of some of my recent projects and experiments."}
            </motion.p>

            {isPending && (
                <div className="grid md:grid-cols-2 gap-6">
                    {Array.from({ length: limit ?? 2 }, (_, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <Skeleton className="h-6 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-full" />
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-2 mb-4">
                                    <Skeleton className="h-5 w-16" />
                                    <Skeleton className="h-5 w-20" />
                                    <Skeleton className="h-5 w-14" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Skeleton className="h-9 w-24" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            {!isPending && projects?.length === 0 && (
                <div className="text-center text-2xl font-bold text-muted-foreground">
                    No Projects Yet
                </div>
            )}

            {!isPending && projects?.length > 0 && (
                <motion.div
                    className="grid md:grid-cols-2 gap-6"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                >
                    {projects.map((project: Project, index: number) => (
                        <motion.div
                            key={project.id}
                            variants={fadeInUp}
                            whileHover={{ scale: 1.02 }}
                        >
                            <Dialog>
                                <DialogTrigger
                                    render={
                                        <button
                                            type="button"
                                            aria-label={`View details for ${project.title}`}
                                            className="group flex h-full min-h-56 w-full flex-col justify-between gap-8 overflow-hidden rounded-2xl border border-border/70 bg-card p-6 text-left text-sm text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-accent/20 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        />
                                    }
                                >
                                    <span className="flex w-full items-start justify-between">
                                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                            Project {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <span className="flex size-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary group-hover:text-primary-foreground">
                                            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </span>
                                    </span>
                                    <span className="flex w-full flex-col gap-3">
                                        <span className="font-heading text-xl font-semibold leading-tight tracking-tight text-card-foreground">
                                            {project.title}
                                        </span>
                                        <span className="min-h-[4.5rem] line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                                            {project.decription}
                                        </span>
                                        <span className="mt-1 text-sm font-medium text-foreground/80 transition-colors group-hover:text-primary">
                                            Explore project
                                        </span>
                                    </span>
                                </DialogTrigger>
                                <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
                                    <DialogHeader>
                                        <DialogTitle className="pr-8 text-xl">
                                            {project.title}
                                        </DialogTitle>
                                        <DialogDescription className="whitespace-pre-wrap text-base">
                                            {project.decription}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech, techIndex) => (
                                            <Badge
                                                key={`${project.id}-${techIndex}`}
                                                variant="secondary"
                                                className="bg-secondary/50 font-medium"
                                            >
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                    <DialogFooter>
                                        <Link
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={buttonVariants({ size: "sm" })}
                                            aria-label={`View project: ${project.title}`}
                                        >
                                            View Project
                                        </Link>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {limit && (
                <div className="mt-8 text-center">
                    <Link href="/projects" className={buttonVariants({ variant: "outline" })}>
                        View all projects
                    </Link>
                </div>
            )}
        </motion.section>
    );
};

export default Projects;
