"use client"
import React from "react";
import { useProjects } from "@/hooks/useProjects"
import { motion } from "framer-motion"
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";

type Project = {
    id: string;
    title: string;
    decription: string;
    link: string;
    techStack: string[];
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

const Projects = () => {
    const { data, isPending } = useProjects();
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
                    {[1, 2].map((i) => (
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

            {!isPending && data?.projects?.length === 0 && (
                <div className="text-center text-2xl font-bold text-muted-foreground">
                    No Projects Yet
                </div>
            )}

            {!isPending && data?.projects?.length > 0 && (
                <motion.div
                    className="grid md:grid-cols-2 gap-6"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                >
                    {data.projects.map((project: Project, index: number) => (
                        <motion.div
                            key={project.id}
                            variants={fadeInUp}
                            whileHover={{ scale: 1.02 }}
                        >
                            <Card className="h-full flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border bg-card">
                                <CardHeader>
                                    <CardTitle className="text-xl">{project.title}</CardTitle>
                                    <CardDescription className="text-base">{project.decription}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map(
                                            (tech, techIndex) => (
                                                <Badge key={techIndex} variant="secondary" className="font-medium bg-secondary/50">
                                                    {tech}
                                                </Badge>
                                            )
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-4 border-t border-border/50">
                                    <Link href={project.link} target="_blank" className={buttonVariants({ size: "sm" })} aria-label={`View project: ${project.title}`}>
                                        View Project
                                    </Link>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </motion.section>
    );
};

export default Projects;
