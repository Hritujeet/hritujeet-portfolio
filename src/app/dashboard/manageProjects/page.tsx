import { prisma } from "@/utils/db";
import ProjectsTable from "./ProjectsTable";

export default async function ManageProjects() {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="p-4 md:p-8 max-w-6xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Manage Projects</h1>
                    <p className="text-sm text-muted-foreground mt-1">View, update, or delete your portfolio projects.</p>
                </div>
                <a 
                    href="/dashboard/addProject" 
                    className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                    Add New Project
                </a>
            </div>
            <ProjectsTable projects={projects} />
        </div>
    );
}
