"use client";
import Image from "next/image";
import React from "react";
import aboutBanner from "@/img/CodeBanner.webp";
import {
    Code,
    Coffee,
    Github,
    Linkedin,
    Mail,
    TwitterIcon,
} from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

const HomeAbout = () => {
    return (
        <div className="w-[80vw] mx-auto rounded-xl p-4 bg-gradient-to-br from-blue-950 via-gray-900 to-blue-950">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1 }}
                    onHoverStart={() => console.log("hover started!")}
                    className="md:col-span-2 bg-gradient-to-br from-gray-900 to-gray-950 rounded-lg border border-blue-950 p-4 flex flex-col justify-center items-center relative overflow-hidden"
                >
                    <Image
                        className="rounded-lg w-full h-auto opacity-80"
                        src={aboutBanner}
                        alt="Hritujeet coding workspace"
                        height={400}
                        width={600}
                    />
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-3">
                        <p className="text-white font-medium">
                            Full Stack Developer as Teenager
                        </p>
                        <p className="text-gray-300 text-sm">
                            Crafting digital experiences
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1 }}
                    onHoverStart={() => console.log("hover started!")}
                    className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-lg border border-blue-950 p-6"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Code className="text-green-400 w-5 h-5" />
                        <h3 className="text-lg font-bold text-white">
                            Tech Stack
                        </h3>
                    </div>
                    <div className="space-y-2">
                        <div className="bg-gray-700/40 rounded px-3 py-1">
                            <span className="text-gray-400 text-sm font-medium">
                                React/Next.js
                            </span>
                        </div>
                        <div className="bg-gray-700/40 rounded px-3 py-1">
                            <span className="text-green-400 text-sm font-medium">
                                Node.js
                            </span>
                        </div>
                        <div className="bg-gray-700/40 rounded px-3 py-1">
                            <span className="text-purple-400 text-sm font-medium">
                                TypeScript
                            </span>
                        </div>
                        <div className="bg-gray-700/40 rounded px-3 py-1">
                            <span className="text-purple-400 text-sm font-medium">
                                Javascript
                            </span>
                        </div>
                        <div className="bg-gray-700/40 rounded px-3 py-1">
                            <span className="text-orange-400 text-sm font-medium">
                                MongoDB
                            </span>
                        </div>
                        <div className="bg-gray-700/40 rounded px-3 py-1">
                            <span className="text-red-400 text-sm font-medium">
                                Express
                            </span>
                        </div>
                        <div className="bg-gray-700/40 rounded px-3 py-1">
                            <span className="text-indigo-400 text-sm font-medium">
                                Next Auth
                            </span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1 }}
                    className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-lg border border-blue-950 p-6"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Coffee className="text-purple-400 w-5 h-5" />
                        <h3 className="text-lg font-bold text-white">
                            Projects Created
                        </h3>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-gray-300 text-sm">
                                iCoder - Basice Blogging Platform
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-gray-300 text-sm">
                                Dev Diaries - Personal Blog and Portfolio
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-gray-300 text-sm">
                                Clozit Ecommerce
                            </span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1 }}
                    className="md:col-span-2 bg-gradient-to-br from-gray-900 to-gray-950 rounded-lg border border-blue-950 p-6"
                >
                    <h3 className="text-lg font-bold text-white mb-4">
                        Let's Connect
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="https://github.com/hritujeet"
                            className="flex items-center gap-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg px-4 py-2 transition-colors group"
                        >
                            <Github className="text-white w-4 h-4 group-hover:text-purple-400" />
                            <span className="text-gray-300 text-sm group-hover:text-white">
                                GitHub
                            </span>
                        </Link>
                        <Link
                            href="https://linkedin.com/in/hritujeet-sharma-797ba7281"
                            className="flex items-center gap-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg px-4 py-2 transition-colors group"
                        >
                            <Linkedin className="text-blue-400 w-4 h-4 group-hover:text-blue-300" />
                            <span className="text-gray-300 text-sm group-hover:text-white">
                                LinkedIn
                            </span>
                        </Link>
                        <Link
                            href="https://x.com/HritujeetS93526"
                            className="flex items-center gap-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg px-4 py-2 transition-colors group"
                        >
                            <TwitterIcon className="text-blue-400 w-4 h-4 group-hover:text-blue-300" />
                            <span className="text-gray-300 text-sm group-hover:text-white">
                                Twitter
                            </span>
                        </Link>
                        <Link
                            href="sharmahritujeet@gmail.com"
                            className="flex items-center gap-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg px-4 py-2 transition-colors group"
                        >
                            <Mail className="text-red-400 w-4 h-4 group-hover:text-red-300" />
                            <span className="text-gray-300 text-sm group-hover:text-white">
                                Email
                            </span>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HomeAbout;
