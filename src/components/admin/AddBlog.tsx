"use client";

import React, { useRef, useState, useCallback } from "react";
import { postBlog } from "@/actions/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    Loader2,
    Bold,
    Italic,
    Strikethrough,
    Code,
    Heading1,
    Heading2,
    List,
    ListOrdered,
    Quote,
    Link as LinkIcon,
    Image as ImageIcon,
    Eye,
    Pencil,
    UploadCloud,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import ReactMarkdown from "react-markdown";
import { blogSchema } from "../../utils/utils";
import Alert from "../Alert";
import { useUploadThing } from "@/utils/uploadthing";

// ---------- Toolbar ----------

const ToolbarButton = ({
    icon: Icon,
    onClick,
    title,
    disabled,
}: {
    icon: any;
    onClick: () => void;
    title: string;
    disabled?: boolean;
}) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        title={title}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
    >
        <Icon className="h-4 w-4" />
    </button>
);

// ---------- Markdown editor with write/preview tabs ----------

const NativeMarkdownEditor = ({
    value,
    onChange,
    disabled,
}: {
    value: string;
    onChange: (val: string) => void;
    disabled?: boolean;
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [tab, setTab] = useState<"write" | "preview">("write");

    const insertText = (before: string, after: string = "", defaultText: string = "") => {
        if (!textareaRef.current) return;
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const selectedText = textarea.value.substring(start, end);
        const textToInsert = selectedText || defaultText;

        const newText =
            textarea.value.substring(0, start) + before + textToInsert + after + textarea.value.substring(end);

        onChange(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + before.length, start + before.length + textToInsert.length);
        }, 0);
    };

    return (
        <div className="overflow-hidden rounded-lg border bg-background shadow-sm transition-all focus-within:ring-1 focus-within:ring-ring">
            <Tabs value={tab} onValueChange={(v: string) => setTab(v as "write" | "preview")}>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-muted/30 px-2 py-1.5">
                    <div className="flex flex-wrap items-center gap-0.5">
                        <ToolbarButton title="Bold" icon={Bold} disabled={tab !== "write"} onClick={() => insertText("**", "**", "bold text")} />
                        <ToolbarButton title="Italic" icon={Italic} disabled={tab !== "write"} onClick={() => insertText("_", "_", "italic text")} />
                        <ToolbarButton title="Strikethrough" icon={Strikethrough} disabled={tab !== "write"} onClick={() => insertText("~~", "~~", "strikethrough")} />
                        <ToolbarButton title="Code" icon={Code} disabled={tab !== "write"} onClick={() => insertText("`", "`", "code")} />
                        <Separator orientation="vertical" className="mx-1 h-5" />
                        <ToolbarButton title="Heading 1" icon={Heading1} disabled={tab !== "write"} onClick={() => insertText("# ", "", "Heading 1")} />
                        <ToolbarButton title="Heading 2" icon={Heading2} disabled={tab !== "write"} onClick={() => insertText("## ", "", "Heading 2")} />
                        <Separator orientation="vertical" className="mx-1 h-5" />
                        <ToolbarButton title="Bullet List" icon={List} disabled={tab !== "write"} onClick={() => insertText("- ", "", "List item")} />
                        <ToolbarButton title="Numbered List" icon={ListOrdered} disabled={tab !== "write"} onClick={() => insertText("1. ", "", "List item")} />
                        <ToolbarButton title="Quote" icon={Quote} disabled={tab !== "write"} onClick={() => insertText("> ", "", "Blockquote")} />
                        <Separator orientation="vertical" className="mx-1 h-5" />
                        <ToolbarButton title="Link" icon={LinkIcon} disabled={tab !== "write"} onClick={() => insertText("[", "](url)", "link text")} />
                        <ToolbarButton title="Image" icon={ImageIcon} disabled={tab !== "write"} onClick={() => insertText("![alt text](", ")", "image url")} />
                    </div>

                    <TabsList className="h-8">
                        <TabsTrigger value="write" className="gap-1.5 text-xs">
                            <Pencil className="h-3.5 w-3.5" />
                            Write
                        </TabsTrigger>
                        <TabsTrigger value="preview" className="gap-1.5 text-xs">
                            <Eye className="h-3.5 w-3.5" />
                            Preview
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="write" className="m-0">
                    <textarea
                        ref={textareaRef}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        disabled={disabled}
                        placeholder="Write your amazing blog post using Markdown..."
                        className="min-h-[420px] w-full resize-y border-0 bg-transparent p-6 font-mono text-sm leading-relaxed outline-none placeholder:text-muted-foreground/50 disabled:cursor-not-allowed disabled:opacity-70"
                    />
                </TabsContent>

                <TabsContent value="preview" className="m-0">
                    <div className="min-h-[420px] p-6">
                        {value.trim() ? (
                            <article className="prose prose-sm prose-zinc max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-primary">
                                <ReactMarkdown>{value}</ReactMarkdown>
                            </article>
                        ) : (
                            <p className="text-sm text-muted-foreground/60">Nothing to preview yet — start writing.</p>
                        )}
                    </div>
                </TabsContent>
            </Tabs>

            <div className="flex items-center justify-end border-t bg-muted/20 px-4 py-1.5">
                <span className="text-xs text-muted-foreground">{value.length} characters</span>
            </div>
        </div>
    );
};

// ---------- Cover image field with drag & drop preview ----------

