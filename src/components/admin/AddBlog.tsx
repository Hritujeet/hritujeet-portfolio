"use client";

import TiptapEditorBlog from "./TipTapEditorBlog";

const AddBlog = () => {
    return (
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 md:py-10">
            <h1 className="text-4xl mb-10 font-bold tracking-tight leading-tight">
                Add Blog 📒
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
                    <label htmlFor="cover-img" className="font-bold">
                        Cover Image
                    </label>
                    <input
                        type="text"
                        className="input w-full border outline-none focus:border-accent focus:ring-0"
                        placeholder="Cover Image Link"
                        id="cover-img"
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
                <TiptapEditorBlog />
                <button className="btn btn-accent w-fit">Add Blog</button>
            </div>
        </div>
    );
};

export default AddBlog;
