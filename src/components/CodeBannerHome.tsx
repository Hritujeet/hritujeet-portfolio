"use client";
import React from "react";
import { motion, Variants, Transition } from "framer-motion"; // Changed import

const Intro = () => {
    // Animation variants with proper typing
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const codeBlockVariants: Variants = {
        hidden: { 
            opacity: 0, 
            scale: 0.8,
            y: 20,
            rotateX: -15
        },
        visible: { 
            opacity: 1, 
            scale: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94] as Transition["ease"],
                type: "spring",
                stiffness: 100
            }
        }
    };

    const centralBlockVariants: Variants = {
        hidden: { 
            opacity: 0, 
            scale: 0.5,
            rotateY: 180
        },
        visible: { 
            opacity: 1, 
            scale: 1,
            rotateY: 0,
            transition: {
                duration: 1.2,
                delay: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94] as Transition["ease"],
                type: "spring",
                stiffness: 80
            }
        }
    };

    const iconVariants: Variants = {
        hidden: { opacity: 0, scale: 0 },
        visible: { 
            opacity: [0, 0.15, 0.1] as unknown as number, // Type assertion for opacity array
            scale: 1,
            transition: {
                duration: 1.5,
                delay: 1.2,
                ease: "easeOut"
            }
        }
    };

    const backgroundVariants: Variants = {
        hidden: { opacity: 0, scale: 1.1 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
                duration: 1.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="my-5">
            <motion.div 
                className="relative w-full max-w-4xl h-64 sm:h-80 md:h-96 bg-gradient-to-br rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Animated Background Layers */}
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent"
                    variants={backgroundVariants}
                    animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                
                <motion.div 
                    className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1)_0%,transparent_50%)]"
                    animate={{
                        background: [
                            "radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1)_0%,transparent_50%)",
                            "radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.15)_0%,transparent_50%)",
                            "radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1)_0%,transparent_50%)"
                        ]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Top Left Code Block */}
                <motion.div 
                    className="hidden sm:block absolute top-2 sm:top-4 left-2 sm:left-6 border rounded-md sm:rounded-lg p-2 sm:p-4 backdrop-blur-sm shadow-xl"
                    variants={codeBlockVariants}
                    whileHover={{ 
                        scale: 1.05, 
                        rotateY: 5,
                        boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)"
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.div 
                        className="text-xs font-mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                    >
                        <span>const</span>{" "}
                        <span>Portfolio</span>{" "}
                        <span>=</span>{" "}
                        <span>()</span>{" "}
                        <span>=&gt;</span>{" "}
                        <span>{"{"}</span>
                        <br />
                        <span className="ml-2">return</span>{" "}
                        <span>&lt;App /&gt;</span>
                        <br />
                        <span>{"}"}</span>
                    </motion.div>
                </motion.div>

                {/* Top Right Code Block */}
                <motion.div
                    className="hidden md:block absolute top-2 md:top-8 right-2 md:right-6 border rounded-md md:rounded-lg p-2 md:p-4 backdrop-blur-sm shadow-xl"
                    variants={codeBlockVariants}
                    whileHover={{ 
                        scale: 1.05, 
                        rotateY: -5,
                        boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)"
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.div 
                        className="text-xs font-mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.7, duration: 0.5 }}
                    >
                        <span>import</span>{" "}
                        <span>React</span>{" "}
                        <span>from</span>{" "}
                        <span>&#39;react&#39;</span>
                        <br />
                        <span>import</span>{" "}
                        <span>{"{ useState }"}</span>
                    </motion.div>
                </motion.div>

                {/* Bottom Left Code Block */}
                <motion.div
                    className="hidden md:block absolute bottom-2 md:bottom-8 left-2 md:left-8 border rounded-md md:rounded-lg p-2 md:p-4 backdrop-blur-sm shadow-xl"
                    variants={codeBlockVariants}
                    whileHover={{ 
                        scale: 1.05, 
                        rotateX: 5,
                        boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)"
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.div 
                        className="text-xs font-mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.9, duration: 0.5 }}
                    >
                        <span>useEffect</span>
                        <span>(()</span>{" "}
                        <span>=&gt;</span>{" "}
                        <span>{"{"}</span>
                        <br />
                        <span className="ml-2 hidden lg:inline">
                            {/*// Magic happens here*/}
                        </span>
                        <br className="hidden lg:block" />
                        <span>{"}"}, [])</span>
                    </motion.div>
                </motion.div>

                {/* Bottom Right Code Block */}
                <motion.div
                    className="absolute bottom-2 sm:bottom-6 right-2 sm:right-8 border rounded-md sm:rounded-lg p-2 sm:p-4 backdrop-blur-sm shadow-xl"
                    variants={codeBlockVariants}
                    whileHover={{ 
                        scale: 1.05, 
                        rotateX: -5,
                        boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)"
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.div 
                        className="text-xs font-mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.1, duration: 0.5 }}
                    >
                        <span>&lt;div</span>{" "}
                        <span className="hidden sm:inline">
                            <span>className</span>
                            <span>=</span>
                            <span>&#34;flex&#34;</span>
                        </span>
                        <span>&gt;</span>
                        <br className="hidden sm:block" />
                        <span className="ml-2 hidden sm:inline">
                            &lt;Component /&gt;
                        </span>
                        <br className="hidden sm:block" />
                        <span className="sm:hidden">/&gt;</span>
                        <span className="hidden sm:inline">&lt;/div&gt;</span>
                    </motion.div>
                </motion.div>

                {/* Central Code Block - Hero Animation */}
                <motion.div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 rounded-lg sm:rounded-xl p-3 sm:p-6 backdrop-blur-md shadow-2xl ring-1 max-w-[280px] sm:max-w-none"
                    variants={centralBlockVariants}
                    whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)",
                        borderColor: "rgba(59, 130, 246, 0.8)"
                    }}
                    animate={{
                        boxShadow: [
                            "0 10px 30px -12px rgba(59, 130, 246, 0.2)",
                            "0 15px 35px -12px rgba(59, 130, 246, 0.3)",
                            "0 10px 30px -12px rgba(59, 130, 246, 0.2)"
                        ]
                    }}
                    transition={{
                        boxShadow: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                >
                    <motion.div 
                        className="text-xs sm:text-sm font-mono"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.3, duration: 0.8 }}
                    >
                        <div className="flex gap-1 sm:gap-2 mb-2 sm:mb-3">
                            <motion.div 
                                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                            />
                            <motion.div 
                                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                            />
                            <motion.div 
                                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                            />
                        </div>
                        <div className="space-y-1">
                            <div>
                                <span>function</span>{" "}
                                <span>
                                    GetDev<span className="hidden sm:inline">eloper</span>
                                </span>
                                <span>(req, res)</span>{" "}
                                <span>{"{"}</span>
                            </div>
                            <div className="ml-2 sm:ml-4">
                                <span>return</span>{" "}
                                <div className="ml-2 sm:ml-4">
                                    <span>res</span>
                                    <span>.</span>
                                    <span>status</span>
                                    <span>(</span>
                                    <span>200</span>
                                    <span>).</span>
                                    <span>json</span>
                                    <span>(</span>
                                    <div className="inline sm:block">
                                        <span>
                                            &#39;Building<span className="hidden xs:inline"> the future</span>&#39;
                                        </span>
                                    </div>
                                    <span>)</span>
                                </div>
                            </div>
                            <div>
                                <span>{"}"}</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Decorative Icons with Animation */}
                <motion.div 
                    className="absolute top-8 sm:top-12 left-12 sm:left-20"
                    variants={iconVariants}
                    animate={{ 
                        rotate: 360,
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                        opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                >
                    <svg
                        width="25"
                        height="25"
                        className="sm:w-10 sm:h-10"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89s-.84 1.89-1.87 1.89S10.13 13.04 10.13 12s.84-1.89 1.87-1.89M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8a8 8 0 0 0 8 8a8 8 0 0 0 8-8a8 8 0 0 0-8-8Z" />
                    </svg>
                </motion.div>

                <motion.div 
                    className="absolute top-12 sm:top-20 right-12 sm:right-20"
                    variants={iconVariants}
                    animate={{ 
                        y: [0, -10, 0],
                        opacity: [0.08, 0.15, 0.08],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <svg
                        width="20"
                        height="20"
                        className="sm:w-9 sm:h-9"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                    </svg>
                </motion.div>

                {/* Final animated overlay */}
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-blue-950/20 via-transparent"
                    animate={{
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </motion.div>
        </div>
    );
};

export default Intro;