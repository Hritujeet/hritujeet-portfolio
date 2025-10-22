"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../../utils/db";

export const createComment = async (comment: string, postId: string) => {
    try {
        const user = await currentUser();

        if (!user) {
            throw new Error("Unauthorized Access");
        }

        if (!comment || comment.trim().length < 3) {
            throw new Error("Comment must be at least 3 characters long");
        }

        const newComment = await prisma.comment.create({
            data: {
                content: comment,
                blogPostId: postId,
                userClerkId: user.id,
                userImg: user.imageUrl,
            },
        });

        console.log(newComment);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create comment");
    }
};
