"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "../utils/db";

export const createComment = async (
    comment: string,
    postId: string,
    slug: string
) => {
    try {
        const user = await currentUser();

        if (!user) {
            throw new Error("Unauthorized Access");
        }

        if (!comment || comment.trim().length < 3) {
            throw new Error("Comment must be at least 3 characters long");
        }

        await prisma.comment.create({
            data: {
                content: comment,
                blogPostId: postId,
                userClerkId: user.id,
                userImg: user.imageUrl,
                user:
                    user.username ||
                    user.fullName ||
                    (user.emailAddresses[0].emailAddress.split(
                        "@"
                    )[0] as string),
            },
        });

        revalidatePath(`/blogs/${slug}`);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create comment");
    }
};
