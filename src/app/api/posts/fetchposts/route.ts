import {NextResponse} from "next/server";
import {prisma} from "../../../../../utils/db";

export async function GET(){
    const posts = await prisma.blogPost.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
    return NextResponse.json({msg: "hello", posts})
}
