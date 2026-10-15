"use server";

import z from "zod";
import { prisma } from "../utils/db";
import { projectSchema } from "../utils/utils";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";
import { isAdminEmail } from "@/utils/admin";

const devlogSchema = z.object({
    title: z.string().trim().min(1).max(200),
    content: z.string().trim().min(1),
});

const requireAdmin = async () => {
    const user = await currentUser();

    if (
        !user ||
        !user.emailAddresses.some(({ emailAddress }) =>
            isAdminEmail(emailAddress, process.env.ADMIN)
        )
    ) {
        throw new Error("Unauthorized");
    }
};

export const addDevlog = async (data: z.infer<typeof devlogSchema>) => {
    await requireAdmin();
    const validatedData = devlogSchema.parse(data);

    const devlog = await prisma.devlog.create({
        data: validatedData,
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/manageDevlogs");
    revalidatePath("/devlogs");

    return devlog.id;
};

export const updateDevlog = async (
    id: string,
    data: z.infer<typeof devlogSchema>
) => {
    await requireAdmin();
    const validatedData = devlogSchema.parse(data);

    await prisma.devlog.update({
        where: { id },
        data: validatedData,
    });

    revalidatePath("/dashboard/manageDevlogs");
    revalidatePath("/devlogs");
    revalidatePath(`/devlogs/${id}`);
};

export const deleteDevlog = async (id: string) => {
    await requireAdmin();

    await prisma.devlog.delete({
        where: { id },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/manageDevlogs");
    revalidatePath("/devlogs");
    revalidatePath(`/devlogs/${id}`);
};

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
