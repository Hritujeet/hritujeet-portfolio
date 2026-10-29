import { DevlogsCard } from "@/components/devlogs-card";
import { prisma } from "@/utils/db";
import { withPrismaRetry } from "@/lib/prismaRetry";

type DevlogsGridProps = {
  limit?: number;
  compact?: boolean;
  showContent?: boolean;
};

export default async function DevlogsGrid({
  limit,
  compact = false,
  showContent = true,
}: DevlogsGridProps) {
  let devlogs: Array<{ id: string; title: string; content: string; createdAt: Date }> = [];
  let dbError = false;

  try {
    devlogs = await withPrismaRetry(() =>
      prisma.devlog.findMany({
        where: {
          NOT: {
            title: { startsWith: "Sample:" },
          },
        },
        orderBy: { createdAt: "desc" },
        take: limit,
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
        },
      })
    );
  } catch (error) {
    console.error("[DevlogsGrid] Failed to fetch devlogs after retries:", error);
    dbError = true;
  }

  if (dbError) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        Devlogs are temporarily unavailable — check back in a moment.
      </p>
    );
  }

  if (devlogs.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        No devlogs have been published yet.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-4xl divide-y divide-border/70">
      {devlogs.map((devlog) => (
        <DevlogsCard
          key={devlog.id}
          id={devlog.id}
          title={devlog.title}
          content={devlog.content}
          createdAt={devlog.createdAt}
          compact={compact}
          showContent={showContent}
        />
      ))}
    </div>
  );
}
