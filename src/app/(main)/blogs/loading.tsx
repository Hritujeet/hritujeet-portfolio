import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
    return (
        <main className="mx-auto min-h-[60vh] max-w-5xl px-5 pb-24 sm:px-8">
            <header className="mx-auto mb-10 mt-12 max-w-3xl border-b border-border pb-7 sm:mb-14 sm:mt-16">
                <Skeleton className="mb-3 h-4 w-20" />
                <Skeleton className="h-10 w-full max-w-lg sm:h-12" />
                <Skeleton className="mt-4 h-5 w-full max-w-xl" />
            </header>

            <div className="mx-auto max-w-3xl divide-y divide-border/70">
                {[1, 2, 3, 4, 5].map((i) => (
                    <article key={i} className="grid grid-cols-[minmax(0,1fr)_6rem] items-center gap-5 py-7 first:pt-0 sm:grid-cols-[minmax(0,1fr)_11rem] sm:gap-8 sm:py-8">
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-6 w-4/5 sm:h-7" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="mt-4 h-4 w-24" />
                        </div>
                        <Skeleton className="aspect-square w-full rounded-sm" />
                    </article>
                ))}
            </div>
        </main>
    );
};

export default Loading;
