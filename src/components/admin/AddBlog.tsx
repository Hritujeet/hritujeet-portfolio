"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Bold,
    Code,
    Code2,
    Heading1,
    Heading2,
    Heading3,
    Highlighter,
    Italic,
    Link2,
    List,
    ListOrdered,
    Quote,
    Redo,
    Strikethrough,
    Underline as UnderlineIcon,
    Undo,
} from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Markdown } from "@tiptap/markdown";
import z from "zod";
import { blogSchema } from "../../../utils/utils";
import Alert from "../Alert";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
    if (!editor) return null;

    const addLink = () => {
        const url = window.prompt("Enter URL:");
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    // --- ✨ Modern dark button styling ---
    const buttonClass = (isActive: boolean) =>
        `p-2 rounded-lg flex items-center justify-center transition-all duration-150 
         ${
             isActive
                 ? "bg-zinc-700 text-blue-400 shadow-md shadow-blue-900/40 scale-105"
                 : "text-zinc-400 hover:text-blue-300 hover:bg-zinc-800 hover:shadow-sm hover:shadow-zinc-800/40 active:scale-95"
         }`;
    // --------------------------------------

    return (
        <div className="border-b border-zinc-800 p-2 flex flex-wrap gap-1 bg-zinc-950 sticky top-0 z-10">
            {/* --- Text Styles --- */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={buttonClass(editor.isActive("bold"))}
                title="Bold"
            >
                <Bold size={18} />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={buttonClass(editor.isActive("italic"))}
                title="Italic"
            >
                <Italic size={18} />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={buttonClass(editor.isActive("underline"))}
                title="Underline"
            >
                <UnderlineIcon size={18} />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={buttonClass(editor.isActive("strike"))}
                title="Strikethrough"
            >
                <Strikethrough size={18} />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                className={buttonClass(editor.isActive("highlight"))}
                title="Highlight"
            >
                <Highlighter size={18} />
            </button>

            <div className="w-px bg-zinc-800 mx-1" />

            {/* --- Headings --- */}
            {([1, 2, 3] as const).map((level) => (
                <button
                    type="button"
                    key={level}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level }).run()
                    }
                    className={buttonClass(
                        editor.isActive("heading", { level })
                    )}
                    title={`Heading ${level}`}
                >
                    {level === 1 ? (
                        <Heading1 size={18} />
                    ) : level === 2 ? (
                        <Heading2 size={18} />
                    ) : (
                        <Heading3 size={18} />
                    )}
                </button>
            ))}

            <div className="w-px bg-zinc-800 mx-1" />

            {/* --- Lists + Code --- */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={buttonClass(editor.isActive("bulletList"))}
                title="Bullet List"
            >
                <List size={18} />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={buttonClass(editor.isActive("orderedList"))}
                title="Numbered List"
            >
                <ListOrdered size={18} />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={buttonClass(editor.isActive("blockquote"))}
                title="Blockquote"
            >
                <Quote size={18} />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={buttonClass(editor.isActive("code"))}
                title="Inline Code"
            >
                <Code size={18} />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={buttonClass(editor.isActive("codeBlock"))}
                title="Code Block"
            >
                <Code2 size={18} />
            </button>

            <div className="w-px bg-zinc-800 mx-1" />

            {/* --- Alignment --- */}
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                }
                className={buttonClass(editor.isActive({ textAlign: "left" }))}
                title="Align Left"
            >
                <AlignLeft size={18} />
            </button>

            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                }
                className={buttonClass(
                    editor.isActive({ textAlign: "center" })
                )}
                title="Align Center"
            >
                <AlignCenter size={18} />
            </button>

            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                }
                className={buttonClass(editor.isActive({ textAlign: "right" }))}
                title="Align Right"
            >
                <AlignRight size={18} />
            </button>

            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().setTextAlign("justify").run()
                }
                className={buttonClass(
                    editor.isActive({ textAlign: "justify" })
                )}
                title="Justify"
            >
                <AlignJustify size={18} />
            </button>

            <div className="w-px bg-zinc-800 mx-1" />

            {/* --- Link --- */}
            <button
                type="button"
                onClick={addLink}
                className={buttonClass(editor.isActive("link"))}
                title="Add Link"
            >
                <Link2 size={18} />
            </button>

            <div className="w-px bg-zinc-800 mx-1" />

            {/* --- Undo / Redo --- */}
            <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                className={`p-2 rounded-lg transition-all duration-150 ${
                    editor.can().undo()
                        ? "text-zinc-400 hover:text-blue-300 hover:bg-zinc-800 active:scale-95"
                        : "opacity-30 cursor-not-allowed"
                }`}
                title="Undo"
            >
                <Undo size={18} />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                className={`p-2 rounded-lg transition-all duration-150 ${
                    editor.can().redo()
                        ? "text-zinc-400 hover:text-blue-300 hover:bg-zinc-800 active:scale-95"
                        : "opacity-30 cursor-not-allowed"
                }`}
                title="Redo"
            >
                <Redo size={18} />
            </button>
        </div>
    );
};

const TiptapEditorBlog = ({
    setContent,
}: {
    setContent: Dispatch<SetStateAction<string>>;
}) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Highlight,
            Markdown,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-blue-600 underline cursor-pointer",
                },
            }),
        ],
        content: "",
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none p-4 min-h-[400px]",
            },
        },
        onUpdate: ({ editor }) => {
            setContent(editor.getMarkdown());
        },
    });

    return (
        <div className="w-full mx-auto my-8">
            <h3 className="text-lg font-bold my-2">Content</h3>
            <div className="border border-zinc-800 rounded-lg shadow-lg bg-zinc-900 text-white overflow-hidden">
                <MenuBar editor={editor} />
                <EditorContent editor={editor} className="min-h-[400px]" />
            </div>
        </div>
    );
};

const AddBlog = () => {
    const [content, setContent] = useState<string>("");
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(blogSchema),
    });

    const submitHandler = (data: z.infer<typeof blogSchema>) => {
        if (!content || content.length < 10) {
            toast.error("The content should have at least 10 characters!");
        }
        const myData = {
            title: data.title,
            description: data.description,
            img: data.image,
            content: content,
        };
        console.log(myData);
    };
    return (
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 md:py-10">
            <h1 className="text-4xl mb-10 font-bold tracking-tight leading-tight">
                Add Blog 📒
            </h1>
            <form
                onSubmit={handleSubmit(submitHandler)}
                className="card my-4 p-4 space-y-5 scale-100 hover:scale-100"
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="title" className="font-bold">
                        Title
                    </label>
                    <input
                        type="text"
                        className="input w-full border outline-none focus:border-accent focus:ring-0"
                        placeholder="Blog Title"
                        id="title"
                        {...register("title")}
                    />
                    {errors.title && (
                        <Alert variant="error">{errors.title.message}</Alert>
                    )}
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
                        {...register("image")}
                    />
                    {errors.image && (
                        <Alert variant="error">{errors.image.message}</Alert>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="desc" className="font-bold">
                        Description
                    </label>
                    <textarea
                        className="textarea w-full border outline-none focus:border-accent focus:ring-0"
                        placeholder="Cover Image Link"
                        id="desc"
                        {...register("description")}
                    ></textarea>
                    {errors.description && (
                        <Alert variant="error">
                            {errors.description.message}
                        </Alert>
                    )}
                </div>
                <TiptapEditorBlog setContent={setContent} />
                <button type="submit" className="btn btn-accent w-fit">
                    Add Blog
                </button>
            </form>
        </div>
    );
};

export default AddBlog;
