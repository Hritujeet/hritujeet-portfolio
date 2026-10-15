import BlogCard from "@/components/BlogCard";
import { prisma } from "@/utils/db";
import { withPrismaRetry } from "@/lib/prismaRetry";

const Featured = async () => {
    let posts: Array<{ title: string; slug: string; img: string; description: string; createdAt: Date }> = [];
    let dbError = false;

    try {
        posts = await withPrismaRetry(() =>
            prisma.blogPost.findMany({
                orderBy: { createdAt: "desc" },
                take: 3,
                select: {
                    title: true,
                    slug: true,
                    img: true,
                    description: true,
                    createdAt: true,
                },
            })
        );
    } catch (error) {
        console.error("[Featured] Failed to fetch blog posts after retries:", error);
        dbError = true;
    }

    if (dbError) {
        return (
            <div className="mx-auto mt-10 max-w-4xl py-8 text-center text-sm text-muted-foreground">
                <p>Posts are temporarily unavailable — check back in a moment.</p>
            </div>
        );
    }

    return (
        <div className="mx-auto mt-10 max-w-4xl">
            {posts.map((blog) => (
                <BlogCard
                    key={blog.slug}
                    title={blog.title}
                    slug={blog.slug}
                    img={blog.img}
                    description={blog.description}
                    createdAt={blog.createdAt}
                />
            ))}
        </div>
    );
};

export default Featured;
