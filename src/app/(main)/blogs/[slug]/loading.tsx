import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <main className="pb-20">
            <header className="mx-auto max-w-4xl px-5 pb-8 pt-12 sm:px-8 sm:pt-16 lg:pt-20">
                <Skeleton className="mb-5 h-4 w-40" />
                <Skeleton className="h-12 w-full max-w-3xl sm:h-16" />
                <Skeleton className="mt-3 h-12 w-4/5 max-w-2xl" />
                <Skeleton className="mt-6 h-5 w-full max-w-2xl" />
                <Skeleton className="mt-2 h-5 w-3/4 max-w-xl" />
                <Skeleton className="mt-8 h-12 w-full max-w-3xl border-b" />
            </header>
            <Skeleton className="mx-auto mb-12 aspect-[16/8] w-full max-w-5xl sm:mb-16" />
            <article className="mx-auto max-w-[680px] space-y-5 px-5 sm:px-8">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6" />
                <Skeleton className="mt-10 h-8 w-2/3" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />
            </article>
        </main>
    );
}
