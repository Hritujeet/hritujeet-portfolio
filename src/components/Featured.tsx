import BlogCard from "@/components/BlogCard";
import { prisma } from "@/utils/db";

const Featured = async () => {
    const posts = await prisma.blogPost.findMany({
        orderBy: {
            createdAt: "desc",
        },
        take: 3,
        select: {
            title: true,
            slug: true,
            img: true,
            description: true,
            createdAt: true,
        },
    });

    return (
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
