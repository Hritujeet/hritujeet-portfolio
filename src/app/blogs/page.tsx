import { Metadata } from "next";
import React from "react";
import { prisma } from "../../../utils/db";
import { formatDate } from "../../../utils/utils";
import Link from "next/link";

const page = async () => {
    const blogs = await prisma.blogPost.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });

    return (
        <div className="container mx-auto">
            <h1 className="text-5xl font-bold my-10 text-center">
                Read <span className="text-accent">Blogs</span>
            </h1>
            <div className="px-8 sm:px-12 md:px-16 lg:px-32 xl:px-40 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog, idx) => (
                    <div key={blog.slug} className="card bg-base-100 shadow-xl">
                        <figure>
                            <img
                                src={blog.img}
                                alt={blog.title}
                                className="object-cover w-full h-48"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{blog.title}</h2>
                            <p>{blog.description}</p>
                            <div className="card-actions justify-end items-center">
                                <span className="text-xs opacity-60">
                                    {formatDate(blog.createdAt.toString())}
                                </span>
                                <Link
                                    href={`/blogs/${blog.slug}`}
                                    className="btn btn-accent btn-sm"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                    </div>
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
