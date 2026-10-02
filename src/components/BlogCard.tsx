import Link from "next/link";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { formatDate } from "@/utils/utils";

type BlogCardProps = {
    title: string;
    slug: string;
    img: string;
    description: string;
    createdAt: Date | string;
};

const BlogCard = ({ title, slug, img, description, createdAt }: BlogCardProps) => (
    <Card className="group relative mx-auto flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card pt-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
        <div className="relative w-full">
            <div className="absolute inset-0 z-30 aspect-video bg-black/35 transition-colors duration-300 group-hover:bg-black/20" />
            <img
                src={img}
                alt={title}
                loading="lazy"
                className="relative z-20 aspect-video w-full object-cover brightness-75 grayscale-[30%] transition duration-500 group-hover:scale-[1.02] group-hover:brightness-90 group-hover:grayscale-0"
            />
        </div>
        <CardHeader className="flex-grow">
            <CardAction>
                <Badge variant="secondary">{formatDate(createdAt.toString())}</Badge>
            </CardAction>
            <CardTitle className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight">
                {title}
            </CardTitle>
            <CardDescription className="min-h-[4.5rem] line-clamp-3 text-sm leading-relaxed">
                {description}
            </CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto border-t border-border/50">
            <Link
                href={`/blogs/${slug}`}
                className={buttonVariants({ size: "default", className: "w-full" })}
                aria-label={`Read more about ${title}`}
            >
                Read Article
            </Link>
        </CardFooter>
    </Card>
);

export default BlogCard;
