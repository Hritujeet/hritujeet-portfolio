import { prisma } from "../utils/db";
import { formatDate } from "../utils/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CommentsContainer = async ({ postId }: { postId: string }) => {
    const comments = await prisma.comment.findMany({
        where: {
            blogPostId: postId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="py-4">
            <h3 className="mb-5 text-sm font-semibold text-foreground">
                Responses <span className="ml-1 font-normal text-muted-foreground">{comments.length}</span>
            </h3>
            {comments.length === 0 ? (
                <p className="border-y border-border py-6 text-sm text-muted-foreground">
                    No responses yet. Start the conversation.
                </p>
            ) : (
                <div className="divide-y divide-border">
                    {comments.map((comment) => (
                        <article key={comment.id} className="flex gap-3 py-5 first:pt-2">
                            <Avatar className="h-9 w-9 shrink-0">
                                <AvatarImage src={comment.userImg} alt={comment.user} />
                                <AvatarFallback>
                                    {comment.user.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                                <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                                    <span className="font-semibold text-foreground">{comment.user}</span>
                                    <span className="text-muted-foreground" aria-hidden="true">·</span>
                                    <time
                                        className="text-xs text-muted-foreground"
                                        dateTime={comment.createdAt.toISOString()}
                                    >
                                        {formatDate(comment.createdAt.toString())}
                                    </time>
                                </div>
                                <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground/90">
                                    {comment.content}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
};

export const dynamic = "force-dynamic";
export default CommentsContainer;
