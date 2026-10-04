import CTA from "@/components/CTA";
import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import HomeAbout from "@/components/HomeAbout";
import JosephineHome from "@/components/josephine-home";
import Projects from "@/components/Projects";
import TechSection from "@/components/tech-section";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="container px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 mx-auto space-y-8">
      <section className="mx-auto w-full">
        <Hero />
      </section>
      <HomeAbout />

      <section id="featured-posts" className="my-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              From the journal
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Featured writing
            </h2>
          </div>
          <Link
            href="/blogs"
            className={buttonVariants({ variant: "ghost", className: "hidden shrink-0 sm:inline-flex" })}
          >
            All articles <ArrowUpRight className="ml-1 size-4" />
          </Link>
        </div>
        <Featured />
        <Link
          href="/blogs"
          className={buttonVariants({ variant: "outline", className: "mt-6 w-full rounded-full sm:hidden" })}
        >
          Explore all articles <ArrowUpRight className="ml-1 size-4" />
        </Link>
      </section>
      <TechSection />
      <section className="my-24 space-y-12">
        <Projects limit={4} />
      </section>
      <JosephineHome />
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
