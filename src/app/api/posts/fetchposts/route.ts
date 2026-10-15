import { NextResponse } from "next/server";
import { prisma } from "../../../../utils/db";
import { withPrismaRetry } from "@/lib/prismaRetry";

export async function GET() {
    try {
        const posts = await withPrismaRetry(() =>
            prisma.blogPost.findMany({
                orderBy: { createdAt: "desc" },
            })
        );
        return NextResponse.json({ msg: "hello", posts });
    } catch (error) {
        console.error("[api/posts/fetchposts] DB error after retries:", error);
        return NextResponse.json(
            { error: "Database temporarily unavailable. Please try again later.", posts: [] },
            { status: 503 }
        );
    }
}
