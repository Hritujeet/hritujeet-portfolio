import {NextResponse} from "next/server";
import {prisma} from "../../../../../utils/db";

export async function GET() {
    const projects = await prisma.project.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
    return NextResponse.json({msg: "This is get projects", projects})
}