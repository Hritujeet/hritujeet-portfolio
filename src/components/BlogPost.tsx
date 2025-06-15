"use client"
import Image from 'next/image'
import React from 'react'
import bannerImg from "@/img/CodeBanner.webp"
import {usePost} from "@/hooks/usePost";

type Post = {
    title: string,
    img: string,
    slug: string,
    description: string
    content: string,
    createdAt: string
}

const BlogPostSection = ({slug}: { slug: string }) => {
    const {data, isPending} = usePost(slug);
    const post: Post = data?.post;

    // Helper function to calculate reading time
    const calculateReadingTime = (content: string) => {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);
        return readingTime;
    };

    // Helper function to format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
        return `${Math.ceil(diffDays / 365)} years ago`;
    };

    if (isPending) {
        return (
            <div className="min-h-screen bg-slate-900 px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col gap-6">
                        <div className="h-8 bg-slate-800 rounded-lg animate-pulse"></div>
                        <div className="h-6 bg-slate-800 rounded-lg w-3/4 animate-pulse"></div>
                        <div className="h-64 bg-slate-800 rounded-xl animate-pulse"></div>
                        <div className="space-y-4">
                            <div className="h-4 bg-slate-800 rounded animate-pulse"></div>
                            <div className="h-4 bg-slate-800 rounded animate-pulse"></div>
                            <div className="h-4 bg-slate-800 rounded w-2/3 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center text-center px-4">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-12 border border-slate-700">
                    <div
                        className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-3">Post Not Found</h1>
                    <p className="text-slate-400 text-lg">The blog post you&#39;re looking for doesn&#39;t exist or has
                        been
                        moved.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900">
            {/* Hero Section with Image */}
            <div className="relative">
                <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900 z-10"></div>
                <Image
                    src={post.img || bannerImg}
                    width={1920}
                    height={600}
                    alt={post.title}
                    className='w-full h-[50vh] md:h-[60vh] object-cover'
                />

                {/* Hero Content Overlay */}
                <div className="absolute inset-0 z-20 flex items-end">
                    <div className="max-w-4xl mx-auto px-4 pb-12 w-full">
                        <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-8 border border-slate-700/50">
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                <span
                                    className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    {calculateReadingTime(post.content)} min read
                                </span>
                                <span
                                    className="inline-flex items-center gap-2 px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-sm font-medium border border-slate-600/50">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                    {formatDate(post.createdAt)}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                                {post.title}
                            </h1>

                            <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
                                {post.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <article className="max-w-4xl mx-auto px-4 py-12">
                <div
                    className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
                    <div className="p-8 md:p-12">
                        <div
                            className="blog-content"
                            dangerouslySetInnerHTML={{__html: post.content}}
                        />
                    </div>
                </div>
            </article>
        </div>
    );
};

export default BlogPostSection;