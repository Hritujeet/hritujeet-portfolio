"use client";
import { createComment } from "@/actions/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

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
            className="bg-muted p-6 rounded-lg border"
        >
            <div className="flex flex-col gap-4">
                <Textarea
                    className={`min-h-[100px] resize-none ${
                        errors.comment ? "border-destructive focus-visible:ring-destructive" : ""
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
                    <Label className="text-sm font-medium text-destructive">
                        Comment is required and must be at least 3 characters long.
                    </Label>
                )}
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {mutation.isPending ? "Posting..." : "Post Comment"}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default PostComment;
