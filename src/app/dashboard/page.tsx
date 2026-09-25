import AdminHome from "@/components/AdminHome";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AdminDashboard = () => {
    return (
        <div>
            <Suspense
                fallback={
                    <div className="min-h-screen bg-background p-6">
                        <div className="max-w-7xl mx-auto space-y-8">
                            {/* Header Skeleton */}
                            <div className="mb-8">
                                <Skeleton className="h-10 w-48 mb-2" />
                                <Skeleton className="h-4 w-72" />
                            </div>

                            {/* Stats Grid Skeleton */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[1, 2, 3, 4].map((i) => (
                                    <Card key={i}>
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <Skeleton className="w-14 h-14 rounded-lg" />
                                            </div>
                                            <Skeleton className="h-4 w-24 mb-2" />
                                            <Skeleton className="h-10 w-16" />
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Quick Actions Skeleton */}
                            <Card>
                                <CardContent className="p-8">
                                    <Skeleton className="h-8 w-40 mb-6" />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Skeleton className="h-16 w-full rounded-lg" />
                                        <Skeleton className="h-16 w-full rounded-lg" />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Recent Activity Skeleton */}
                            <Card>
                                <CardContent className="p-8">
                                    <Skeleton className="h-8 w-48 mb-4" />
                                    <div className="space-y-3">
                                        <Skeleton className="h-12 w-full" />
                                        <Skeleton className="h-12 w-full" />
                                        <Skeleton className="h-12 w-full" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                }
            >
                <AdminHome />
            </Suspense>
        </div>
    );
};

export default AdminDashboard;