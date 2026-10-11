"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const THINGS = ["tools", "side projects", "weird experiments", "things that break"];

const NOW = [
  {
    label: "building",
    text: "Josephine, a companion that lives on my Windows machine",
    href: "/josephine",
  },
  {
    label: "writing",
    text: "notes on what I learn while building",
    href: "/blogs",
  },
  {
    label: "logging",
    text: "the messy middle of every project",
    href: "/devlogs",
  },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const linkBase = "group inline-flex items-center gap-1 transition-colors";
const arrow =
  "h-[1em] w-[1em] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5";

const Hero = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % THINGS.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative mt-[clamp(1rem,3vw,3rem)] mb-[clamp(2.5rem,6vw,4rem)] overflow-hidden rounded-[clamp(1.25rem,3vw,1.75rem)] border">
      {/* dotted background, fading out toward the bottom right */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(hsl(var(--foreground)/0.12)_1px,transparent_1px)] [background-size:clamp(16px,2vw,22px)_clamp(16px,2vw,22px)] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_75%)]"
      />
      {/* faint "bat-signal" glow, top right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_90%_0%,hsl(var(--foreground)/0.09),transparent_50%)]"
      />

      <div className="flex flex-wrap items-center gap-[clamp(1.5rem,5vw,3.5rem)] px-[clamp(1.25rem,5vw,4rem)] py-[clamp(2.5rem,8vw,5rem)]">
        {/* left: the person */}
        <div className="flex min-w-0 flex-[1_1_22rem] flex-col gap-[clamp(1rem,2.2vw,1.5rem)]">
          <motion.p
            {...fade(0)}
            className="font-mono text-[clamp(0.75rem,1.2vw,0.875rem)] text-muted-foreground"
          >
            <span className="text-green-500">~</span> welcome to the batcave
          </motion.p>

          <motion.h1
            {...fade(0.08)}
            className="text-[clamp(2.5rem,7vw,4.75rem)] font-bold leading-[0.95] tracking-tighter"
          >
            Hey, I&apos;m
            <br />
            Hritujeet.
          </motion.h1>

          <motion.div
            {...fade(0.16)}
            className="flex flex-wrap items-baseline gap-x-[0.4em] text-[clamp(1.25rem,3vw,1.875rem)] text-muted-foreground"
          >
            <span>I make</span>
            {/* all words stacked invisibly so the box fits the longest one */}
            <span className="inline-grid">
              {THINGS.map((t) => (
                <span
                  key={t}
                  aria-hidden
                  className="invisible col-start-1 row-start-1 font-semibold"
                >
                  {t}
                </span>
              ))}
              <AnimatePresence mode="wait">
                <motion.span
                  key={THINGS[i]}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="col-start-1 row-start-1 font-semibold text-foreground underline decoration-wavy decoration-foreground/30 underline-offset-4"
                >
                  {THINGS[i]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.p
            {...fade(0.24)}
            className="max-w-[60ch] text-[clamp(0.95rem,1.6vw,1.0625rem)] leading-relaxed text-muted-foreground"
          >
            A place on the web to explore tech, tinker with ideas, build
            strange things, and share notes from the process.
          </motion.p>

          <motion.div
            {...fade(0.32)}
            className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-[clamp(0.875rem,1.4vw,1rem)] font-medium"
          >
            <Link
              href="/blogs"
              className={`${linkBase} underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground`}
            >
              read the blog
              <ArrowUpRight className={arrow} />
            </Link>
            <Link
              href="/devlogs"
              className={`${linkBase} text-muted-foreground hover:text-foreground`}
            >
              follow the devlogs
              <ArrowUpRight className={arrow} />
            </Link>
            <Link
              href="/about"
              className={`${linkBase} text-muted-foreground hover:text-foreground`}
            >
              more about me
              <ArrowUpRight className={arrow} />
            </Link>
          </motion.div>
        </div>

        {/* right: right-now card */}
        <motion.aside
          {...fade(0.4)}
          className="min-w-0 flex-[1_1_16rem] rounded-2xl border bg-background/70 p-[clamp(1rem,2.5vw,1.5rem)] font-mono text-[clamp(0.8rem,1.3vw,0.875rem)] shadow-sm backdrop-blur"
        >
          <div className="mb-4 flex items-center justify-between gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              right now
            </span>
            <span>now.txt</span>
          </div>

          <ul className="space-y-[clamp(0.75rem,2vw,1rem)]">
            {NOW.map(({ label, text, href }) => (
              <li key={label}>
                <Link href={href} className="group block">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">
                    {label}
                  </span>
                  <span className="mt-0.5 block font-sans text-foreground/90 transition-colors group-hover:text-foreground">
                    {text}
                    <span className="ml-1 inline-block opacity-0 transition-opacity group-hover:opacity-100">
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.aside>
      </div>
    </section>
  );
};

export default Hero;