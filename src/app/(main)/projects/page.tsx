import { Metadata } from 'next';
import Projects from "@/components/Projects";
import React from "react";

export const metadata: Metadata = {
    title: 'Projects',
    description: 'A collection of side projects and applications built by Hritujeet Sharma using modern web technologies like Next.js and React.',
};

const page = () => {
    return (
        <div className="px-8 sm:px-12 md:px-20 lg:px-24 xl:px-32 my-10">
            <Projects />
        </div>
    );
};

export default page;
