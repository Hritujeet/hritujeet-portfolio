import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <main className="container mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-5 border-b border-border/70 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-8 w-56" />
                    <Skeleton className="h-4 w-full max-w-sm" />
                </div>
                <Skeleton className="h-9 w-32 rounded-full" />
            </div>

            {/* Project card grid */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                        key={i}
                        className="flex min-h-56 flex-col justify-between gap-8 rounded-xl border bg-card p-6"
                    >
                        <div className="flex items-start justify-between">
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="size-9 rounded-lg" />
                        </div>
                        <div className="space-y-3">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="mt-2 h-3 w-28" />
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}