import { cache, Suspense, type CSSProperties } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { prisma } from "@/utils/db";
import type { BlogPost } from "@/client/prisma";
import { withPrismaRetry } from "@/lib/prismaRetry";
import { calculateReadingTime, formatDate } from "../../../../utils/utils";
import CommentsContainer from "@/components/CommentsContainer";
import PostComment from "@/components/PostComment";
import { Skeleton } from "@/components/ui/skeleton";

const getBlogPost = cache((slug: string) =>
    withPrismaRetry(() =>
        prisma.blogPost.findUnique({
            where: { slug },
        })
    )
);

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    let blog: BlogPost | null = null;
    let dbError = false;

    try {
        blog = await getBlogPost(slug);
    } catch (error) {
        console.error("[blog/slug] Failed to fetch blog post after retries:", error);
        dbError = true;
    }

    if (dbError) {
        return (
            <main className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-8">
                <p className="text-lg font-medium text-foreground">Article temporarily unavailable</p>
                <p className="mt-2 text-sm text-muted-foreground">
                    We&apos;re experiencing a database outage. Please try again in a few minutes.
                </p>
            </main>
        );
    }

    if (!blog?.title) {
        return notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blog.title,
        description: blog.description,
        image: [blog.img || "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=1200&h=630&auto=format&fit=crop"],
        datePublished: blog.createdAt.toISOString(),
        author: {
            "@type": "Person",
            name: "Hritujeet Sharma",
            url: `${process.env.NEXT_PUBLIC_APP_URL || "https://hritujeet-portfolio.vercel.app"}/about`,
        },
    };

    return (
        <>
            <Script
                id={`blog-schema-${blog.id}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <main className="pb-20">
                <header className="mx-auto max-w-4xl px-5 pb-8 pt-12 sm:px-8 sm:pt-16 lg:pt-20">
                    <p className="mb-5 text-sm font-medium text-primary">A story from the journal</p>
                    <h1 className="font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        {blog.title}
                    </h1>
                    {blog.description && (
                        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                            {blog.description}
                        </p>
                    )}
                    <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-border pb-7 text-sm">
                        <span className="font-semibold text-foreground">Hritujeet Sharma</span>
                        <span className="text-muted-foreground" aria-hidden="true">·</span>
                        <time className="text-muted-foreground" dateTime={blog.createdAt.toISOString()}>
                            {formatDate(blog.createdAt.toString())}
                        </time>
                        <span className="text-muted-foreground" aria-hidden="true">·</span>
                        <span className="text-muted-foreground">
                            {calculateReadingTime(blog.content || "")} min read
                        </span>
                    </div>
                </header>

                <figure className="relative mx-auto mb-12 aspect-[16/8] w-full max-w-5xl overflow-hidden bg-muted sm:mb-16 sm:rounded-sm">
                    <Image
                        src={
                            blog.img ||
                            "https://img.daisyui.com/images/blog/nexus-dashboard-template-thumbnail.webp"
                        }
                        alt={blog.title}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1024px"
                    />
                </figure>

                <article className="mx-auto max-w-[680px] px-5 sm:px-8">
                    <div className="font-serif text-[18px] leading-[1.85] text-foreground sm:text-[20px]">
                        <ReactMarkdown
                            components={{
                                code({ className, children }) {
                                    const match = /language-(\w+)/.exec(className || "");
                                    return match ? (
                                        <SyntaxHighlighter
                                            style={oneDark as Record<string, CSSProperties>}
                                            language={match[1]}
                                            PreTag="div"
                                            className="!my-8 overflow-x-auto rounded-md border border-border !bg-card !p-5 font-mono text-sm leading-relaxed"
                                        >
                                            {String(children).replace(/\n$/, "")}
                                        </SyntaxHighlighter>
                                    ) : (
                                        <code
                                            className={`${className || ""} rounded bg-muted px-1.5 py-0.5 font-mono text-[0.82em] text-foreground`}
                                        >
                                            {children}
                                        </code>
                                    );
                                },
                                h1: ({ children }) => (
                                    <h2 className="mb-5 mt-14 font-sans text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                                        {children}
                                    </h2>
                                ),
                                h2: ({ children }) => (
                                    <h2 className="mb-4 mt-12 font-sans text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                                        {children}
                                    </h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 className="mb-3 mt-10 font-sans text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
                                        {children}
                                    </h3>
                                ),
                                h4: ({ children }) => (
                                    <h4 className="mb-3 mt-8 font-sans text-lg font-semibold tracking-tight">
                                        {children}
                                    </h4>
                                ),
                                h5: ({ children }) => (
                                    <h5 className="mb-3 mt-7 font-sans text-base font-semibold tracking-tight">
                                        {children}
                                    </h5>
                                ),
                                h6: ({ children }) => (
                                    <h6 className="mb-2 mt-6 font-sans text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                        {children}
                                    </h6>
                                ),
                                p: ({ children }) => <p className="mb-7">{children}</p>,
                                ul: ({ children }) => (
                                    <ul className="mb-7 list-disc space-y-2 pl-7">{children}</ul>
                                ),
                                ol: ({ children }) => (
                                    <ol className="mb-7 list-decimal space-y-2 pl-7">{children}</ol>
                                ),
                                li: ({ children }) => <li className="pl-1">{children}</li>,
                                a: ({ href, children }) => (
                                    <a
                                        href={href}
                                        className="text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {children}
                                    </a>
                                ),
                                blockquote: ({ children }) => (
                                    <blockquote className="my-9 border-l-2 border-primary pl-6 font-serif text-xl italic text-muted-foreground">
                                        {children}
                                    </blockquote>
                                ),
                                hr: () => <hr className="my-12 border-border" />,
                                table: ({ children }) => (
                                    <div className="my-8 overflow-x-auto rounded-md border border-border">
                                        <table className="w-full text-left font-sans text-sm">{children}</table>
                                    </div>
                                ),
                                thead: ({ children }) => (
                                    <thead className="bg-muted text-muted-foreground">{children}</thead>
                                ),
                                th: ({ children }) => (
                                    <th className="border-b border-border p-3 font-semibold">{children}</th>
                                ),
                                td: ({ children }) => (
                                    <td className="border-b border-border p-3">{children}</td>
                                ),
                            }}
                        >
                            {blog.content || ""}
                        </ReactMarkdown>
                    </div>
                </article>

                <section
                    aria-labelledby="discussion-heading"
                    className="mx-auto mt-14 max-w-[680px] border-t border-border px-5 pt-10 sm:px-8 sm:pt-12"
                >
                    <h2 id="discussion-heading" className="mb-7 font-serif text-2xl font-semibold tracking-tight">
                        Join the conversation
                    </h2>
                    <SignedIn>
                        <PostComment postId={blog.id} slug={slug} />
                    </SignedIn>
                    <SignedOut>
                        <div className="mb-8 border-y border-border py-5">
                            <p className="text-sm text-muted-foreground">
                                Sign in to share your thoughts on this story.
                            </p>
                        </div>
                    </SignedOut>
                    <Suspense
                        fallback={
                            <div className="mt-8 space-y-6">
                                <Skeleton className="h-20 w-full" />
                                <Skeleton className="h-20 w-full" />
                            </div>
                        }
                    >
                        <CommentsContainer postId={blog.id} />
                    </Suspense>
                </section>
            </main>
        </>
    );
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlogPost(slug);

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
            url: `${process.env.NEXT_PUBLIC_APP_URL || "https://hritujeet-portfolio.vercel.app"}/blogs/${slug}`,
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
