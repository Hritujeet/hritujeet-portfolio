"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "@tiptap/markdown"; // Official TipTap markdown extension
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Highlighter,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Code,
    Code2,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Link2,
    Undo,
    Redo,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { blogSchema } from "../../../utils/utils"; // Your existing schema
import Alert from "../Alert"; // Your existing alert

// --- 1. Clean, Minimalist Toolbar Component ---
const MenuButton = ({
    isActive,
    onClick,
    children,
    title,
    disabled = false,
}: {
    isActive?: boolean;
    onClick: () => void;
    children: React.ReactNode;
    title: string;
    disabled?: boolean;
}) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        title={title}
        className={`p-1.5 rounded-md transition-all duration-200 
            ${
                disabled
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-zinc-800 hover:text-blue-400"
            }
            ${isActive ? "bg-zinc-800 text-blue-400" : "text-zinc-400"}
        `}
    >
        {children}
    </button>
);

const EditorToolbar = ({ editor }: { editor: Editor | null }) => {
    if (!editor) return null;

    const addLink = () => {
        const url = window.prompt("Enter URL:");
        if (url) editor.chain().focus().setLink({ href: url }).run();
    };

    return (
        <div className="flex flex-wrap gap-1 p-2 bg-zinc-900/50 border-b border-zinc-800 sticky top-0 z-10 backdrop-blur-sm">
            <div className="flex gap-1 items-center">
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive("bold")}
                    title="Bold"
                >
                    <Bold size={16} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive("italic")}
                    title="Italic"
                >
                    <Italic size={16} />
                </MenuButton>
                <MenuButton
                    onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                    isActive={editor.isActive("underline")}
                    title="Underline"
                >
                    <UnderlineIcon size={16} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    isActive={editor.isActive("strike")}
                    title="Strike"
                >
                    <Strikethrough size={16} />
                </MenuButton>
                <MenuButton
                    onClick={() =>
                        editor.chain().focus().toggleHighlight().run()
                    }
                    isActive={editor.isActive("highlight")}
                    title="Highlight"
                >
                    <Highlighter size={16} />
                </MenuButton>
            </div>

            <div className="w-px h-6 bg-zinc-800 mx-1 self-center" />

            <div className="flex gap-1 items-center">
                <MenuButton
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                    isActive={editor.isActive("heading", { level: 1 })}
                    title="H1"
                >
                    <Heading1 size={16} />
                </MenuButton>
                <MenuButton
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    isActive={editor.isActive("heading", { level: 2 })}
                    title="H2"
                >
                    <Heading2 size={16} />
                </MenuButton>
                <MenuButton
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                    isActive={editor.isActive("heading", { level: 3 })}
                    title="H3"
                >
                    <Heading3 size={16} />
                </MenuButton>
            </div>

            <div className="w-px h-6 bg-zinc-800 mx-1 self-center" />

            <div className="flex gap-1 items-center">
                <MenuButton
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    isActive={editor.isActive("bulletList")}
                    title="Bullet List"
                >
                    <List size={16} />
                </MenuButton>
                <MenuButton
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    isActive={editor.isActive("orderedList")}
                    title="Ordered List"
                >
                    <ListOrdered size={16} />
                </MenuButton>
                <MenuButton
                    onClick={() =>
                        editor.chain().focus().toggleCodeBlock().run()
                    }
                    isActive={editor.isActive("codeBlock")}
                    title="Code Block"
                >
                    <Code2 size={16} />
                </MenuButton>
                <MenuButton
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                    isActive={editor.isActive("blockquote")}
                    title="Quote"
                >
                    <Quote size={16} />
                </MenuButton>
            </div>

            <div className="w-px h-6 bg-zinc-800 mx-1 self-center" />

            <div className="flex gap-1 items-center">
                <MenuButton
                    onClick={() =>
                        editor.chain().focus().setTextAlign("left").run()
                    }
                    isActive={editor.isActive({ textAlign: "left" })}
                    title="Left"
                >
                    <AlignLeft size={16} />
                </MenuButton>
                <MenuButton
                    onClick={() =>
                        editor.chain().focus().setTextAlign("center").run()
                    }
                    isActive={editor.isActive({ textAlign: "center" })}
                    title="Center"
                >
                    <AlignCenter size={16} />
                </MenuButton>
                <MenuButton
                    onClick={addLink}
                    isActive={editor.isActive("link")}
                    title="Link"
                >
                    <Link2 size={16} />
                </MenuButton>
            </div>

            <div className="ml-auto flex gap-1 items-center">
                <MenuButton
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title="Undo"
                >
                    <Undo size={16} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title="Redo"
                >
                    <Redo size={16} />
                </MenuButton>
            </div>
        </div>
    );
};

