"use client";
import { useBlogs } from "@/hooks/useBlogs";
import React from "react";
import { formatDate } from "../../utils/utils";
import { BlogPost } from "@prisma/client";

const BlogsContainer = () => {
    const { data, isPending, isError } = useBlogs();
    console.log(data);
    

    if (isPending) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex w-auto flex-col gap-4">
                    <div className="skeleton h-32 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
                <div className="flex w-auto flex-col gap-4">
                    <div className="skeleton h-32 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
                <div className="flex w-auto flex-col gap-4">
                    <div className="skeleton h-32 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
            </div>
        );
    }

    if (isError) {
        (
            <div className="flex flex-col items-center justify-center h-56">
                <h2 className="text-xl font-bold text-red-600">Error loading blogs</h2>
                <p className="text-gray-500">Please try again later.</p>
            </div>
        )
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map((blog: BlogPost, idx: number) => (
                <div key={blog.slug} className="card hover:scale-105 transition-all duration-200 bg-base-100 shadow-xl">
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
                        <div className="card-actions items-center justify-between">
                            <span className="text-xs opacity-60">
                                {formatDate(blog.createdAt.toString())}
                            </span>
                            <a
                                href={`/blogs/${blog.slug}`}
                                className="btn btn-primary btn-sm"
                            >
                                Read More
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogsContainer;
