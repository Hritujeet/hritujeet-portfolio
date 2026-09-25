"use client";

import { useState, useTransition } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { deleteBlog, updateBlog } from "@/actions/admin-actions";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUploadThing } from "@/utils/uploadthing";
import { UploadCloud, Loader2, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useRef } from "react";

type Blog = {
    id: string;
    title: string;
    description: string;
    img: string;
    slug: string;
    views: number;
    createdAt: Date;
};

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
            <Label className="text-sm font-medium">Cover Image URL</Label>
            {value ? (
                <Card className="relative overflow-hidden p-0 border bg-muted/40">
                    <img
                        src={value}
                        alt="Cover preview"
                        className="h-32 w-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                        onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                    />
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        disabled={disabled || isUploading}
                        className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-colors hover:bg-background disabled:opacity-50"
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>
                </Card>
            ) : (
                <div 
                    className={`relative flex h-32 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                        dragOver ? "border-primary bg-primary/5" : "border-border bg-muted/40 hover:bg-muted/60"
                    }`}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        setDragOver(false);
                        if (disabled) return;
                        handleFile(Array.from(e.dataTransfer.files));
                    }}
                    onClick={() => !disabled && fileInputRef.current?.click()}
                    style={{ cursor: disabled ? "not-allowed" : "pointer" }}
                >
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*" 
                        disabled={disabled}
                        onChange={(e) => e.target.files && handleFile(Array.from(e.target.files))}
                    />
                    <UploadCloud className="mb-2 h-6 w-6 text-muted-foreground/60" />
                    <p className="text-xs font-medium text-muted-foreground">Drag & drop or click</p>
                    
                    {isUploading && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-lg bg-card/90 backdrop-blur-sm">
                            <Loader2 className="mb-1 h-6 w-6 animate-spin text-primary" />
                            <p className="text-xs font-medium text-foreground">Uploading... {progress}%</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default function BlogsTable({ blogs }: { blogs: Blog[] }) {
    const [isPending, startTransition] = useTransition();
    
    const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    
    // Edit State
    const [blogToEdit, setBlogToEdit] = useState<Blog | null>(null);
    const [editForm, setEditForm] = useState({ title: "", description: "", img: "" });

    const handleDelete = () => {
        if (!blogToDelete) return;
        startTransition(async () => {
            try {
                await deleteBlog(blogToDelete);
                toast.success("Blog deleted successfully");
            } catch (error) {
                toast.error("Failed to delete blog");
            } finally {
                setBlogToDelete(null);
            }
        });
    };

    const handleUpdate = () => {
        if (!blogToEdit) return;
        startTransition(async () => {
            try {
                await updateBlog(blogToEdit.id, editForm);
                toast.success("Blog updated successfully");
                setBlogToEdit(null);
            } catch (error) {
                toast.error("Failed to update blog");
            }
        });
    };

    return (
        <div className="bg-card/50 backdrop-blur-sm border rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/30 hover:bg-muted/30">
                            <TableHead className="w-[300px]">Title</TableHead>
                            <TableHead className="hidden md:table-cell">Slug</TableHead>
                            <TableHead className="hidden sm:table-cell">Views</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {blogs.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                No blogs found.
                            </TableCell>
                        </TableRow>
                    )}
                    {blogs.map((blog) => (
                        <TableRow key={blog.id} className="group transition-colors hover:bg-muted/20">
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    {blog.img && (
                                        <img src={blog.img} alt={blog.title} className="w-10 h-10 rounded-md object-cover hidden sm:block border" />
                                    )}
                                    <span className="line-clamp-1">{blog.title}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground hidden md:table-cell text-sm">
                                <span className="line-clamp-1 max-w-[200px] lg:max-w-[300px]">{blog.slug}</span>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                                    {blog.views}
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                    <Button 
                                        variant="secondary" 
                                        size="sm" 
                                        className="h-8 rounded-full px-3"
                                        onClick={() => {
                                            setBlogToEdit(blog);
                                            setEditForm({ title: blog.title, description: blog.description, img: blog.img });
                                        }}
                                    >
                                        <Pencil className="w-3.5 h-3.5 mr-1.5" /> Edit
                                    </Button>
                                    <Button 
                                        variant="destructive" 
                                        size="sm" 
                                        className="h-8 rounded-full px-3"
                                        onClick={() => setBlogToDelete(blog.id)}
                                    >
                                        <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </div>

            {/* Edit Dialog */}
            <Dialog open={!!blogToEdit} onOpenChange={(open) => !open && setBlogToEdit(null)}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-xl">Edit Blog</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-5 py-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Title</Label>
                            <Input 
                                value={editForm.title} 
                                onChange={(e) => setEditForm({...editForm, title: e.target.value})} 
                                className="bg-muted/40"
                            />
                        </div>
                        <CoverImageField 
                            value={editForm.img} 
                            onChange={(val) => setEditForm({...editForm, img: val})}
                            disabled={isPending || isUploadingImage}
                            onUploadBegin={() => setIsUploadingImage(true)}
                            onUploadEnd={() => setIsUploadingImage(false)}
                        />
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Short Description</Label>
                            <Textarea 
                                value={editForm.description} 
                                onChange={(e) => setEditForm({...editForm, description: e.target.value})} 
                                rows={4}
                                className="bg-muted/40 resize-none"
                            />
                        </div>
                        <div className="pt-2">
                            <Button 
                                className="w-full rounded-full" 
                                size="lg"
                                onClick={handleUpdate} 
                                disabled={isPending || isUploadingImage}
                            >
                                {isPending ? "Saving Changes..." : "Save Changes"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Alert */}
            <AlertDialog open={!!blogToDelete} onOpenChange={(open) => !open && setBlogToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your blog post.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={(e) => { e.preventDefault(); handleDelete(); }} 
                            disabled={isPending}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isPending ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
