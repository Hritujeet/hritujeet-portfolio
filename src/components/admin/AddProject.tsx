"use client";

import { PlusIcon } from "lucide-react";

const AddProject = () => {
    return (
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 md:py-10">
            <h1 className="text-4xl mb-10 font-bold tracking-tight leading-tight">
                Add Project 👨‍💻
            </h1>
            <div className="card my-4 p-4 space-y-5 scale-100 hover:scale-100">
                <div className="flex flex-col gap-1">
                    <label htmlFor="title" className="font-bold">
                        Title
                    </label>
                    <input
                        type="text"
                        className="input w-full border outline-none focus:border-accent focus:ring-0"
                        placeholder="Blog Title"
                        id="title"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="github" className="font-bold">
                        Github
                    </label>
                    <input
                        type="text"
                        className="input w-full border outline-none focus:border-accent focus:ring-0"
                        placeholder="Github Link"
                        id="github"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="desc" className="font-bold">
                        Description
                    </label>
                    <textarea
                        className="textarea w-full border outline-none focus:border-accent focus:ring-0"
                        placeholder="Cover Image Link"
                        id="desc"
                    ></textarea>
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="tech" className="font-bold">
                        Tech Stack
                    </label>
                    <div className="flex flex-col gap-2 bg-zinc-950 p-4 rounded-lg">
                        <div className="py-2 px-4 rounded-lg bg-black">
                            Python
                        </div>
                        <div className="py-2 px-4 rounded-lg bg-black">
                            Django
                        </div>
                        <div className="py-2 px-4 rounded-lg bg-black">
                            Javascript
                        </div>
                    </div>
                    <div className="flex w-full gap-2 justify-center items-center">
                        <input
                            type="text"
                            className="input w-full border outline-none focus:border-accent focus:ring-0"
                            placeholder="Tech Stack Name"
                            id="tech"
                        />
                        <button className="btn btn-accent btn-soft w-fit p-4">
                            <PlusIcon />
                        </button>
                    </div>
                </div>
                <button className="btn btn-accent w-fit">Add Project</button>
            </div>
        </div>
    );
};

export default AddProject;
