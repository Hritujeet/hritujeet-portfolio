"use server";

import z from "zod";
import { prisma } from "../../utils/db";
import { projectSchema } from "../../utils/utils";

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
        } catch (error) {
            console.log(error);
            throw new Error("Internal Server Error");
        }
    } else {
        throw new Error("Empty Input");
    }
};

export const addBlog = async () => {};
