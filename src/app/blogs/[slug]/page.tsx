// @ts-nocheck
import Image from "next/image";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { prisma } from "../../../../utils/db";
import { calculateReadingTime, formatDate } from "../../../../utils/utils";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const blog = await prisma.blogPost.findUnique({
        where: { slug },
    });
    
    return (
        <section className="px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 bg-base-100">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl tracking-tighter md:text-5xl font-bold text-base-content mb-10 text-center">
                    {blog?.title || "Blog Post"}
                </h1>
            </div>
            <div className="max-w-4xl mx-auto">
                {/* Featured Image */}
                <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8">
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
                <div className="card shadow-sm">
                    <div className="flex items-center justify-between gap-4 p-4 sm:p-8 mb-6 sm:mb-8">
                        <div className="flex items-center gap-3">
                            <div>
                                <p className="font-semibold text-sm sm:text-base">
                                    Hritujeet
                                </p>
                                <p className="text-xs sm:text-sm text-base-content/60">
                                    Author
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col text-xs sm:text-sm text-base-content/60">
                            <time className="text-white">
                                {formatDate(
                                    blog?.createdAt.toString() as string
                                )}
                            </time>
                            <span>
                                {calculateReadingTime(blog?.content || "")} min
                                read
                            </span>
                        </div>
                    </div>
                    <div className="card-body p-4 sm:p-8 lg:p-12">
                        <article className="prose prose-lg max-w-none prose-headings:text-base-content prose-p:text-base-content prose-a:text-primary prose-strong:text-base-content prose-code:text-base-content prose-pre:bg-base-200 prose-blockquote:text-base-content prose-blockquote:border-primary">
                            <ReactMarkdown
                                components={{
                                    code({ node, inline, className, children, ...props }) {
                                        const match = /language-(\w+)/.exec(className || '');
                                        return !inline && match ? (
                                            <SyntaxHighlighter
                                                style={tomorrow}
                                                language={match[1]}
                                                PreTag="div"
                                                className="rounded-lg"
                                                {...props}
                                            >
                                                {String(children).replace(/\n$/, '')}
                                            </SyntaxHighlighter>
                                        ) : (
                                            <code className={`${className} bg-base-200 px-1 py-0.5 rounded text-sm`} {...props}>
                                                {children}
                                            </code>
                                        );
                                    },
                                    h1: ({ children }) => (
                                        <h1 className="text-4xl font-bold mb-4 text-base-content border-b border-base-300 pb-2">
                                            {children}
                                        </h1>
                                    ),
                                    h2: ({ children }) => (
                                        <h2 className="text-3xl font-semibold mb-3 text-base-content">
                                            {children}
                                        </h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className="text-2xl font-medium mb-2 text-base-content">
                                            {children}
                                        </h3>
                                    ),
                                    p: ({ children }) => (
                                        <p className="mb-4 leading-relaxed text-base-content">
                                            {children}
                                        </p>
                                    ),
                                    ul: ({ children }) => (
                                        <ul className="list-disc list-inside mb-4 space-y-2 text-base-content">
                                            {children}
                                        </ul>
                                    ),
                                    ol: ({ children }) => (
                                        <ol className="list-decimal list-inside mb-4 space-y-2 text-base-content">
                                            {children}
                                        </ol>
                                    ),
                                    a: ({ href, children }) => (
                                        <a 
                                            href={href} 
                                            className="text-primary hover:text-primary-focus underline"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {children}
                                        </a>
                                    ),
                                    blockquote: ({ children }) => (
                                        <blockquote className="border-l-4 border-primary bg-base-200 p-4 italic my-4 rounded-r-lg">
                                            {children}
                                        </blockquote>
                                    ),
                                }}
                            >
                                {blog?.content || ""}
                            </ReactMarkdown>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const metadata: Metadata = {
    title: "Read Blogs | Hritujeet",
    description:
        "Read blogs about web development, programming, and more. Stay updated with the latest trends and insights in the tech world. Join our community of developers and enthusiasts.",
    keywords:
        "react, nextjs, javascript, web development, programming, blogs, tech trends, developer community, insights",
};

export default page;