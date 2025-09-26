import CTA from "@/components/CTA";
import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import HomeAbout from "@/components/HomeAbout";
import { Metadata } from "next";

export default function Home() {
    return (
        <section className="container px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 mx-auto space-y-8">
            <div className="mx-auto w-full">
                <Hero />
            </div>
            <HomeAbout />
            <div className="my-10 space-y-20">
                <h1 className="my-10 text-4xl font-bold text-center">
                    Featured Posts
                </h1>
                <Featured />
            </div>
            <CTA />
        </section>
    );
}
export const metadata: Metadata = {
    title: "Home | Hritujeet",
    description:
        "Hey, there! I am Hritujeet, a web dev enthusiast as a teenage developer. I love to build things and share my knowledge with the world.",
    keywords:
        "web development, programming, blogs, tech trends, developer community, insights, Hritujeet Sharma, teenage developer, coding enthusiast, web dev, Next.js, React, JavaScript, tech blogs, software development, coding tutorials, personal blog, tech enthusiast, coding community, web design, frontend development, backend development, full-stack development, open source, tech education, coding resources, developer portfolio",
};
