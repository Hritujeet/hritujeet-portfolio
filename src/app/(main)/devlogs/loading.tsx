import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <main className="container mx-auto px-5 pb-20 sm:px-8">
            {/* Page header skeleton */}
            <header className="mx-auto mb-12 mt-12 max-w-6xl border-b border-border/70 pb-8 sm:mb-14 sm:mt-16 space-y-3">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-10 w-2/3 sm:h-14" />
                <Skeleton className="h-5 w-full max-w-xl" />
                <Skeleton className="h-5 w-1/2 max-w-sm" />
            </header>

            {/* Devlog list skeleton */}
            <div className="mx-auto max-w-4xl divide-y divide-border/70">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-3 py-8">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="mt-2 h-3 w-20" />
                    </div>
                ))}
            </div>
        </main>
    );
}