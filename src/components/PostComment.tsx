"use client";
import { createComment } from "@/actions/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface CommentFormData {
    comment: string;
}

const PostComment = ({ postId, slug }: { postId: string; slug: string }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CommentFormData>();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: CommentFormData) => {
            await createComment(data.comment, postId, slug);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["post", postId] });
            toast.success("Comment posted successfully");
        },
        onError: () => {
            toast.error("Failed to post comment");
        },
    });

    const onSubmit: SubmitHandler<CommentFormData> = (data) => {
        console.log(data);
        mutation.mutate(data);
        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-base-200 p-4 rounded-lg"
        >
            <div className="flex flex-col gap-3">
                <textarea
                    className={`textarea textarea-bordered w-full min-h-24 resize-none ${
                        errors.comment ? "textarea-error outline-red-500" : ""
                    }`}
                    placeholder="Write your comment..."
                    {...register("comment", {
                        required: "Comment is required",
                        minLength: {
                            value: 3,
                            message:
                                "Comment must be at least 3 characters long",
                        },
                    })}
                />
                {errors.comment && (
                    <label className="label">
                        <span className="label-text-alt text-error">
                            Comment is required and must be at least 3
                            characters long.
                        </span>
                    </label>
                )}
                <div className="flex justify-end">
                    <button
                        className="btn btn-primary"
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? (
                            <span className="loading loading-spinner"></span>
                        ) : (
                            "Post Comment"
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default PostComment;
