import { Metadata } from 'next';
import Projects from "@/components/Projects";
import React from "react";

export const metadata: Metadata = {
    title: 'Projects',
    description: 'A collection of side projects and applications built by Hritujeet Sharma using modern web technologies like Next.js and React.',
};

const page = () => {
    return (
        <main className="container mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
            <Projects />
        </main>
    );
};

export default page;