const CoverImageField = ({
    value,
    onChange,
    disabled,
    onUploadBegin,
    onUploadEnd,
}: {
    value: string;
    onChange: (val: string) => void;
    disabled?: boolean;
    onUploadBegin: () => void;
    onUploadEnd: () => void;
}) => {
    const [dragOver, setDragOver] = useState(false);
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { startUpload, isUploading } = useUploadThing("imageUploader", {
        onUploadProgress: (p) => setProgress(p),
        onClientUploadComplete: (res) => {
            onUploadEnd();
            if (res && res[0]) {
                onChange(res[0].url);
                toast.success("Image uploaded successfully!");
            }
        },
        onUploadError: (e) => {
            onUploadEnd();
            toast.error(`Upload error: ${e.message}`);
        },
        onUploadBegin: () => {
            setProgress(0);
            onUploadBegin();
        },
    });

    const handleFile = (files: File[]) => {
        if (!files.length) return;
        startUpload(files);
    };

    return (
        <div className="space-y-2">
            <Label htmlFor="image" className="text-foreground">
                Cover Image URL
            </Label>

            {value ? (
                <Card className="relative overflow-hidden p-0">
                    <img
                        src={value}
                        alt="Cover preview"
                        className="h-[180px] w-full object-cover"
                        onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                    />
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        disabled={disabled || isUploading}
                        className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-colors hover:bg-background disabled:opacity-50"
                        title="Remove"
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>
                </Card>
            ) : (
                <div 
                    className={`relative flex h-[180px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                        dragOver ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-muted/10"
                    }`}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        setDragOver(false);
                        if (disabled) return;
                        const files = Array.from(e.dataTransfer.files);
                        handleFile(files);
                    }}
                    onClick={() => {
                        if (!disabled) fileInputRef.current?.click();
                    }}
                    style={{ cursor: disabled ? "not-allowed" : "pointer" }}
                >
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*" 
                        disabled={disabled}
                        onChange={(e) => {
                            if (e.target.files) handleFile(Array.from(e.target.files));
                        }}
                    />
                    <UploadCloud className="mb-2 h-8 w-8 text-muted-foreground/60" />
                    <p className="text-sm font-medium text-muted-foreground">
                        Drag & drop an image, or click to browse
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground/60">Max 4MB</p>
                    
                    {isUploading && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-lg bg-card/90 backdrop-blur-sm">
                            <Loader2 className="mb-2 h-8 w-8 animate-spin text-primary" />
                            <p className="text-sm font-medium text-foreground">Uploading... {progress}%</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// ---------- Main form ----------

const AddBlog = () => {
    const formSchema = blogSchema.extend({
        content: z.string().min(10, { message: "Content must be at least 10 characters." }),
    });

    const {
        register,
        reset,
        control,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
            image: "",
        },
    });

    const titleValue = watch("title");
    const descriptionValue = watch("description");
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (blog: z.infer<typeof formSchema>) => {
            return await postBlog(blog);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            toast.success(`Blog published! 🚀 Slug: ${data?.slug}`);
            reset();
        },
        onError: (error) => {
            console.error("Mutation error:", error);
            toast.error("Failed to publish blog. Check console for details.");
        },
    });

    const submitHandler = (data: z.infer<typeof formSchema>) => {
        mutation.mutate(data);
    };

    return (
        <div className="mx-auto max-w-5xl px-4 py-12">
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        Create New Story ✍️
                    </h1>
                    <p className="mt-1 text-muted-foreground">Share your thoughts with the world.</p>
                </div>
                {mutation.isPending && (
                    <div className="flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Publishing
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-8" aria-disabled={mutation.isPending}>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="title" className="text-foreground">
                                Blog Title
                            </Label>
                            {titleValue && <span className="text-xs text-muted-foreground">{titleValue.length} chars</span>}
                        </div>
                        <Input
                            id="title"
                            {...register("title")}
                            placeholder="e.g. The Future of Next.js"
                            disabled={mutation.isPending}
                            className="bg-card"
                        />
                        {errors.title && <Alert variant="error">{errors.title.message}</Alert>}

                        <div className="space-y-2 pt-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="description" className="text-foreground">
                                    Short Description
                                </Label>
                                {descriptionValue && (
                                    <span className="text-xs text-muted-foreground">{descriptionValue.length} chars</span>
                                )}
                            </div>
                            <Textarea
                                id="description"
                                {...register("description")}
                                rows={6}
                                placeholder="A quick summary of your post..."
                                disabled={mutation.isPending}
                                className="bg-card resize-none"
                            />
                            {errors.description && <Alert variant="error">{errors.description.message}</Alert>}
                        </div>
                    </div>

                    <Controller
                        name="image"
                        control={control}
                        render={({ field }) => (
                            <CoverImageField 
                                value={field.value ?? ""} 
                                onChange={field.onChange} 
                                disabled={mutation.isPending || isUploadingImage} 
                                onUploadBegin={() => setIsUploadingImage(true)}
                                onUploadEnd={() => setIsUploadingImage(false)}
                            />
                        )}
                    />
                </div>
                {errors.image && <Alert variant="error">{errors.image.message}</Alert>}

                <Separator />

                <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Content (Markdown)</Label>
                    <Controller
                        name="content"
                        control={control}
                        render={({ field }) => (
                            <NativeMarkdownEditor value={field.value} onChange={field.onChange} disabled={mutation.isPending || isUploadingImage} />
                        )}
                    />
                    {errors.content && <Alert variant="error">{errors.content.message}</Alert>}
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                    <Button type="button" variant="ghost" onClick={() => reset()} disabled={mutation.isPending || isUploadingImage}>
                        Reset
                    </Button>
                    <Button type="submit" size="lg" disabled={mutation.isPending || isUploadingImage} className="px-8">
                        {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {mutation.isPending ? "Publishing..." : "Publish Blog"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddBlog;