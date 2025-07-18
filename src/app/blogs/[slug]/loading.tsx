import React from 'react'

export default function loading() {
    return (
        <section className="px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 lg:py-20 bg-base-100">
            <div className="max-w-4xl mx-auto">
                {/* Blog Header Skeleton */}
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <div className="skeleton h-8 sm:h-10 lg:h-12 w-3/4 mx-auto mb-4"></div>
                    <div className="skeleton h-4 sm:h-5 lg:h-6 w-1/2 mx-auto"></div>
                </div>

                {/* Featured Image Skeleton */}
                <div className="skeleton w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[28rem] rounded-2xl mb-8 sm:mb-12 lg:mb-16"></div>

                {/* Blog Content Container Skeleton */}
                <div className="card bg-base-200 shadow-sm">
                    <div className="card-body p-6 sm:p-8 lg:p-12">
                        {/* Blog Meta Info Skeleton */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
                            <div className="flex items-center gap-3">
                                <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
                                <div className="space-y-2">
                                    <div className="skeleton h-4 w-20"></div>
                                    <div className="skeleton h-3 w-16"></div>
                                </div>
                            </div>
                            <div className="skeleton h-3 w-32"></div>
                        </div>

                        {/* Blog Content Skeleton */}
                        <div className="space-y-6">
                            {/* Title */}
                            <div className="skeleton h-6 sm:h-8 w-full"></div>
                            <div className="skeleton h-6 sm:h-8 w-3/4"></div>
                            
                            {/* Paragraphs */}
                            <div className="space-y-4">
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-4 w-5/6"></div>
                            </div>

                            {/* Subheading */}
                            <div className="skeleton h-5 sm:h-6 w-2/3 mt-8"></div>
                            
                            {/* More paragraphs */}
                            <div className="space-y-4">
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-4 w-4/5"></div>
                            </div>

                            {/* Info box skeleton */}
                            <div className="bg-base-300 rounded-lg p-6 space-y-3">
                                <div className="skeleton h-5 w-1/3"></div>
                                <div className="skeleton h-3 w-3/4"></div>
                                <div className="skeleton h-3 w-2/3"></div>
                                <div className="skeleton h-3 w-5/6"></div>
                                <div className="skeleton h-3 w-1/2"></div>
                            </div>

                            {/* Another subheading */}
                            <div className="skeleton h-5 sm:h-6 w-1/2 mt-8"></div>
                            
                            {/* Final paragraphs */}
                            <div className="space-y-4">
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-4 w-3/4"></div>
                            </div>

                            {/* Quote box skeleton */}
                            <div className="bg-primary/10 border-l-4 border-primary p-6">
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-4 w-2/3 mt-2"></div>
                            </div>

                            {/* More content */}
                            <div className="space-y-4">
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-4 w-5/6"></div>
                            </div>
                        </div>

                        {/* Blog Tags Skeleton */}
                        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-base-300">
                            <div className="flex flex-wrap gap-2">
                                <div className="skeleton h-6 w-16 rounded-full"></div>
                                <div className="skeleton h-6 w-20 rounded-full"></div>
                                <div className="skeleton h-6 w-24 rounded-full"></div>
                                <div className="skeleton h-6 w-18 rounded-full"></div>
                                <div className="skeleton h-6 w-22 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Skeleton */}
                <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <div className="skeleton h-12 flex-1 rounded-lg"></div>
                    <div className="skeleton h-12 flex-1 rounded-lg"></div>
                </div>
            </div>
        </section>
    );
}