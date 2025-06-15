"use client";
import React from "react";
import { motion } from "motion/react";

const Hero = () => {
    return (
        <div className="my-14 space-y-6">
            {/* Badge with fade in from left */}
            <motion.div 
                className="special bg-blue-950 w-fit py-1 px-4 rounded-full border border-blue-900 text-sm font-semibold text-white"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                    duration: 0.6, 
                    delay: 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94] 
                }}
            >
                <p>CodeWithHritujeet</p>
            </motion.div>

            {/* Main heading with scale and fade */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                    duration: 0.6,
                    delay: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                }}
            >
                <h1 className="text-6xl md:text-7xl font-bold md:w-2/3 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-300 pb-6">
                    Building a bridge between ideas and{" "}
                    <motion.span 
                        className="text-blue-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ 
                            duration: 0.6, 
                            delay: 1.0,
                            ease: "easeOut"
                        }}
                    >
                        real life
                    </motion.span>
                </h1>
            </motion.div>

            {/* Description paragraph with fade up */}
            <motion.p 
                className="md:w-2/3 text-base md:text-lg text-gray-400 leading-relaxed text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                    duration: 0.7, 
                    delay: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94] 
                }}
            >
                I&apos;m{" "}
                <motion.strong 
                    className="text-blue-400 font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                        duration: 0.5, 
                        delay: 1.2,
                        ease: "easeOut"
                    }}
                >
                    Hritujeet
                </motion.strong>
                , a software developer with a passion for creating innovative
                solutions. With a strong foundation in computer science and a
                deep understanding of the latest technologies, I&apos;m
                dedicated to delivering high-quality code that exceeds
                expectations.
            </motion.p>
        </div>
    );
};

export default Hero;