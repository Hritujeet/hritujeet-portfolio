import { buttonVariants } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import {
    Activity,
    ArrowDown,
    ArrowRight,
    AudioLines,
    BrainCircuit,
    ChevronRight,
    Circle,
    CircleDot,
    Cloud,
    Command,
    Cpu,
    Eye,
    Gauge,
    Layers3,
    LockKeyhole,
    Mic,
    Monitor,
    Moon,
    Power,
    Radio,
    Shield,
    Sparkles,
    Terminal,
    Volume2,
    Wifi,
    WifiOff,
    Workflow,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Josephine — Local-first Windows companion",
  description:
    "Meet Josephine: a quiet, local-first Windows companion designed for private assistance, useful workflows, and a lightweight always-ready presence.",
};

const principles = [
  {
    icon: LockKeyhole,
    title: "Private by default",
    description:
      "Keep everyday conversations and inference on-device. Cloud services are an optional handoff for work that genuinely needs them.",
  },
  {
    icon: Gauge,
    title: "There when needed",
    description:
      "A quiet tray presence, quick activation, and automatic sleep help keep the assistant responsive without wasting laptop resources.",
  },
  {
    icon: Workflow,
    title: "Useful, not just conversational",
    description:
      "Josephine is designed to connect natural-language requests to real Windows actions, apps, research, and focused-work routines.",
  },
];

const capabilities = [
  {
    icon: Command,
    label: "01 / Presence",
    title: "A calm, always-ready HUD",
    description:
      "Summon the dashboard with a global shortcut. A compact glass-style overlay gives clear listening, processing, and network feedback without taking over the screen.",
    tags: ["System tray", "Global hotkey", "PyQt6 overlay"],
  },
  {
    icon: Mic,
    label: "02 / Input",
    title: "Talk or type, on your terms",
    description:
      "Push-to-talk voice input keeps the microphone under your control. Local speech recognition can turn requests into text, with screen and clipboard context available when you choose.",
    tags: ["Push-to-talk", "Local STT", "Opt-in context"],
  },
  {
    icon: BrainCircuit,
    label: "03 / Intelligence",
    title: "Local-first, cloud when useful",
    description:
      "A small quantized model handles routing and everyday conversation. Larger, network-dependent tasks can be handed off to a cloud provider with visible status and cancellation.",
    tags: ["Quantized GGUF", "Intent routing", "Optional cloud"],
  },
  {
    icon: Terminal,
    label: "04 / Actions",
    title: "From request to real workflow",
    description:
      "Launch verified apps, organize a deep-work setup, adjust supported system controls, set reminders, or gather information from the web and research sources.",
    tags: ["App launcher", "Windows controls", "Research"],
  },
];

const architecture = [
  { icon: Radio, name: "Tray & hotkey", detail: "Quiet entry point" },
  { icon: AudioLines, name: "Voice / text", detail: "User-controlled input" },
  {
    icon: BrainCircuit,
    name: "Command router",
    detail: "Choose the right path",
  },
  {
    icon: Workflow,
    name: "Tools & models",
    detail: "Local actions or inference",
  },
  { icon: Volume2, name: "Response", detail: "HUD + offline voice" },
];

const modules = [
  {
    icon: Monitor,
    title: "Interface & lifecycle",
    detail:
      "Tray menu, overlay states, hotkey activation, idle sleep, and safe shutdown.",
    tech: "PyQt6 · pynput",
  },
  {
    icon: Eye,
    title: "Input & context",
    detail:
      "Push-to-talk transcription, optional clipboard context, and foreground-window awareness.",
    tech: "Vosk / Whisper · pywin32",
  },
  {
    icon: BrainCircuit,
    title: "Local intelligence",
    detail:
      "Quantized model inference, recent-turn context, intent classification, and controlled unload/reload.",
    tech: "llama-cpp-python · GGUF",
  },
  {
    icon: Activity,
    title: "Actions & safeguards",
    detail:
      "Verified app launching, supported system operations, reminders, and explicit failure feedback.",
    tech: "Python · Windows APIs",
  },
  {
    icon: AudioLines,
    title: "Voice response",
    detail:
      "Non-blocking local speech playback synchronized with the assistant's response.",
    tech: "Piper · sounddevice",
  },
  {
    icon: Cloud,
    title: "Network handoff",
    detail:
      "Check connectivity before cloud work; show waiting state and let the user cancel.",
    tech: "HTTP client · network check",
  },
];

