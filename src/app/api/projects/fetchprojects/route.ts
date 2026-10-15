import { NextResponse } from "next/server";
import { prisma } from "../../../../utils/db";
import { withPrismaRetry } from "@/lib/prismaRetry";

export async function GET() {
    try {
        const projects = await withPrismaRetry(() =>
            prisma.project.findMany({
                orderBy: { createdAt: "desc" },
            })
        );
        return NextResponse.json({ msg: "This is get projects", projects });
    } catch (error) {
        console.error("[api/projects/fetchprojects] DB error after retries:", error);
        return NextResponse.json(
            { error: "Database temporarily unavailable. Please try again later.", projects: [] },
            { status: 503 }
        );
    }
}
