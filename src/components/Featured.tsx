"use client";
import { useBlogs } from "@/hooks/useBlogs";
import React from "react";
import { formatDate } from "../utils/utils";
import { BlogPost } from "@/client/prisma";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button, buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";

const BlogsContainer = () => {
    const { data, isPending, isError } = useBlogs();
    console.log(data);

    if (isPending) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="flex flex-col h-full">
                        <Skeleton className="h-48 w-full rounded-t-lg rounded-b-none" />
                        <CardHeader>
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-full" />
                        </CardHeader>
                        <CardFooter className="mt-auto flex justify-between">
                            <Skeleton className="h-4 w-1/4" />
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
            {data?.map((blog: BlogPost, idx: number) => (
                <motion.div
                    key={blog.slug}
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full rounded-2xl border bg-card">
                        <div className="relative overflow-hidden group">
                            <img
                                src={blog.img}
                                alt={blog.title}
                                loading="lazy"
                                className="object-cover w-full h-52 group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <CardHeader className="pt-6">
                            <CardTitle className="text-xl line-clamp-2 leading-tight">{blog.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <CardDescription className="text-muted-foreground line-clamp-3 text-base">
                                {blog.description}
                            </CardDescription>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                            <span className="text-sm font-medium text-muted-foreground">
                                {formatDate(blog.createdAt.toString())}
                            </span>
                            <Link href={`/blogs/${blog.slug}`} className={buttonVariants({ variant: "default", size: "sm" })} aria-label={`Read more about ${blog.title}`}>
                                Read More
                            </Link>
                        </CardFooter>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default BlogsContainer;
