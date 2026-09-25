import React from "react";
import { prisma } from "../utils/db";
import { clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";

const AdminHome = async () => {
    const blogs = await prisma.blogPost.count();
    const projects = await prisma.project.count();
    const comments = await prisma.comment.count();

    const clerk = await clerkClient();
    const users = await clerk.users.getCount();

    const stats = [
        {
            title: "Total Blogs",
            value: blogs,
            icon: "📝",
            color: "from-blue-500 to-blue-600",
        },
        {
            title: "Total Projects",
            value: projects,
            icon: "🚀",
            color: "from-purple-500 to-purple-600",
        },
        {
            title: "Total Comments",
            value: comments,
            icon: "💬",
            color: "from-green-500 to-green-600",
        },
        {
            title: "Total Users",
            value: users,
            icon: "👥",
            color: "from-orange-500 to-orange-600",
        },
    ];

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2 text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Welcome back! Here's what's happening.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <Card key={index} className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div
                                        className={`text-4xl bg-gradient-to-br ${stat.color} w-14 h-14 rounded-lg flex items-center justify-center shadow-md`}
                                    >
                                        {stat.icon}
                                    </div>
                                </div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                                    {stat.title}
                                </h3>
                                <p className="text-4xl font-bold text-foreground">
                                    {stat.value}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <Link className={buttonVariants({ variant: "outline" })} href="/dashboard/addBlog">
                                <span className="text-2xl mr-4">➕</span>
                                Add New Blog
                            </Link>

                            <Link className={buttonVariants({ variant: "outline" })} href="/dashboard/addProject">
                                <span className="text-2xl mr-4">🎯</span>
                                Add New Project
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Task Management Center</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-muted-foreground text-center py-8">
                            <span className="text-4xl mb-4 block">📊</span>
                            <p>Coming soon...</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminHome;
