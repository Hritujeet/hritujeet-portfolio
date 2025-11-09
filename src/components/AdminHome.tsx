import React from "react";
import { prisma } from "../../utils/db";
import { clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";

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
            color: "from-blue-500 to-blue-600"
        },
        { 
            title: "Total Projects", 
            value: projects, 
            icon: "🚀",
            color: "from-purple-500 to-purple-600"
        },
        { 
            title: "Total Comments", 
            value: comments, 
            icon: "💬",
            color: "from-green-500 to-green-600"
        },
        { 
            title: "Total Users", 
            value: users, 
            icon: "👥",
            color: "from-orange-500 to-orange-600"
        },
    ];

    return (
        <div className="min-h-screen bg-base-100 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
                    <p className="text-base-content/60">Welcome back! Here's what's happening.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div 
                            key={index}
                            className="bg-base-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`text-4xl bg-gradient-to-br ${stat.color} w-14 h-14 rounded-lg flex items-center justify-center shadow-md`}>
                                    {stat.icon}
                                </div>
                            </div>
                            <h3 className="text-sm font-medium text-base-content/60 mb-1">
                                {stat.title}
                            </h3>
                            <p className="text-4xl font-bold bg-gradient-to-br from-base-content to-base-content/70 bg-clip-text text-transparent">
                                {stat.value}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-base-200 rounded-xl p-8 shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/dashboard/addBlog" className="btn btn-accent btn-lg gap-3 shadow-md hover:shadow-lg transition-all">
                            <span className="text-2xl">➕</span>
                            Add New Blog
                        </Link>
                        <Link href="/dashboard/addProject" className="btn btn-accent btn-lg gap-3 shadow-md hover:shadow-lg transition-all">
                            <span className="text-2xl">🎯</span>
                            Add New Project
                        </Link>
                    </div>
                </div>

                <div className="bg-base-200 rounded-xl p-8 shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Task Management Center</h2>
                    <div className="text-base-content/60 text-center py-8">
                        <span className="text-4xl mb-4 block">📊</span>
                        <p>Coming soon...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;