// --- 2. The Editor Component (Now handles onChange for RHF) ---
const TiptapEditor = ({
    value,
    onChange,
}: {
    value: string;
    onChange: (content: string) => void;
}) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Highlight,
            Markdown, // Official @tiptap/markdown extension
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-blue-400 underline cursor-pointer",
                },
            }),
        ],
        content: value, // Set initial value from RHF
        editorProps: {
            attributes: {
                class: "prose prose-invert prose-sm sm:prose-base lg:prose-lg focus:outline-none p-6 min-h-[300px] max-w-none",
            },
        },
        onUpdate: ({ editor }) => {
            // Get markdown with proper line breaks
            const markdown = editor.getMarkdown();
            console.log("Markdown output:", markdown);
            console.log("Markdown length:", markdown.length);
            console.log("Has newlines:", markdown.includes("\n"));
            onChange(markdown);
        },
        immediatelyRender: false, // Fixes SSR hydration mismatch
    });

    // Update editor content when value changes externally
    React.useEffect(() => {
        if (editor && value !== editor.getMarkdown()) {
            editor.commands.setContent(value);
        }
    }, [editor, value]);

    return (
        <div className="w-full border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950/50 shadow-sm focus-within:ring-1 focus-within:ring-blue-500/50 transition-all">
            <EditorToolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
};

// --- 3. Main Form ---
const AddBlog = () => {
    // Extend your schema to include content validation
    const formSchema = blogSchema.extend({
        content: z
            .string()
            .min(10, { message: "Content must be at least 10 characters." }),
    });

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "", // Initialize content
        },
    });

    const submitHandler = (data: z.infer<typeof formSchema>) => {
        console.log("Form Submitted:", data);
        toast.success("Blog ready to ship! 🚀");
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                    Create New Story ✍️
                </h1>
                <p className="text-zinc-400">
                    Share your thoughts with the world.
                </p>
            </div>

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-8">
                {/* Meta Data Section */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">
                            Blog Title
                        </label>
                        <input
                            {...register("title")}
                            placeholder="e.g. The Future of Next.js"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-600"
                        />
                        {errors.title && (
                            <Alert variant="error">
                                {errors.title.message}
                            </Alert>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">
                            Cover Image URL
                        </label>
                        <input
                            {...register("image")}
                            placeholder="https://..."
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-600"
                        />
                        {errors.image && (
                            <Alert variant="error">
                                {errors.image.message}
                            </Alert>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">
                        Short Description
                    </label>
                    <textarea
                        {...register("description")}
                        rows={3}
                        placeholder="A quick summary of your post..."
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-600 resize-none"
                    />
                    {errors.description && (
                        <Alert variant="error">
                            {errors.description.message}
                        </Alert>
                    )}
                </div>

                {/* Editor Section */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">
                        Content
                    </label>
                    <Controller
                        name="content"
                        control={control}
                        render={({ field }) => (
                            <TiptapEditor
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    {errors.content && (
                        <Alert variant="error">{errors.content.message}</Alert>
                    )}
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors"
                    >
                        Publish Blog
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBlog;
