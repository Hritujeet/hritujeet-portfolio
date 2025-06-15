import Intro from "@/components/CodeBannerHome";
import CTA from "@/components/CTA";
import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import HomeAbout from "@/components/HomeAbout";
import { Metadata } from "next";

export default function Home() {
    return (
        <section className="w-[90vw] mx-auto space-y-8">
            <div className="mx-auto w-[80vw]">
                <Hero />
                <Intro />
            </div>
            <HomeAbout />
            <div className="my-10">
                <h1 className="my-10 text-4xl font-bold text-blue-500 text-center">
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
    description: "Hey, there! I am Hritujeet, a web dev enthusiast as a teenage developer. I love to build things and share my knowledge with the world."
};
