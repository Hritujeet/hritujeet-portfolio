import { prisma } from "../../utils/db";
import { formatDate } from "../../utils/utils";

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
        <div className="p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
                Comments ({comments.length})
            </h3>

            <div className="space-y-4">
                {comments.length <= 0 && (
                    <div className="text-center py-8 text-base-content opacity-60">
                        No comments yet. Be the first to comment!
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-4">
                {comments.length > 0 &&
                    comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="bg-base-200 p-4 rounded-lg"
                        >
                            <div className="flex gap-3">
                                <div className="avatar">
                                    <div className="w-10 h-10 rounded-full">
                                        <img
                                            src={comment.userImg}
                                            alt={comment.user}
                                        />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold">
                                            {comment.user}
                                        </span>
                                        <span className="text-sm text-base-content opacity-60">
                                            {formatDate(
                                                comment.createdAt.toLocaleString()
                                            )}
                                        </span>
                                    </div>

                                    <p className="text-base-content mb-2">
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
