import type { Metadata } from "next";

const DevlogsPage = async () => {
  return (
    <main className="container mx-auto px-5 pb-20 sm:px-8">
      <header className="mx-auto mb-12 mt-12 max-w-6xl border-b border-border/70 pb-8 sm:mb-14 sm:mt-16">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          The build log
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Notes from what I&apos;m building.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Short updates, lessons, and progress from my projects.
        </p>
      </header>

      {/* <div className="mx-auto max-w-6xl">
        <DevlogsGrid />
      </div> */}
    </main>
  );
};

export const metadata: Metadata = {
  title: "Devlogs | Hritujeet",
  description:
    "Follow project updates, lessons, and progress from Hritujeet's builds.",
};

export default DevlogsPage;
