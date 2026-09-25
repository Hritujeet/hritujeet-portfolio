import React from 'react'
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function loading() {
    return (
        <section className="px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 lg:py-20 bg-background">
            <div className="max-w-4xl mx-auto">
                {/* Blog Header Skeleton */}
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <Skeleton className="h-8 sm:h-10 lg:h-12 w-3/4 mx-auto mb-4" />
                    <Skeleton className="h-4 sm:h-5 lg:h-6 w-1/2 mx-auto" />
                </div>

                {/* Featured Image Skeleton */}
                <Skeleton className="w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[28rem] rounded-2xl mb-8 sm:mb-12 lg:mb-16" />

                {/* Blog Content Container Skeleton */}
                <Card className="shadow-sm border-border/50">
                    <CardContent className="p-6 sm:p-8 lg:p-12">
                        {/* Blog Meta Info Skeleton */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8 pb-6 border-b border-border/50">
                            <div className="flex items-center gap-3">
                                <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-3 w-16" />
                                </div>
                            </div>
                            <Skeleton className="h-3 w-32" />
                        </div>

                        {/* Blog Content Skeleton */}
                        <div className="space-y-6">
                            {/* Title */}
                            <Skeleton className="h-6 sm:h-8 w-full" />
                            <Skeleton className="h-6 sm:h-8 w-3/4" />
                            
                            {/* Paragraphs */}
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>

                            {/* Subheading */}
                            <Skeleton className="h-5 sm:h-6 w-2/3 mt-8" />
                            
                            {/* More paragraphs */}
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-4/5" />
                            </div>

                            {/* Info box skeleton */}
                            <div className="bg-muted rounded-lg p-6 space-y-3">
                                <Skeleton className="h-5 w-1/3" />
                                <Skeleton className="h-3 w-3/4" />
                                <Skeleton className="h-3 w-2/3" />
                                <Skeleton className="h-3 w-5/6" />
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                        </div>

                        {/* Navigation Skeleton */}
                        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-border/50">
                            <Skeleton className="h-12 flex-1 rounded-lg" />
                            <Skeleton className="h-12 flex-1 rounded-lg" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}