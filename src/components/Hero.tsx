import React from "react";

const Hero = () => {
    return (
        <div className="my-14 space-y-6 text-center flex flex-col justify-center items-center min-h-[40vh]">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold sm:font-extrabold md:w-3/4 sm:tracking-tight leading-tighter pb-6 text-balance">
                    Hey, there! I&apos;m{" "}
                    <span className="text-accent">Hritujeet</span>
                </h1>
            <p className="sm:w-[70vw] lg:w-[50vw]">
                I&apos;m <strong className="font-bold text-accent">Hritujeet</strong>, a
                software developer with a passion for creating innovative
                solutions. With a strong foundation in computer science and a
                deep understanding of the latest technologies, I&apos;m
                dedicated to delivering high-quality code that exceeds
                expectations.
            </p>
        </div>
    );
};

export default Hero;
