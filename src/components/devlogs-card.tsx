"use client";

import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DevlogContent from "@/components/DevlogContent";
import { buttonVariants } from "@/components/ui/button";
import { formatDate } from "@/utils/utils";
import { ArrowUpRight } from "lucide-react";

type DevlogsCardProps = {
  id: string;
  title: string;
  content: string;
  createdAt: Date | string;
  compact?: boolean;
  showContent?: boolean;
};

export function DevlogsCard({
  id,
  title,
  content,
  createdAt,
  compact = false,
  showContent = true,
}: DevlogsCardProps) {
  const paragraphs = content
    .replace(/^#{1,6}\s+.*$/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/[*_`]/g, "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <article className="border-b border-border/70 py-8 first:pt-0 last:border-b-0">
      <div className="max-w-3xl">
        <p className="mb-3 text-xs font-medium text-muted-foreground">
          {formatDate(createdAt.toString())}
        </p>
        <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        {showContent && (
          <div className={`mt-4 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base ${compact ? "line-clamp-3" : ""}`}>
            {(compact ? paragraphs.slice(0, 1) : paragraphs).map((paragraph, index) => (
              <p key={index}>{paragraph.replace(/^#+\s*/, "").replace(/\*\*/g, "")}</p>
            ))}
          </div>
        )}
        <Dialog>
          <DialogTrigger className={`${showContent ? "mt-4" : "mt-3"} inline-flex min-h-10 items-center rounded-md text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30`}>
            Read devlog <span className="ml-1" aria-hidden="true">→</span>
          </DialogTrigger>
          <DialogContent className="grid max-h-[88dvh] max-w-[min(720px,calc(100%-2rem))] grid-rows-[auto_minmax(0,1fr)] gap-0 overflow-hidden border-border bg-background p-0 sm:max-w-[720px]">
            <DialogHeader className="border-b border-border px-6 py-6 pr-14 sm:px-10">
              <DialogDescription>{formatDate(createdAt.toString())} · Build log</DialogDescription>
              <DialogTitle className="text-2xl font-semibold leading-tight sm:text-3xl">
                {title}
              </DialogTitle>
            </DialogHeader>
            <div className="overflow-y-auto px-6 py-6 sm:px-10 sm:py-8">
              <DevlogContent content={content} />
              <p className="border-t border-border pt-5 text-sm text-muted-foreground">
                Hritujeet Sharma
              </p>
              <Link
                href={`/devlogs/${id}`}
                className={buttonVariants({
                  variant: "link",
                  className: "mt-3 h-auto px-0",
                })}
              >
                Open as a page <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </article>
  );
}
