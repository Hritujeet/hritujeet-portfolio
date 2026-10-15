"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import { deleteDevlog, updateDevlog } from "@/actions/admin-actions";
import { Button, buttonVariants } from "@/components/ui/button";
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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

type Devlog = {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
};

export default function DevlogsTable({ devlogs }: { devlogs: Devlog[] }) {
    const [isPending, startTransition] = useTransition();
    const [devlogToEdit, setDevlogToEdit] = useState<Devlog | null>(null);
    const [devlogToDelete, setDevlogToDelete] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({ title: "", content: "" });

    const handleUpdate = () => {
        if (!devlogToEdit) return;
        startTransition(async () => {
            try {
                await updateDevlog(devlogToEdit.id, editForm);
                toast.success("Devlog updated successfully");
                setDevlogToEdit(null);
            } catch {
                toast.error("Failed to update devlog");
            }
        });
    };

    const handleDelete = () => {
        if (!devlogToDelete) return;
        startTransition(async () => {
            try {
                await deleteDevlog(devlogToDelete);
                toast.success("Devlog deleted successfully");
            } catch {
                toast.error("Failed to delete devlog");
            } finally {
                setDevlogToDelete(null);
            }
        });
    };

    return (
        <>
            <div className="overflow-hidden rounded-xl border bg-card/50 shadow-sm">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead className="hidden sm:table-cell">Created</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {devlogs.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} className="py-8 text-center text-muted-foreground">
                                        No devlogs found.
                                    </TableCell>
                                </TableRow>
                            )}
                            {devlogs.map((devlog) => (
                                <TableRow key={devlog.id}>
                                    <TableCell className="max-w-0">
                                        <p className="truncate font-medium">{devlog.title}</p>
                                        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                                            {devlog.content}
                                        </p>
                                    </TableCell>
                                    <TableCell className="hidden whitespace-nowrap text-sm text-muted-foreground sm:table-cell">
                                        {devlog.createdAt.toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/devlogs/${devlog.id}`}
                                                target="_blank"
                                                className={buttonVariants({ variant: "outline", size: "sm" })}
                                            >
                                                View
                                            </Link>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => {
                                                    setDevlogToEdit(devlog);
                                                    setEditForm({ title: devlog.title, content: devlog.content });
                                                }}
                                            >
                                                <Pencil className="mr-1.5 size-3.5" />
                                                Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => setDevlogToDelete(devlog.id)}
                                            >
                                                <Trash2 className="mr-1.5 size-3.5" />
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <Dialog open={!!devlogToEdit} onOpenChange={(open) => !open && setDevlogToEdit(null)}>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit Devlog</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="space-y-2">
                            <Label htmlFor="edit-devlog-title">Title</Label>
                            <Input
                                id="edit-devlog-title"
                                value={editForm.title}
                                maxLength={200}
                                onChange={(event) => setEditForm({ ...editForm, title: event.target.value })}
                                disabled={isPending}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-devlog-content">Content (Markdown)</Label>
                            <Textarea
                                id="edit-devlog-content"
                                value={editForm.content}
                                onChange={(event) => setEditForm({ ...editForm, content: event.target.value })}
                                className="min-h-[320px] font-mono"
                                disabled={isPending}
                            />
                        </div>
                        <Button
                            className="w-full"
                            onClick={handleUpdate}
                            disabled={isPending || !editForm.title.trim() || !editForm.content.trim()}
                        >
                            {isPending ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <AlertDialog open={!!devlogToDelete} onOpenChange={(open) => !open && setDevlogToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete this devlog?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This permanently deletes the devlog and removes it from the public site.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(event) => {
                                event.preventDefault();
                                handleDelete();
                            }}
                            disabled={isPending}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isPending ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
