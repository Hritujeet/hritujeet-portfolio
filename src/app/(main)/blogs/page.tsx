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
    <main className="container mx-auto px-5 pb-20 sm:px-8">
      <header className="mx-auto mb-12 mt-12 flex max-w-6xl flex-col gap-6 border-b border-border/70 pb-8 sm:mb-14 sm:mt-16 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            The journal
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Notes from my corner of the web.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Thoughts, lessons, and explorations across technology and beyond.
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
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
  title: "Read Blogs | Hritujeet",
  description:
    "Read blogs about web development, programming, and more. Stay updated with the latest trends and insights in the tech world. Join our community of developers and enthusiasts. react, nextjs, javascript, web development, programming, blogs, tech trends, developer community, insights",
  keywords:
    "react, nextjs, javascript, web development, programming, blogs, tech trends, developer community, insights",
};
export default page;
