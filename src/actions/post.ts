"use server";
import { prisma } from "@/utils/db";
import { blogSchema } from "@/utils/utils";
import slugify from "slugify";
import z from "zod";

export const postBlog = async (blog: z.infer<typeof blogSchema>) => {
    try {
        if (!blog) {
            throw new Error("Blog not found");
        }

        const validatedBlog = blogSchema.parse(blog);

        const slug = slugify(validatedBlog.title, {
            lower: true,
            locale: "en",
            strict: true, // Remove special characters
        });

        console.log("Creating blog with slug:", slug);

        const createdBlog = await prisma.blogPost.create({
            data: {
                title: validatedBlog.title,
                content: validatedBlog.content,
                img: validatedBlog.image,
                slug: slug,
                description: validatedBlog.description,
            },
        });

        console.log("Blog created successfully:", createdBlog);
        return { success: true, slug: createdBlog.slug };
    } catch (error) {
        console.error("Error creating blog:", error);
        throw error; // Re-throw the error so it can be handled by the mutation
    }
};
