import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../utils/db";

export async function GET(
    request: NextRequest,
    context: { params: { slug: string } }
) {
    try {
        const slug = context.params.slug;

        if (!slug) {
            return NextResponse.json(
                { error: "Slug is required" },
                { status: 400 }
            );
        }

        const post = await prisma.blogPost.findUnique({
            where: {
                slug,
            },
        });

        return NextResponse.json({
            msg: "This is fetch Post",
            post,
        });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
