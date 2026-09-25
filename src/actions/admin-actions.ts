"use server";

import z from "zod";
import { prisma } from "../utils/db";
import { projectSchema } from "../utils/utils";
import { revalidatePath } from "next/cache";

export const addProject = async (
    data: z.infer<typeof projectSchema>,
    techStack: string[]
) => {
    if (data && techStack) {
        const newProject = {
            ...data,
            techStack,
        };

        try {
            await prisma.project.create({
                data: {
                    title: newProject.title,
                    decription: newProject.description,
                    link: newProject.github,
                    techStack: newProject.techStack,
                },
            });
            revalidatePath("/dashboard/manageProjects");
        } catch (error) {
            console.log(error);
            throw new Error("Internal Server Error");
        }
    } else {
        throw new Error("Empty Input");
    }
};

export const deleteProject = async (id: string) => {
    try {
        await prisma.project.delete({ where: { id } });
        revalidatePath("/dashboard/manageProjects");
    } catch (error) {
        console.error("Error deleting project:", error);
        throw new Error("Failed to delete project");
    }
};

export const updateProject = async (id: string, data: any) => {
    try {
        await prisma.project.update({
            where: { id },
            data: {
                title: data.title,
                decription: data.description,
                link: data.link,
            },
        });
        revalidatePath("/dashboard/manageProjects");
    } catch (error) {
        console.error("Error updating project:", error);
        throw new Error("Failed to update project");
    }
};

export const deleteBlog = async (id: string) => {
    try {
        await prisma.blogPost.delete({ where: { id } });
        revalidatePath("/dashboard/manageBlogs");
        revalidatePath("/blogs");
    } catch (error) {
        console.error("Error deleting blog:", error);
        throw new Error("Failed to delete blog");
    }
};

export const updateBlog = async (id: string, data: { title: string; description: string; img: string }) => {
    try {
        await prisma.blogPost.update({
            where: { id },
            data: {
                title: data.title,
                description: data.description,
                img: data.img,
            },
        });
        revalidatePath("/dashboard/manageBlogs");
        revalidatePath("/blogs");
    } catch (error) {
        console.error("Error updating blog:", error);
        throw new Error("Failed to update blog");
    }
};
