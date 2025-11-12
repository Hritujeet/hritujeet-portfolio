"use server";

import z from "zod";
import { projectSchema } from "../../utils/utils";

export const addProject = async (
    data: z.infer<typeof projectSchema>,
    techStack: string[]
) => {
    console.log(data);
    console.log(techStack);
    
    
};

export const addBlog = async () => {};
