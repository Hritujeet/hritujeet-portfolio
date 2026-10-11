import { cache } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import DevlogContent from "@/components/DevlogContent";
import { prisma } from "@/utils/db";
import { formatDate } from "@/utils/utils";

export const dynamic = "force-dynamic";

const getDevlog = cache((id: string) =>
  prisma.devlog.findFirst({
    where: {
      id,
      NOT: {
        title: {
          startsWith: "Sample:",
        },
      },
    },
  })
);

type DevlogPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: DevlogPageProps): Promise<Metadata> {
  const { id } = await params;
  const devlog = await getDevlog(id);

  if (!devlog) {
    return { title: "Devlog not found" };
  }

  return {
    title: devlog.title,
    description: devlog.content.replace(/[#*`>\-\[\]]/g, "").slice(0, 160),
  };
}

export default async function DevlogPage({ params }: DevlogPageProps) {
  const { id } = await params;
  const devlog = await getDevlog(id);

  if (!devlog) {
    notFound();
  }

  return (
    <main className="min-h-[60vh] px-5 pb-24 pt-10 sm:px-8 sm:pt-16">
      <article className="mx-auto max-w-[720px]">
        <Link
          href="/devlogs"
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
            className: "mb-10 -ml-3 text-muted-foreground",
          })}
        >
          <ArrowLeft className="size-4" />
          All devlogs
        </Link>

        <header className="mb-10 border-b border-border pb-8 sm:mb-12">
          <p className="mb-4 text-sm font-medium text-primary">Build log</p>
          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            {devlog.title}
          </h1>
          <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Hritujeet Sharma</span>
            <span aria-hidden="true">·</span>
            <time dateTime={devlog.createdAt.toISOString()}>
              {formatDate(devlog.createdAt.toISOString())}
            </time>
          </div>
        </header>

        <DevlogContent content={devlog.content} />
      </article>
    </main>
  );
}
