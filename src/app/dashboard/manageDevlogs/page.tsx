import Link from "next/link";
import { prisma } from "@/utils/db";
import DevlogsTable from "./DevlogsTable";

export default async function ManageDevlogsPage() {
    const devlogs = await prisma.devlog.findMany({
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return (
        <div className="mx-auto w-full max-w-6xl p-4 md:p-8">
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Manage Devlogs</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        View, edit, or delete your devlogs.
                    </p>
                </div>
                <Link
                    href="/dashboard/addDevlog"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                    Add Devlog
                </Link>
            </div>
            <DevlogsTable devlogs={devlogs} />
        </div>
    );
}
