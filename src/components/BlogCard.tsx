import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/utils/utils";

type BlogCardProps = {
    title: string;
    slug: string;
    img: string;
    description: string;
    createdAt: Date | string;
};

const BlogCard = ({ title, slug, img, description, createdAt }: BlogCardProps) => (
    <article className="border-b border-border/70 py-7 first:pt-0 sm:py-8">
        <Link
            href={`/blogs/${slug}`}
            className="group grid grid-cols-[minmax(0,1fr)_6rem] items-center gap-5 sm:grid-cols-[minmax(0,1fr)_11rem] sm:gap-8"
            aria-label={`Read article: ${title}`}
        >
            <div className="min-w-0">
                <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Hritujeet Sharma</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={new Date(createdAt).toISOString()}>
                        {formatDate(new Date(createdAt).toISOString())}
                    </time>
                </div>
                <h2 className="line-clamp-2 text-lg font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-xl">
                    {title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {description}
                </p>
                <span className="mt-4 inline-flex text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground sm:text-sm">
                    Read story <span className="ml-1" aria-hidden="true">→</span>
                </span>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-sm bg-muted">
                <Image
                    src={img}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 96px, 176px"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
        </Link>
    </article>
);

export default BlogCard;
