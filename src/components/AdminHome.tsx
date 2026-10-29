import React from "react";
import { prisma } from "../utils/db";
import { clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { BookOpen, FolderKanban, MessageSquare, NotebookPen, Plus, Users } from "lucide-react";

const AdminHome = async () => {
    const blogs = await prisma.blogPost.count();
    const projects = await prisma.project.count();
    const devlogs = await prisma.devlog.count();
    const comments = await prisma.comment.count();

    const clerk = await clerkClient();
    const users = await clerk.users.getCount();

    const stats = [
        {
            title: "Total Blogs",
            value: blogs,
            icon: BookOpen,
        },
        {
            title: "Total Projects",
            value: projects,
            icon: FolderKanban,
        },
        {
            title: "Total Devlogs",
            value: devlogs,
            icon: NotebookPen,
        },
        {
            title: "Total Comments",
            value: comments,
            icon: MessageSquare,
        },
        {
            title: "Total Users",
            value: users,
            icon: Users,
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {stats.map((stat, index) => (
                        <Card key={index} className="transition-colors hover:border-primary/40">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div
                                        className="flex size-12 items-center justify-center rounded-md border bg-muted text-primary"
                                    >
                                        <stat.icon className="size-5" aria-hidden="true" />
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <Link className={buttonVariants({ variant: "outline" })} href="/dashboard/addBlog">
                                <Plus className="mr-4 size-5" />
                                Add New Blog
                            </Link>

                            <Link className={buttonVariants({ variant: "outline" })} href="/dashboard/addProject">
                                <Plus className="mr-4 size-5" />
                                Add New Project
                            </Link>

                            <Link className={buttonVariants({ variant: "outline" })} href="/dashboard/addDevlog">
                                <Plus className="mr-4 size-5" />
                                Add New Devlog
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
                            <NotebookPen className="mx-auto mb-4 size-8" />
                            <p>Coming soon...</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminHome;
