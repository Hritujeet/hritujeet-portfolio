import { prisma } from "@/utils/db";
import BlogsTable from "./BlogsTable";

export default async function ManageBlogs() {
    const blogs = await prisma.blogPost.findMany({
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="p-4 md:p-8 max-w-6xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Manage Blogs</h1>
                    <p className="text-sm text-muted-foreground mt-1">View, update, or delete your published articles.</p>
                </div>
                <a 
                    href="/dashboard/addBlog" 
                    className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                    Write New Blog
                </a>
            </div>
            <BlogsTable blogs={blogs} />
        </div>
    );
}
