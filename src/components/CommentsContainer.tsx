const CommentsContainer = ({ postId }: { postId: string }) => {
    const comments = [
        {
            id: "1",
            author: "John Doe",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
            content: "Great post! This is really helpful.",
            timestamp: "2 hours ago",
            likes: 5,
        },
        {
            id: "2",
            author: "Jane Smith",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
            content:
                "Thanks for sharing this. I learned a lot from your explanation.",
            timestamp: "5 hours ago",
            likes: 3,
        },
        {
            id: "3",
            author: "Mike Johnson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
            content:
                "Could you elaborate more on the second point? I would love to understand it better.",
            timestamp: "1 day ago",
            likes: 1,
        },
    ];

    return (
        <div className="p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
                Comments ({comments.length})
            </h3>

            <div className="space-y-4">
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="bg-base-200 p-4 rounded-lg"
                    >
                        <div className="flex gap-3">
                            <div className="avatar">
                                <div className="w-10 h-10 rounded-full">
                                    <img
                                        src={comment.avatar}
                                        alt={comment.author}
                                    />
                                </div>
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold">
                                        {comment.author}
                                    </span>
                                    <span className="text-sm text-base-content opacity-60">
                                        {comment.timestamp}
                                    </span>
                                </div>

                                <p className="text-base-content mb-2">
                                    {comment.content}
                                </p>

                                {/* <div className="flex gap-4 items-center">
                                    <button className="btn btn-ghost btn-xs gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                            />
                                        </svg>
                                        {comment.likes}
                                    </button>

                                    <button className="btn btn-ghost btn-xs">
                                        Reply
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {comments.length === 0 && (
                <div className="text-center py-8 text-base-content opacity-60">
                    No comments yet. Be the first to comment!
                </div>
            )}
        </div>
    );
};

export default CommentsContainer;
