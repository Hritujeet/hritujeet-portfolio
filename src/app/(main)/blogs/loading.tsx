import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

const loading = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 min-h-[50vh] py-16">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="flex flex-col h-full overflow-hidden">
                    <Skeleton className="h-48 w-full rounded-none" />
                    <CardHeader>
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-6 w-1/2" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                    </CardContent>
                    <CardFooter className="mt-auto justify-between border-t border-border/50 pt-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-9 w-24" />
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default loading;