const phases = [
  {
    number: "01",
    title: "Foundation",
    description:
      "Set up the Python application, run local GGUF inference, and establish a small command router.",
    status: "Build the core",
  },
  {
    number: "02",
    title: "Windows actions",
    description:
      "Add reliable app discovery and launching, then introduce carefully scoped system controls and reminders.",
    status: "Connect useful tools",
  },
  {
    number: "03",
    title: "Voice pipeline",
    description:
      "Wire in local speech recognition and offline text-to-speech without blocking the interface.",
    status: "Make it hands-free",
  },
  {
    number: "04",
    title: "HUD & lifecycle",
    description:
      "Build the tray-first overlay, connect its states to the backend, and add hotkey activation.",
    status: "Bring Jo to life",
  },
  {
    number: "05",
    title: "Polish & optimize",
    description:
      "Measure resource use, unload the model when idle, harden fallbacks, and package for Windows startup.",
    status: "Ready for daily use",
  },
];

const stack = [
  "Python 3.10+",
  "PyQt6",
  "llama-cpp-python",
  "Gemma 3B (4-bit)",
  "Vosk / Whisper",
  "Piper TTS",
  "pynput",
  "psutil",
  "sounddevice",
  "Windows APIs",
];

const heroStats = [
  ["LOCAL-FIRST", "Private by design"],
  ["TRAY-BASED", "Quiet until summoned"],
  ["WINDOWS", "Built for your workflow"],
];

/* Shared building blocks so every section uses the same rhythm */

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="mb-10 max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
    </header>
  );
}

