
import { cache } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import DevlogContent from "@/components/DevlogContent";
import { prisma } from "@/utils/db";
import { withPrismaRetry } from "@/lib/prismaRetry";
import { formatDate } from "@/utils/utils";

const getDevlog = cache((id: string) =>
  withPrismaRetry(() =>
    prisma.devlog.findUnique({
      where: { id },
    })
  )
);

export default async function DevlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let devlog;

  try {
    devlog = await getDevlog(id);
  } catch (error) {
    console.error("[devlogs/id] Failed to fetch devlog after retries:", error);
    return (
      <main className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
        <p className="text-lg font-medium text-foreground">
          Devlog temporarily unavailable
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;re experiencing a database outage. Please try again in a few
          minutes.
        </p>
      </main>
    );
  }

  if (!devlog) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-10 sm:px-8 sm:pt-16">
      <Link
        href="/devlogs"
        className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All devlogs
      </Link>

      <article>
        <header className="mb-10 border-b border-border pb-8 sm:mb-12">
          <p className="mb-4 text-sm font-medium text-primary">
            {formatDate(devlog.createdAt.toString())} · Build log
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            {devlog.title}
          </h1>
        </header>

        <DevlogContent content={devlog.content} />

        <footer className="mt-12 border-t border-border pt-5 text-sm text-muted-foreground">
          Hritujeet Sharma
        </footer>
      </article>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const devlog = await getDevlog(id);

  return {
    title: devlog?.title ?? "Devlog Not Found",
    description: devlog
      ? `A build log from Hritujeet Sharma: ${devlog.title}`
      : "Devlog not found.",
  };
}