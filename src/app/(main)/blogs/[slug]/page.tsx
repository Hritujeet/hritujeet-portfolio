// @ts-nocheck
import Image from "next/image";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { calculateReadingTime, formatDate } from "../../../../utils/utils";
import { prisma } from "../../../../../utils/db";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const blog = await prisma.blogPost.findUnique({
        where: { slug },
    });
    
    return (
        <section className="px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 bg-base-100">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-base-content mb-6 text-center leading-tight tracking-tight">
                    {blog?.title || "Blog Post"}
                </h1>
            </div>
            <div className="max-w-4xl mx-auto">
                {/* Featured Image */}
                <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 mb-12">
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
                    <div className="flex items-center justify-between gap-4 p-6 sm:p-8 mb-8 border-b border-base-200">
                        <div className="flex items-center gap-3">
                            <div>
                                <p className="font-semibold text-base sm:text-lg text-base-content">
                                    Hritujeet
                                </p>
                                <p className="text-sm text-base-content/70 font-medium">
                                    Author
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col text-sm text-base-content/70 text-right">
                            <time className="font-medium">
                                {formatDate(
                                    blog?.createdAt.toString() as string
                                )}
                            </time>
                            <span className="text-xs mt-1">
                                {calculateReadingTime(blog?.content || "")} min read
                            </span>
                        </div>
                    </div>
                    <div className="card-body p-6 sm:p-8 lg:p-12">
                        <article className="prose prose-lg max-w-none 
                            prose-headings:font-bold prose-headings:text-base-content prose-headings:tracking-tight
                            prose-p:text-base-content prose-p:leading-relaxed prose-p:text-lg prose-p:mb-6
                            prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-base-content prose-strong:font-semibold
                            prose-code:text-base-content prose-code:font-mono prose-code:text-sm
                            prose-pre:bg-base-200 prose-pre:rounded-lg
                            prose-blockquote:text-base-content prose-blockquote:border-primary prose-blockquote:font-medium
                            prose-li:text-base-content prose-li:leading-relaxed prose-li:mb-2
                            prose-table:text-base-content
                            prose-th:font-semibold prose-th:text-base-content
                            prose-td:text-base-content">
                            <ReactMarkdown
                                components={{
                                    code({ node, inline, className, children, ...props }) {
                                        const match = /language-(\w+)/.exec(className || '');
                                        return !inline && match ? (
                                            <SyntaxHighlighter
                                                style={tomorrow}
                                                language={match[1]}
                                                PreTag="div"
                                                className="rounded-lg !my-6"
                                                {...props}
                                            >
                                                {String(children).replace(/\n$/, '')}
                                            </SyntaxHighlighter>
                                        ) : (
                                            <code className={`${className} bg-base-200 px-2 py-1 rounded font-mono text-sm font-medium`} {...props}>
                                                {children}
                                            </code>
                                        );
                                    },
                                    h1: ({ children }) => (
                                        <h1 className="text-4xl lg:text-5xl font-black mb-8 mt-12 text-base-content border-b-2 border-base-300 pb-4 tracking-tight leading-tight">
                                            {children}
                                        </h1>
                                    ),
                                    h2: ({ children }) => (
                                        <h2 className="text-2xl lg:text-3xl font-bold mb-6 mt-12 text-base-content tracking-tight leading-tight">
                                            {children}
                                        </h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className="text-xl lg:text-2xl font-bold mb-4 mt-10 text-base-content tracking-tight leading-tight">
                                            {children}
                                        </h3>
                                    ),
                                    h4: ({ children }) => (
                                        <h4 className="text-lg lg:text-xl font-semibold mb-3 mt-8 text-base-content tracking-tight">
                                            {children}
                                        </h4>
                                    ),
                                    h5: ({ children }) => (
                                        <h5 className="text-base lg:text-lg font-semibold mb-3 mt-6 text-base-content tracking-tight">
                                            {children}
                                        </h5>
                                    ),
                                    h6: ({ children }) => (
                                        <h6 className="text-sm lg:text-base font-semibold mb-2 mt-6 text-base-content/90 uppercase tracking-wide">
                                            {children}
                                        </h6>
                                    ),
                                    p: ({ children }) => (
                                        <p className="mb-6 leading-relaxed text-base-content text-lg font-normal">
                                            {children}
                                        </p>
                                    ),
                                    ul: ({ children }) => (
                                        <ul className="list-disc list-inside mb-6 space-y-3 text-base-content text-lg pl-2 flex flex-col gap-2">
                                            {children}
                                        </ul>
                                    ),
                                    ol: ({ children }) => (
                                        <ol className="list-decimal list-inside mb-6 space-y-3 text-base-content text-lg pl-2 flex flex-col gap-2">
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
                                            className="text-primary hover:text-primary-focus font-medium no-underline hover:underline transition-colors duration-200"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {children}
                                        </a>
                                    ),
                                    blockquote: ({ children }) => (
                                        <blockquote className="border-l-4 border-primary bg-base-200 p-6 my-8 rounded-r-lg font-medium text-lg italic">
                                            {children}
                                        </blockquote>
                                    ),
                                    hr: () => <hr className="my-12 border-base-300" />,
                                    table: ({ children }) => (
                                        <div className="overflow-x-auto my-8">
                                            <table className="table table-zebra w-full">
                                                {children}
                                            </table>
                                        </div>
                                    ),
                                    thead: ({ children }) => (
                                        <thead className="bg-base-200">
                                            {children}
                                        </thead>
                                    ),
                                    th: ({ children }) => (
                                        <th className="font-bold text-base-content text-left p-4">
                                            {children}
                                        </th>
                                    ),
                                    td: ({ children }) => (
                                        <td className="p-4 text-base-content">
                                            {children}
                                        </td>
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