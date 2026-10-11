import BlogCard from "@/components/BlogCard";
import { Metadata } from "next";
import { prisma } from "../../../utils/db";

const page = async () => {
  const blogs = await prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      title: true,
      slug: true,
      img: true,
      description: true,
      createdAt: true,
    },
  });

  return (
    <main className="mx-auto min-h-[60vh] max-w-5xl px-5 pb-24 sm:px-8">
      <header className="mx-auto mb-10 mt-12 max-w-3xl border-b border-border pb-7 sm:mb-14 sm:mt-16">
        <p className="mb-3 text-sm font-medium text-primary">The journal</p>
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
          Ideas worth sharing.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Notes, lessons, and explorations across technology and beyond.
        </p>
      </header>

      <div className="mx-auto max-w-3xl">
        {blogs.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">
            No stories have been published yet. Check back soon.
          </p>
        )}
        {blogs.map((blog) => (
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
    </main>
  );
};
export const metadata: Metadata = {
  title: "Writing",
  description:
    "Read blogs about web development, programming, and more. Stay updated with the latest trends and insights in the tech world. Join our community of developers and enthusiasts. react, nextjs, javascript, web development, programming, blogs, tech trends, developer community, insights",
  keywords:
    "react, nextjs, javascript, web development, programming, blogs, tech trends, developer community, insights",
};
export default page;
