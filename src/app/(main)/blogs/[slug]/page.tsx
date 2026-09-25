// @ts-nocheck
import CommentsContainer from "@/components/CommentsContainer";
import PostComment from "@/components/PostComment";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Metadata } from "next";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { prisma } from "../../../../utils/db";
import { calculateReadingTime, formatDate } from "../../../../utils/utils";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const blog = await prisma.blogPost.findUnique({
        where: { slug },
    });

    if (!blog?.title) {
        return notFound();
    }

    return (
        <section className="px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 bg-background">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-6 text-center leading-tight tracking-tight">
                    {blog?.title || "Blog Post"}
                </h1>
            </div>
            <div className="max-w-4xl mx-auto">
                {/* Featured Image */}
                <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg border border-border/50 mb-12">
                    <Image
                        src={
                            blog?.img ||
                            "https://img.daisyui.com/images/blog/nexus-dashboard-template-thumbnail.webp"
                        }
                        alt="Blog featured image"
                        fill
                        className="object-cover object-top h-full hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>

                {/* Blog Content Container */}
                <Card className="shadow-sm border-border/50">
                    <div className="flex items-center justify-between gap-4 p-6 sm:p-8 mb-4 border-b border-border/50 bg-muted/20">
                        <div className="flex items-center gap-3">
                            <div>
                                <p className="font-semibold text-base sm:text-lg text-foreground">
                                    Hritujeet
                                </p>
                                <p className="text-sm text-muted-foreground font-medium">
                                    Author
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col text-sm text-muted-foreground text-right">
                            <time className="font-medium">
                                {formatDate(
                                    blog?.createdAt.toString() as string
                                )}
                            </time>
                            <span className="text-xs mt-1">
                                {calculateReadingTime(blog?.content || "")} min
                                read
                            </span>
                        </div>
                    </div>
                    <CardContent className="p-6 sm:p-8 lg:p-12">
                        <article
                            className="prose max-w-none dark:prose-invert
                            prose-headings:font-bold prose-headings:tracking-tight
                            prose-p:leading-relaxed prose-p:text-base prose-p:mb-6
                            prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                            prose-strong:font-semibold
                            prose-code:font-mono prose-code:text-sm
                            prose-pre:bg-muted prose-pre:rounded-lg
                            prose-blockquote:border-primary prose-blockquote:font-medium
                            prose-li:leading-relaxed prose-li:mb-2
                            prose-th:font-semibold"
                        >
                            <ReactMarkdown
                                components={{
                                    code({
                                        node,
                                        inline,
                                        className,
                                        children,
                                        ...props
                                    }) {
                                        const match = /language-(\w+)/.exec(
                                            className || ""
                                        );
                                        return !inline && match ? (
                                            <SyntaxHighlighter
                                                style={oneDark}
                                                language={match[1]}
                                                PreTag="div"
                                                className="rounded-lg !my-6 !bg-background border border-border"
                                                {...props}
                                            >
                                                {String(children).replace(
                                                    /\n$/,
                                                    ""
                                                )}
                                            </SyntaxHighlighter>
                                        ) : (
                                            <code
                                                className={`${className} bg-muted px-2 py-1 rounded font-mono text-sm font-medium`}
                                                {...props}
                                            >
                                                {children}
                                            </code>
                                        );
                                    },
                                    h1: ({ children }) => (
                                        <h1 className="text-4xl lg:text-5xl font-black mb-8 mt-12 border-b pb-4 tracking-tight leading-tight">
                                            {children}
                                        </h1>
                                    ),
                                    h2: ({ children }) => (
                                        <h2 className="text-2xl lg:text-3xl font-bold mb-6 mt-12 tracking-tight leading-tight">
                                            {children}
                                        </h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className="text-xl lg:text-2xl font-bold mb-4 mt-10 tracking-tight leading-tight">
                                            {children}
                                        </h3>
                                    ),
                                    h4: ({ children }) => (
                                        <h4 className="text-lg lg:text-xl font-semibold mb-3 mt-8 tracking-tight">
                                            {children}
                                        </h4>
                                    ),
                                    h5: ({ children }) => (
                                        <h5 className="text-base lg:text-lg font-semibold mb-3 mt-6 tracking-tight">
                                            {children}
                                        </h5>
                                    ),
                                    h6: ({ children }) => (
                                        <h6 className="text-sm lg:text-base font-semibold mb-2 mt-6 uppercase tracking-wide opacity-80">
                                            {children}
                                        </h6>
                                    ),
                                    p: ({ children }) => (
                                        <p className="mb-6 leading-relaxed font-normal">
                                            {children}
                                        </p>
                                    ),
                                    ul: ({ children }) => (
                                        <ul className="list-disc list-inside mb-6 space-y-3 pl-2 flex flex-col gap-2">
                                            {children}
                                        </ul>
                                    ),
                                    ol: ({ children }) => (
                                        <ol className="list-decimal list-inside mb-6 space-y-3 pl-2 flex flex-col gap-2">
                                            {children}
                                        </ol>
                                    ),
                                    li: ({ children }) => (
                                        <li className="leading-relaxed flex gap-2 list-decimal">
                                            {children}
                                        </li>
                                    ),
                                    a: ({ href, children }) => (
                                        <a
                                            href={href}
                                            className="text-primary hover:text-primary/80 font-medium no-underline hover:underline transition-colors duration-200"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {children}
                                        </a>
                                    ),
                                    blockquote: ({ children }) => (
                                        <blockquote className="border-l-4 border-primary bg-muted p-6 my-8 rounded-r-lg font-medium italic">
                                            {children}
                                        </blockquote>
                                    ),
                                    hr: () => (
                                        <hr className="my-12 border-border" />
                                    ),
                                    table: ({ children }) => (
                                        <div className="overflow-x-auto my-8 border rounded-lg">
                                            <table className="w-full text-sm">
                                                {children}
                                            </table>
                                        </div>
                                    ),
                                    thead: ({ children }) => (
                                        <thead className="bg-muted text-muted-foreground">
                                            {children}
                                        </thead>
                                    ),
                                    th: ({ children }) => (
                                        <th className="font-semibold text-left p-4 border-b">
                                            {children}
                                        </th>
                                    ),
                                    td: ({ children }) => (
                                        <td className="p-4 border-b">
                                            {children}
                                        </td>
                                    ),
                                }}
                            >
                                {blog?.content || ""}
                            </ReactMarkdown>
                        </article>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col max-w-4xl mx-auto gap-4 mt-10 mb-5">
                <SignedIn>
                    <PostComment postId={blog?.id} slug={slug} />
                </SignedIn>
                <SignedOut>
                    <Card className="bg-muted border-dashed border-2 py-8">
                        <CardContent className="text-center pb-0">
                            <h2 className="text-2xl font-semibold text-muted-foreground">
                                Sign In to Post Comment
                            </h2>
                        </CardContent>
                    </Card>
                </SignedOut>
                <Suspense
                    fallback={
                        <div className="flex flex-col gap-4 mt-8">
                            <Skeleton className="h-24 w-full rounded-lg" />
                            <Skeleton className="h-24 w-full rounded-lg" />
                            <Skeleton className="h-24 w-full rounded-lg" />
                        </div>
                    }
                >
                    <CommentsContainer postId={blog?.id} />
                </Suspense>
            </div>
        </section>
    );
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const blog = await prisma.blogPost.findUnique({
        where: { slug },
        select: { title: true, description: true, img: true, createdAt: true }
    });

    if (!blog) {
        return {
            title: "Blog Not Found | Hritujeet Sharma",
        };
    }

    return {
        title: blog.title,
        description: blog.description,
        openGraph: {
            title: blog.title,
            description: blog.description,
            url: `https://hritujeet.com/blogs/${slug}`,
            type: "article",
            publishedTime: blog.createdAt.toISOString(),
            authors: ["Hritujeet Sharma"],
            images: [
                {
                    url: blog.img || "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=1200&h=630&auto=format&fit=crop",
                    width: 1200,
                    height: 630,
                    alt: blog.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: blog.title,
            description: blog.description,
            images: [blog.img || "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=1200&h=630&auto=format&fit=crop"],
        },
    };
}

export default page;
