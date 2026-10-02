import { Metadata } from "next";
import React from "react";
import { prisma } from "../../../utils/db";
import BlogCard from "@/components/BlogCard";

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
                {blogs.map((blog) => (
                    <BlogCard
                        key={blog.slug}
                        title={blog.title}
                        slug={blog.slug}
                        img={blog.img}
                        description={blog.description}
                        createdAt={blog.createdAt}
                    />
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
