import AdminHome from "@/components/AdminHome";
import React, { Suspense } from "react";

const AdminDashboard = () => {
    return (
        <div>
            <Suspense
                fallback={
                    <div className="min-h-screen bg-base-100 p-6">
                        <div className="max-w-7xl mx-auto space-y-8">
                            {/* Header Skeleton */}
                            <div className="mb-8">
                                <div className="skeleton h-10 w-48 mb-2"></div>
                                <div className="skeleton h-4 w-72"></div>
                            </div>

                            {/* Stats Grid Skeleton */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[1, 2, 3, 4].map((i) => (
                                    <div 
                                        key={i}
                                        className="bg-base-200 rounded-xl p-6 shadow-lg"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="skeleton w-14 h-14 rounded-lg"></div>
                                        </div>
                                        <div className="skeleton h-4 w-24 mb-2"></div>
                                        <div className="skeleton h-10 w-16"></div>
                                    </div>
                                ))}
                            </div>

                            {/* Quick Actions Skeleton */}
                            <div className="bg-base-200 rounded-xl p-8 shadow-lg">
                                <div className="skeleton h-8 w-40 mb-6"></div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="skeleton h-16 w-full rounded-lg"></div>
                                    <div className="skeleton h-16 w-full rounded-lg"></div>
                                </div>
                            </div>

                            {/* Recent Activity Skeleton */}
                            <div className="bg-base-200 rounded-xl p-8 shadow-lg">
                                <div className="skeleton h-8 w-48 mb-4"></div>
                                <div className="space-y-3">
                                    <div className="skeleton h-12 w-full"></div>
                                    <div className="skeleton h-12 w-full"></div>
                                    <div className="skeleton h-12 w-full"></div>
                                </div>
                            </div>
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