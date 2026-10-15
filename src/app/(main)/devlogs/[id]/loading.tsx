import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <main className="min-h-[60vh] px-5 pb-24 pt-10 sm:px-8 sm:pt-16">
            <article className="mx-auto max-w-[720px]">
                {/* Back button */}
                <Skeleton className="mb-10 h-8 w-28" />

                {/* Header */}
                <header className="mb-10 border-b border-border pb-8 sm:mb-12 space-y-4">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-10 w-full sm:h-14" />
                    <Skeleton className="h-10 w-3/4 sm:h-14" />
                    <div className="flex items-center gap-2 pt-2">
                        <Skeleton className="h-3 w-32" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                </header>

                {/* Content */}
                <div className="space-y-4">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-5/6" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="mt-8 h-7 w-1/2" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-4/5" />
                    <Skeleton className="h-5 w-full" />
                </div>
            </article>
        </main>
    );
}