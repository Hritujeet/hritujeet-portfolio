"use client"
import React from "react";
import { useProjects } from "@/hooks/useProjects"
import { motion } from "framer-motion"
import Link from "next/link";

type Project = {
    id: string;
    title: string;
    decription: string;
    link: string;
    techStack: string[];
};

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
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
            <h2 className="text-4xl font-bold text-center mb-4">Projects</h2>
            <p className="text-center opacity-70 mb-10">
                {"Here's a glimpse of my work in these projects"}
            </p>

            {isPending && (
                <div className="grid md:grid-cols-2 gap-6">
                    {[1, 2].map((i) => (
                        <div key={i} className="card bg-base-200">
                            <div className="card-body">
                                <div className="skeleton h-6 w-3/4 mb-4"></div>
                                <div className="skeleton h-4 w-full mb-2"></div>
                                <div className="skeleton h-4 w-2/3 mb-4"></div>
                                <div className="flex gap-2 mb-4">
                                    <div className="skeleton h-6 w-16"></div>
                                    <div className="skeleton h-6 w-20"></div>
                                    <div className="skeleton h-6 w-14"></div>
                                </div>
                                <div className="skeleton h-8 w-24"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!isPending && data?.projects?.length === 0 && (
                <div className="text-center text-2xl font-bold opacity-50">
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
                            className="card bg-base-200 hover:shadow-lg transition-shadow"
                            variants={fadeInUp}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="card-body">
                                <h3 className="card-title">{project.title}</h3>
                                <p className="opacity-70">
                                    {project.decription}
                                </p>
                                <div className="flex flex-wrap gap-2 my-4">
                                    {project.techStack.map(
                                        (tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className="badge badge-outline"
                                            >
                                                {tech}
                                            </span>
                                        )
                                    )}
                                </div>
                                <div className="card-actions">
                                    <Link
                                        href={project.link}
                                        target="_blank"
                                        className="btn btn-accent btn-sm"
                                    >
                                        View Project
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </motion.section>
    );
};

export default Projects;
