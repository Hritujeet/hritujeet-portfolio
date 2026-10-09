import { DevlogsCard } from "@/components/devlogs-card";
import { prisma } from "@/utils/db";

type DevlogsGridProps = {
  limit?: number;
};

export default async function DevlogsGrid({ limit }: DevlogsGridProps) {
  const devlogs = await prisma.devlog.findMany({
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
    <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
      {devlogs.map((devlog) => (
        <DevlogsCard
          key={devlog.id}
          title={devlog.title}
          content={devlog.content}
          createdAt={devlog.createdAt}
        />
      ))}
    </div>
  );
}
