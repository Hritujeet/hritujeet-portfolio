"use client";

import { useState, useTransition } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { deleteProject, updateProject } from "@/actions/admin-actions";
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

type Project = {
    id: string;
    title: string;
    decription: string;
    link: string;
    techStack: string[];
    createdAt: Date;
    updateAt: Date;
};

export default function ProjectsTable({ projects }: { projects: Project[] }) {
    const [isPending, startTransition] = useTransition();
    
    // Delete State
    const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
    
    // Edit State
    const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
    const [editForm, setEditForm] = useState({ title: "", description: "", link: "" });

    const handleDelete = () => {
        if (!projectToDelete) return;
        startTransition(async () => {
            try {
                await deleteProject(projectToDelete);
                toast.success("Project deleted successfully");
            } catch (error) {
                toast.error("Failed to delete project");
            } finally {
                setProjectToDelete(null);
            }
        });
    };

    const handleUpdate = () => {
        if (!projectToEdit) return;
        startTransition(async () => {
            try {
                await updateProject(projectToEdit.id, editForm);
                toast.success("Project updated successfully");
                setProjectToEdit(null);
            } catch (error) {
                toast.error("Failed to update project");
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
                            <TableHead className="hidden md:table-cell">Link</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {projects.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                                No projects found.
                            </TableCell>
                        </TableRow>
                    )}
                    {projects.map((project) => (
                        <TableRow key={project.id} className="group transition-colors hover:bg-muted/20">
                            <TableCell className="font-medium">
                                <span className="line-clamp-1">{project.title}</span>
                            </TableCell>
                            <TableCell className="text-muted-foreground hidden md:table-cell text-sm">
                                <a href={project.link} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors hover:underline line-clamp-1 max-w-[300px]">
                                    {project.link}
                                </a>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                    <Button 
                                        variant="secondary" 
                                        size="sm" 
                                        className="h-8 rounded-full px-3"
                                        onClick={() => {
                                            setProjectToEdit(project);
                                            setEditForm({ title: project.title, description: project.decription, link: project.link });
                                        }}
                                    >
                                        <Pencil className="w-3.5 h-3.5 mr-1.5" /> Edit
                                    </Button>
                                    <Button 
                                        variant="destructive" 
                                        size="sm" 
                                        className="h-8 rounded-full px-3"
                                        onClick={() => setProjectToDelete(project.id)}
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
            <Dialog open={!!projectToEdit} onOpenChange={(open) => !open && setProjectToEdit(null)}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-xl">Edit Project</DialogTitle>
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
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Link</Label>
                            <Input 
                                value={editForm.link} 
                                onChange={(e) => setEditForm({...editForm, link: e.target.value})} 
                                className="bg-muted/40"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Description</Label>
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
                                disabled={isPending}
                            >
                                {isPending ? "Saving Changes..." : "Save Changes"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Alert */}
            <AlertDialog open={!!projectToDelete} onOpenChange={(open) => !open && setProjectToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your project.
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
