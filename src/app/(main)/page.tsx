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
import { Suspense } from "react";
import DevlogsGrid from "@/components/devlogs-grid";

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
              Field notes
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Recent writing
            </h2>
          </div>
          <Link
            href="/blogs"
            className={buttonVariants({ variant: "ghost", className: "hidden shrink-0 sm:inline-flex" })}
          >
            All articles <ArrowUpRight className="ml-1 size-4" />
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="mx-auto max-w-4xl divide-y divide-border">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex animate-pulse items-center gap-8 py-7"
                >
                  <div className="flex-1 space-y-3">
                    <div className="h-3 w-32 rounded bg-muted" />
                    <div className="h-6 w-3/4 rounded bg-muted" />
                    <div className="h-4 w-full rounded bg-muted" />
                  </div>
                  <div className="size-28 shrink-0 rounded-sm bg-muted sm:size-40" />
                </div>
              ))}
            </div>
          }
        >
          <Featured />
        </Suspense>
        <Link
          href="/blogs"
          className={buttonVariants({ variant: "outline", className: "mt-6 w-full rounded-full sm:hidden" })}
        >
          Explore all articles <ArrowUpRight className="ml-1 size-4" />
        </Link>
      </section>
      <section id="devlogs" className="my-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              On the workbench
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Things in progress
            </h2>
          </div>
          <Link
            href="/devlogs"
            className={buttonVariants({
              variant: "ghost",
              className: "hidden shrink-0 sm:inline-flex",
            })}
          >
            All devlogs <ArrowUpRight className="ml-1 size-4" />
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="mx-auto max-w-4xl divide-y divide-border">
              {[1, 2].map((item) => (
                <div key={item} className="animate-pulse space-y-3 py-7">
                  <div className="h-3 w-24 rounded bg-muted" />
                  <div className="h-6 w-2/3 rounded bg-muted" />
                  <div className="h-4 w-full rounded bg-muted" />
                </div>
              ))}
            </div>
          }
        >
          <DevlogsGrid limit={2} compact />
        </Suspense>
        <Link
          href="/devlogs"
          className={buttonVariants({
            variant: "outline",
            className: "mt-6 w-full rounded-full sm:hidden",
          })}
        >
          Explore all devlogs <ArrowUpRight className="ml-1 size-4" />
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
  description:
    "Hritujeet's personal tech website: writing, ideas, and notes from the things he is building.",
  keywords:
    "Hritujeet Sharma, personal website, technology, software, programming, web development, build logs, blogs, Next.js, React, JavaScript, open source, personal tech blog",
};
