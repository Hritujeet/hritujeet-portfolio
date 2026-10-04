"use client";

import { Monitor, ShieldCheck, WifiOff } from "lucide-react";
import { motion, Variants } from "motion/react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const JosephineHome = () => {
  const points = [
    {
      icon: WifiOff,
      title: "Voice-first, local-first.",
      copy: "Everything runs on your machine, powered by a local LLM installed on your system. No internet needed, no privacy trade-offs.",
    },
    {
      icon: Monitor,
      title: "Always there, never in the way",
      copy: "Silent in the tray until summoned. Zero friction, zero footprint at rest. Jo is always there when you need her, and never in the way when you don’t.",
    },
    {
      icon: ShieldCheck,
      title: "Personality and presence",
      copy: "Not a generic assistant — Jo has a character. Inspired by Jo March from Little Women, she’s a companion, a helper, and a friend.",
    },
  ];
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={containerVariants}
      className="my-24"
    >
      <motion.div variants={itemVariants} className="relative isolate overflow-hidden rounded-3xl border border-border/70 bg-card p-5 shadow-sm sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute -right-20 -top-24 -z-10 size-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="mb-8 max-w-2xl sm:mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Flagship Passion Project
          </p>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            Project <span className="text-primary">JOSEPHINE</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            A system-level local LLM assistant, built because Windows never
            delivered a functional alternative to Cortana.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
        >
          {points.map(({ icon: Icon, title, copy }, index) => (
            <motion.article
              key={title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-background/70 p-5 shadow-sm transition-all duration-300 hover:border-primary/30 hover:bg-background hover:shadow-lg hover:shadow-primary/5 sm:p-6 ${
                index === 2 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-mono text-xs font-medium tracking-widest text-muted-foreground/60">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mb-2 text-base font-semibold tracking-tight text-foreground sm:text-lg">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {copy}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default JosephineHome;
