import type { Metadata } from "next";
import DevlogsGrid from "@/components/devlogs-grid";

export const dynamic = "force-dynamic";

const DevlogsPage = () => {
  return (
    <main className="container mx-auto px-5 pb-20 sm:px-8">
      <header className="mx-auto mb-12 mt-12 max-w-6xl border-b border-border/70 pb-8 sm:mb-14 sm:mt-16">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Notes &amp; build logs
        </p>
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Things I&apos;m learning and making.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Notes, decisions, and progress from the things I&apos;m building.
        </p>
      </header>

      <div className="mx-auto max-w-4xl">
        <DevlogsGrid />
      </div>
    </main>
  );
};

export const metadata: Metadata = {
  title: "Devlogs",
  description:
    "Personal build logs, notes, and progress from Hritujeet Sharma.",
};

export default DevlogsPage;
