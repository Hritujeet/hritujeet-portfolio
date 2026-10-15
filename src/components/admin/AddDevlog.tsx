"use client";

import { useState, useTransition } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { addDevlog } from "@/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function AddDevlog() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        startTransition(async () => {
            try {
                await addDevlog({ title, content });
                setTitle("");
                setContent("");
                toast.success("Devlog published successfully");
            } catch {
                toast.error("Failed to publish devlog");
            }
        });
    };

    return (
        <div className="mx-auto max-w-4xl space-y-6 py-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Add Devlog</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Write a progress update using Markdown.
                </p>
            </div>
            <Card>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="devlog-title">Title</Label>
                            <Input
                                id="devlog-title"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                maxLength={200}
                                required
                                disabled={isPending}
                                placeholder="What are you working on?"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="devlog-content">Content</Label>
                            <Tabs defaultValue="write">
                                <TabsList>
                                    <TabsTrigger value="write">Write</TabsTrigger>
                                    <TabsTrigger value="preview">Preview</TabsTrigger>
                                </TabsList>
                                <TabsContent value="write">
                                    <Textarea
                                        id="devlog-content"
                                        value={content}
                                        onChange={(event) => setContent(event.target.value)}
                                        required
                                        disabled={isPending}
                                        placeholder="Describe your progress..."
                                        className="min-h-[360px] font-mono"
                                    />
                                </TabsContent>
                                <TabsContent value="preview">
                                    <article className="prose prose-sm min-h-[360px] max-w-none rounded-md border p-4 dark:prose-invert">
                                        {content ? (
                                            <ReactMarkdown>{content}</ReactMarkdown>
                                        ) : (
                                            <p className="text-muted-foreground">Nothing to preview yet.</p>
                                        )}
                                    </article>
                                </TabsContent>
                            </Tabs>
                        </div>
                        <Button type="submit" disabled={isPending || !title.trim() || !content.trim()}>
                            {isPending ? "Publishing..." : "Publish Devlog"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
