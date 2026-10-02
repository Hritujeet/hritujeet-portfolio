"use client";
import { useBlogs } from "@/hooks/useBlogs";
import React from "react";
import { BlogPost } from "@/client/prisma";
import BlogCard from "@/components/BlogCard";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const BlogsContainer = () => {
    const { data, isPending, isError } = useBlogs();

    if (isPending) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="flex h-full flex-col overflow-hidden rounded-2xl">
                        <Skeleton className="aspect-[16/10] w-full rounded-none" />
                        <CardHeader className="gap-3">
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-12 w-full" />
                        </CardHeader>
                        <CardFooter className="mt-auto flex justify-between border-t border-border/50">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-9 w-24" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center h-56">
                <h2 className="text-xl font-bold text-destructive">
                    Error loading blogs
                </h2>
                <p className="text-muted-foreground">Please try again later.</p>
            </div>
        );
    }
    
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
            {data?.map((blog: BlogPost, idx: number) => (
                <motion.div
                    key={blog.slug}
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <BlogCard
                        title={blog.title}
                        slug={blog.slug}
                        img={blog.img}
                        description={blog.description}
                        createdAt={blog.createdAt}
                    />
                </motion.div>
            ))}
        </motion.div>
    );
};

export default BlogsContainer;
