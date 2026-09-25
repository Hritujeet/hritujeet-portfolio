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
            <h3 className="text-xl font-bold tracking-tight mb-6">
                Comments ({comments.length})
            </h3>

            <div className="space-y-4">
                {comments.length <= 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                        No comments yet. Be the first to comment!
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-4">
                {comments.length > 0 &&
                    comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="bg-muted/50 p-4 rounded-lg border"
                        >
                            <div className="flex gap-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={comment.userImg} alt={comment.user} />
                                    <AvatarFallback>{comment.user.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-semibold text-sm">
                                            {comment.user}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {formatDate(
                                                comment.createdAt.toLocaleString()
                                            )}
                                        </span>
                                    </div>

                                    <p className="text-sm text-foreground/90 leading-relaxed">
                                        {comment.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export const dynamic = "force-dynamic";
export default CommentsContainer;