function IconBadge({
  icon: Icon,
  className = "bg-primary/10 text-primary",
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <span
      className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${className}`}
    >
      <Icon className="size-5" />
    </span>
  );
}

export default function JosephinePage() {
  return (
    <main className="container mx-auto flex w-full max-w-7xl flex-col gap-20 px-5 pb-24 pt-10 sm:gap-28 sm:px-8 sm:pt-16 lg:px-12">
      {/* HERO */}
      <section className="relative isolate overflow-hidden rounded-[2rem] border border-border/70 bg-gradient-to-br from-card via-card to-primary/10 p-6 shadow-sm sm:p-10 lg:p-16">
        <div className="pointer-events-none absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 -z-10 size-72 rounded-full bg-sky-500/10 blur-3xl" />

        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-primary">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              PERSONAL PROJECT · IN DEVELOPMENT
            </div>

            <h1 className="mt-6 text-5xl font-bold tracking-[-0.05em] text-foreground sm:text-6xl lg:text-7xl">
              Meet{" "}
              <span className="bg-gradient-to-r from-primary via-amber-300 to-primary bg-clip-text text-transparent">
                Josephine.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              A quiet, local-first companion for Windows. She stays out of the
              way until you need a hand—then helps you think, find, and get
              things done.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#vision"
                className={buttonVariants({ variant: "default" })}
              >
                Explore the vision <ArrowDown className="size-4" />
              </Link>
              <Link
                href="#architecture"
                className={buttonVariants({ variant: "outline" })}
              >
                See how it works <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <dl className="grid divide-y divide-border/70 rounded-2xl border border-border/70 bg-background/50 backdrop-blur-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:grid-cols-1 lg:divide-x-0 lg:divide-y">
            {heroStats.map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1 p-4">
                <dt className="text-[10px] font-semibold tracking-[0.16em] text-primary">
                  {label}
                </dt>
                <dd className="text-sm font-medium text-foreground/90">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* VISION */}
      <section id="vision" className="scroll-mt-24">
        <SectionHeader
          eyebrow="The idea"
          title="An assistant with a sense of presence."
          description="Josephine is envisioned as a collaborative advisor—not another tab demanding attention. A lightweight local model keeps everyday help close, while optional cloud handoffs can take on tasks that need more compute."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {principles.map(({ icon, title, description }, index) => (
            <article
              key={title}
              className="group flex h-full flex-col rounded-2xl border border-border/70 bg-card/70 p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:bg-card"
            >
              <div className="mb-8 flex items-center justify-between">
                <IconBadge icon={icon} />
                <span className="font-mono text-xs text-muted-foreground/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* CAPABILITIES */}
      <section>
        <SectionHeader
          eyebrow="What Jo is designed to do"
          title="One companion. Many useful skills."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {capabilities.map(({ icon, label, title, description, tags }) => (
            <article
              key={label}
              className="flex h-full flex-col rounded-2xl border border-border/70 bg-card/60 p-6 sm:p-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <IconBadge
                  icon={icon}
                  className="border border-primary/15 bg-primary/10 text-primary"
                />
                <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
                  {label}
                </span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-foreground/75"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section
        id="architecture"
        className="scroll-mt-24 rounded-3xl border border-border/70 bg-muted/20 p-6 sm:p-8 lg:p-12"
      >
        <SectionHeader
          eyebrow="Under the hood"
          title="A simple path from ask to action."
          description="Each request moves through a small, understandable pipeline. The router chooses a local tool or model first, and makes network-dependent work visible."
        />

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {architecture.map(({ icon: Icon, name, detail }, index) => {
            const isLast = index === architecture.length - 1;
            return (
              <li
                key={name}
                className={`relative flex min-w-0 ${
                  isLast ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="w-full rounded-2xl border border-border/70 bg-card p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold">{name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {detail}
                  </p>
                </div>
                {!isLast && (
                  <ChevronRight
                    aria-hidden
                    className="absolute -right-[18px] top-1/2 z-10 hidden size-5 -translate-y-1/2 text-primary lg:block"
                  />
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            {
              icon: Wifi,
              label: "Online:",
              text: "local requests stay local; eligible heavy tasks can be handed off with clear status.",
            },
            {
              icon: WifiOff,
              label: "Offline:",
              text: "local features remain available; queued cloud work shows that it is waiting and can be cancelled.",
            },
          ].map(({ icon: Icon, label, text }) => (
            <div
              key={label}
              className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/60 p-4"
            >
              <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                <strong className="font-semibold text-foreground">
                  {label}
                </strong>{" "}
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MODULES */}
      <section>
        <SectionHeader
          eyebrow="The building blocks"
          title="Designed as focused modules."
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {modules.map(({ icon: Icon, title, detail, tech }) => (
            <article
              key={title}
              className="flex h-full flex-col rounded-2xl border border-border/70 bg-card/60 p-6"
            >
              <div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-muted text-foreground">
                <Icon className="size-4" />
              </div>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {detail}
              </p>
              <p className="mt-auto border-t border-border/70 pt-3 font-mono text-[11px] text-primary">
                {tech}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* HARDWARE + STACK */}
      <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-6">
        <div className="flex flex-col rounded-3xl border border-border/70 bg-gradient-to-br from-primary/10 via-card to-card p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Made for modest hardware
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            Lightweight by intention.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            The target is a 16 GB dual-channel laptop: use a quantized 3B model,
            avoid unnecessary background work, and release model memory after a
            short idle period.
          </p>
          <div className="mt-auto flex flex-wrap gap-2 pt-7">
            {[
              { icon: Cpu, label: "Quantized inference" },
              { icon: Moon, label: "Idle sleep" },
              { icon: Power, label: "On-demand loading" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-2 text-xs font-medium"
              >
                <Icon className="size-3.5 text-primary" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col rounded-3xl border border-border/70 bg-card/60 p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <Layers3 className="size-5 text-primary" />
            <h2 className="text-xl font-semibold tracking-tight">
              Planned technology
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium text-foreground/80 sm:text-sm"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-auto flex items-start gap-3 rounded-xl bg-muted/50 p-4">
            <Shield className="mt-0.5 size-4 shrink-0 text-primary" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              Model acceleration and Windows hardware integrations depend on the
              target machine and will be validated during implementation.
            </p>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section>
        <SectionHeader
          eyebrow="Roadmap"
          title="A deliberate path to Jo."
          description="Start with a dependable local core, then add the interface and senses around it."
        />
        <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {phases.map(({ number, title, description, status }, index) => {
            const isCurrent = index === 0;
            const isLast = index === phases.length - 1;
            return (
              <li
                key={number}
                className={`flex h-full flex-col rounded-2xl border p-5 ${
                  isCurrent
                    ? "border-primary/30 bg-primary/5"
                    : "border-border/70 bg-card/50"
                } ${isLast ? "md:col-span-2 xl:col-span-1" : ""}`}
              >
                <div className="mb-7 flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-primary">
                    {number}
                  </span>
                  {isCurrent ? (
                    <CircleDot className="size-4 text-primary" />
                  ) : (
                    <Circle className="size-4 text-muted-foreground/50" />
                  )}
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
                <p className="mt-auto border-t border-border/70 pt-3 text-xs font-medium text-foreground/75">
                  {status}
                </p>
              </li>
            );
          })}
        </ol>
      </section>

      {/* DEVLOGS */}
      <section id="devlogs" className="scroll-mt-24">
        <SectionHeader
          eyebrow="Build log"
          title="Every update, as it happens."
          description="Follow the latest progress and notes from building Josephine."
        />
        {/* <DevlogsGrid /> */}
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-card px-6 py-12 text-center sm:px-10 sm:py-16">
        <Sparkles className="mx-auto mb-4 size-6 text-primary" />
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Less assistant theater. More getting things done.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Josephine is a work in progress—an experiment in making on-device AI
          feel personal, practical, and respectful of your attention.
        </p>
        <Link
          href="/projects"
          className={buttonVariants({
            variant: "outline",
            className: "mt-8 inline-flex items-center gap-2",
          })}
        >
          More projects <ArrowRight className="size-4" />
        </Link>
      </section>
    </main>
  );
}
