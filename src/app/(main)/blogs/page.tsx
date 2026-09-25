import { Metadata } from "next";
import React from "react";
import { formatDate } from "../../../utils/utils";
import Link from "next/link";
import { prisma } from "../../../utils/db";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";

const page = async () => {
    const blogs = await prisma.blogPost.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="container mx-auto pb-16">
            <h1 className="text-5xl font-extrabold my-12 text-center tracking-tight text-foreground">
                Read <span className="text-muted-foreground">Blogs</span>
            </h1>
            <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, idx) => (
                    <Card key={blog.slug} className="flex flex-col h-full hover:shadow-md transition-all duration-200 overflow-hidden">
                        <div className="relative w-full h-48 bg-muted">
                            <img
                                src={blog.img}
                                alt={blog.title}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <CardHeader>
                            <CardTitle className="line-clamp-2 leading-tight text-xl">{blog.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <CardDescription className="line-clamp-3 text-base-content/70">
                                {blog.description}
                            </CardDescription>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                            <span className="text-xs text-muted-foreground font-medium">
                                {formatDate(blog.createdAt.toString())}
                            </span>

                            <Link className={buttonVariants({ variant: "default" })} href={`/blogs/${blog.slug}`}>
                                Read More
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};
export const metadata: Metadata = {
    title: "Read Blogs | Hritujeet",
    description:
        "Read blogs about web development, programming, and more. Stay updated with the latest trends and insights in the tech world. Join our community of developers and enthusiasts. react, nextjs, javascript, web development, programming, blogs, tech trends, developer community, insights",
    keywords:
        "react, nextjs, javascript, web development, programming, blogs, tech trends, developer community, insights",
};
export default page;
