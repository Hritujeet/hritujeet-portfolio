"use client";
import React from "react";
import BlogItem from "./BlogItem";
import {motion, Transition, Variants} from "framer-motion";
import {useBlogs} from "@/hooks/useBlogs";
import SkeletonLoader from "@/components/SkeletonLoader";

type Post = {
    title: string,
    img: string,
    slug: string,
    description: string
    content: string,
    createdAt: string
}

const BlogsContainer = () => {
    // Smooth easing function with proper typing for Framer Motion
    const smoothEase: Transition["ease"] = [0.16, 1, 0.3, 1];
    const {data, isPending} = useBlogs();

    // Container animation variants with proper Framer Motion types
    const containerVariants: Variants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: smoothEase,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    // Blog item animation variants with proper Framer Motion types
    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 1,
                ease: smoothEase
            }
        }
    };

    // Loading state
    if (isPending) {
        return (
            <div className="w-[85vw] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <SkeletonLoader height={"160px"}/>
                <SkeletonLoader height={"160px"}/>
                <SkeletonLoader height={"160px"}/>
                <SkeletonLoader height={"160px"}/>
                <SkeletonLoader height={"160px"}/>
                <SkeletonLoader height={"160px"}/>
            </div>
        );
    }

    // Handle different possible data structures
    let posts: Post[] = [];
    
    if (data) {
        // Try different possible structures
        if (Array.isArray(data)) {
            posts = data;
        } else if (data.posts && Array.isArray(data.posts)) {
            posts = data.posts;
        } else if (data.data && Array.isArray(data.data)) {
            posts = data.data;
        }
        
        // Debug: Log the data structure (remove this in production)
        console.log('BlogsContainer - API Response:', data);
        console.log('BlogsContainer - Extracted posts:', posts);
    }

    // No posts available
    if (posts.length === 0) {
        return (
            <div className="w-[85vw] mx-auto flex justify-center items-center py-20">
                <div className="text-center">
                    <h3 className="text-3xl font-semibold text-gray-400 mb-2">No Posts Yet</h3>
                    <p className="text-gray-500">Check back later for new content!</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.1}}
            className="w-[85vw] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
            {posts.map((post: Post, index: number) => (
                <motion.div
                    key={post.slug || `post-${index}`} // Use slug as key, fallback to indexed string
                    variants={itemVariants}
                    whileHover={{
                        y: -5,
                        scale: 1.02,
                        transition: {duration: 0.3, ease: smoothEase}
                    }}
                    whileTap={{scale: 0.98}}
                >
                    <BlogItem 
                        title={post.title} 
                        img={post.img} 
                        slug={post.slug} 
                        description={post.description}
                        createdAt={post.createdAt}
                    />
                </motion.div>
            ))}
        </motion.div>
    );
};

export default BlogsContainer;