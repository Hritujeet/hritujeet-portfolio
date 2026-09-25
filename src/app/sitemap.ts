import { MetadataRoute } from "next";
import { prisma } from "@/utils/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://hritujeet.com";

    // Static Routes
    const routes = ["", "/about", "/projects", "/blogs", "/contact", "/resume"].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    try {
        // Fetch dynamic blog routes
        const blogs = await prisma.blogPost.findMany({
            select: { slug: true, createdAt: true },
        });

        const blogRoutes = blogs.map((blog) => ({
            url: `${baseUrl}/blogs/${blog.slug}`,
            lastModified: blog.createdAt.toISOString(),
            changeFrequency: "weekly" as const,
            priority: 0.6,
        }));

        return [...routes, ...blogRoutes];
    } catch (error) {
        console.error("Error generating sitemap:", error);
        return routes;
    }
}
