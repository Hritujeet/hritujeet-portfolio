"use client";

import { addProject } from "@/actions/admin-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { projectSchema } from "../../utils/utils";
import Alert from "../Alert";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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
        mutationFn: async ({
            data,
            techStack,
        }: {
            data: z.infer<typeof projectSchema>;
            techStack: string[];
        }) => {
            await addProject(data, techStack);
        },

        onSuccess: () => {
            queryClient.invalidateQueries();
            toast.success("The project has been added succesfully");
            reset();
            setTechStack([]);
        },

        onError: (error: Error) => {
            console.log(error);
            toast.error("An error occurred while adding project!");
        },
    });

    const myHandler = (data: z.infer<typeof projectSchema>) => {
        if (techStack.length <= 0) {
            toast.error(
                "The project should have at least one technology under its tech stack!"
            );
            return;
        }
        mutation.mutate({ data, techStack });
    };

    const addStack = () => {
        if (inputVal.length < 3) {
            toast.error("The tech name should have at least 3 characters.");
        } else {
            setTechStack([...techStack, inputVal]);
            setinputVal("");
        }
    };
    return (
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 md:py-10 max-w-4xl mx-auto">
            <h1 className="text-4xl mb-10 font-bold tracking-tight leading-tight text-foreground">
                Add Project 👨‍💻
            </h1>
            <Card className="my-4 pt-6">
                <CardContent>
                    <form
                        onSubmit={handleSubmit(myHandler)}
                        className="space-y-6"
                    >
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                type="text"
                                className={`${errors.errors.title && "border-destructive focus-visible:ring-destructive"}`}
                                placeholder="Project Title"
                                id="title"
                                disabled={mutation.isPending}
                                {...register("title")}
                            />
                            {errors.errors.title && (
                                <Alert variant="error">
                                    {errors.errors.title.message}
                                </Alert>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="github">Github</Label>
                            <Input
                                type="text"
                                className={`${errors.errors.github && "border-destructive focus-visible:ring-destructive"}`}
                                placeholder="Github Link"
                                id="github"
                                disabled={mutation.isPending}
                                {...register("github")}
                            />
                            {errors.errors.github && (
                                <Alert variant="error">
                                    {errors.errors.github.message}
                                </Alert>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="desc">Description</Label>
                            <Textarea
                                className={`min-h-[120px] ${errors.errors.description && "border-destructive focus-visible:ring-destructive"}`}
                                placeholder="Project Description"
                                id="desc"
                                disabled={mutation.isPending}
                                {...register("description")}
                            />
                            {errors.errors.description && (
                                <Alert variant="error">
                                    {errors.errors.description.message}
                                </Alert>
                            )}
                        </div>
                        <div className="w-full mt-8">
                            <div className="flex flex-col gap-4">
                                <div>
                                    <Label htmlFor="tech" className="text-lg block mb-1">
                                        Tech Stack
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Add technologies used in your project
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 p-5 bg-muted rounded-xl border">
                                    {techStack.length > 0 &&
                                        techStack.map((tech: string, index: number) => (
                                            <div
                                                key={index}
                                                className="px-3 py-1 bg-background rounded-md border text-foreground font-medium shadow-sm"
                                            >
                                                {tech}
                                            </div>
                                        ))}
                                    {techStack.length <= 0 && (
                                        <div className="w-full text-muted-foreground">
                                            No Tech Stacks added yet
                                        </div>
                                    )}
                                </div>

                                <div className="flex w-full gap-3 items-center">
                                    <Input
                                        type="text"
                                        placeholder="Enter technology name"
                                        id="tech"
                                        value={inputVal}
                                        disabled={mutation.isPending}
                                        onChange={(e) => {
                                            setinputVal(e.target.value);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                if (inputVal.length >= 3 && !mutation.isPending) {
                                                    addStack();
                                                }
                                            }
                                        }}
                                    />
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        disabled={inputVal.length < 3 || mutation.isPending}
                                        onClick={() => {
                                            addStack();
                                        }}
                                    >
                                        <PlusIcon className="w-5 h-5 mr-2" /> Add
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="pt-6">
                            <Button
                                type="submit"
                                size="lg"
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {mutation.isPending ? "Adding Project..." : "Add Project"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddProject;
