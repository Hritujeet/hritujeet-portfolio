import { DevlogsCard } from "@/components/devlogs-card";
import { prisma } from "@/utils/db";

type DevlogsGridProps = {
  limit?: number;
  compact?: boolean;
};

export default async function DevlogsGrid({ limit, compact = false }: DevlogsGridProps) {
  const devlogs = await prisma.devlog.findMany({
    where: {
      NOT: {
        title: {
          startsWith: "Sample:",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
    },
  });

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
        />
      ))}
    </div>
  );
}
