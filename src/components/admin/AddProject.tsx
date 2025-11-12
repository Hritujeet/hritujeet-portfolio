"use client";

import { addProject } from "@/actions/admin-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { projectSchema } from "../../../utils/utils";

const AddProject = () => {
    const [techStack, setTechStack] = useState<string[]>([]);
    const [inputVal, setinputVal] = useState("");
    const queryClient = useQueryClient();
    const {
        register,
        reset,
        handleSubmit,
        formState: errors,
    } = useForm({
        resolver: zodResolver(projectSchema),
    });

    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof projectSchema>) => {
            await addProject(data, techStack);
        },

        onSuccess: () => {
            queryClient.invalidateQueries();
            toast.success("The project has been added succesfully");
        },
    });

    const myHandler = (data: z.infer<typeof projectSchema>) => {
        if (techStack.length <= 0) {
            toast.error(
                "The project should have at least one technology under its tech stack!"
            );
        } else {
            mutation.mutate(data);
            reset();
        }
    };

    const addStack = () => {
        let a = techStack;
        if (inputVal.length < 3) {
            toast.error("The tech name should have at least 3 characters.");
        } else {
            a.push(inputVal);
            setTechStack(a);
            setinputVal("");
        }
    };
    return (
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 md:py-10">
            <h1 className="text-4xl mb-10 font-bold tracking-tight leading-tight">
                Add Project 👨‍💻
            </h1>
            <form
                onSubmit={handleSubmit(myHandler)}
                className="card my-4 p-4 space-y-5 scale-100 hover:scale-100"
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="title" className="font-bold">
                        Title
                    </label>
                    <input
                        type="text"
                        className={`input w-full border outline-none focus:border-accent focus:ring-0 ${
                            errors.errors.title && "border-red-500"
                        }`}
                        placeholder="Blog Title"
                        id="title"
                        {...register("title")}
                    />
                    {errors.errors.title && (
                        <span className="text-red-500">
                            Title should have at least 4 characters
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="github" className="font-bold">
                        Github
                    </label>
                    <input
                        type="text"
                        className={`input w-full border outline-none focus:border-accent focus:ring-0 ${
                            errors.errors.github && "border-red-500"
                        }`}
                        placeholder="Github Link"
                        id="github"
                        {...register("github")}
                    />
                    {errors.errors.github && (
                        <span className="text-red-500">
                            The link must be a valid one
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="desc" className="font-bold">
                        Description
                    </label>
                    <textarea
                        className={`textarea w-full border outline-none focus:border-accent focus:ring-0 ${
                            errors.errors.description && "border-red-500"
                        }`}
                        placeholder="Cover Image Link"
                        id="desc"
                        {...register("description")}
                    ></textarea>
                    {errors.errors.description && (
                        <span className="text-red-500">
                            Description should have at least 6 characters
                        </span>
                    )}
                </div>
                <div className="w-full mx-auto p-8">
                    <div className="flex flex-col gap-4">
                        <div>
                            <label
                                htmlFor="tech"
                                className="text-lg font-semibold text-gray-100 block mb-1"
                            >
                                Tech Stack
                            </label>
                            <p className="text-sm text-gray-400">
                                Add technologies used in your project
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 p-5 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl border border-zinc-800">
                            {techStack.length > 0 &&
                                techStack.map((tech: string, index: number) => (
                                    <div
                                        key={index}
                                        className="p-2 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg border border-zinc-700 text-gray-100 font-medium hover:border-zinc-600 transition-colors"
                                    >
                                        {tech}
                                    </div>
                                ))}
                            {techStack.length <= 0 && (
                                <div className="w-full">
                                    No Tech Stacks added yet
                                </div>
                            )}
                        </div>

                        <div className="flex w-full gap-3 items-center">
                            <input
                                type="text"
                                className="input input-accent"
                                placeholder="Enter technology name"
                                id="tech"
                                value={inputVal}
                                onChange={(e) => {
                                    setinputVal(e.target.value);
                                }}
                            />
                            <button
                                className="btn btn-accent"
                                type="button"
                                disabled={inputVal.length < 3}
                                onClick={() => {
                                    addStack();
                                }}
                            >
                                <PlusIcon className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-accent w-fit">
                    Add Project
                </button>
            </form>
        </div>
    );
};

export default AddProject;
