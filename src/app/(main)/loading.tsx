import { Skeleton } from "@/components/ui/skeleton";

// Shown while the home page server components (Featured, DevlogsGrid) are streaming
export default function Loading() {
    return (
        <section className="container px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 mx-auto space-y-8">
            {/* Hero skeleton */}
            <section className="mx-auto w-full py-16 space-y-5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-14 w-3/4 sm:h-20" />
                <Skeleton className="h-14 w-1/2 sm:h-20" />
                <Skeleton className="h-5 w-full max-w-lg" />
                <Skeleton className="h-5 w-2/3 max-w-md" />
                <div className="flex gap-3 pt-4">
                    <Skeleton className="h-10 w-32 rounded-full" />
                    <Skeleton className="h-10 w-28 rounded-full" />
                </div>
            </section>

            {/* Featured posts skeleton */}
            <section className="my-24">
                <div className="mb-8 flex items-end justify-between gap-4">
                    <div className="space-y-2">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-8 w-48" />
                    </div>
                    <Skeleton className="h-8 w-28 hidden sm:block" />
                </div>
                <div className="mx-auto max-w-4xl divide-y divide-border">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="grid grid-cols-[minmax(0,1fr)_6rem] items-center gap-5 py-7 sm:grid-cols-[minmax(0,1fr)_11rem] sm:gap-8">
                            <div className="space-y-2">
                                <Skeleton className="h-3 w-40" />
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-6 w-4/5" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                            <Skeleton className="aspect-square w-full rounded-sm" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Devlogs skeleton */}
            <section className="my-24">
                <div className="mb-8 flex items-end justify-between gap-4">
                    <div className="space-y-2">
                        <Skeleton className="h-3 w-28" />
                        <Skeleton className="h-8 w-48" />
                    </div>
                    <Skeleton className="h-8 w-28 hidden sm:block" />
                </div>
                <div className="mx-auto max-w-4xl divide-y divide-border">
                    {[1, 2].map((i) => (
                        <div key={i} className="space-y-3 py-7">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-6 w-2/3" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    ))}
                </div>
            </section>
        </section>
    );
}