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
            reset();
            queryClient.invalidateQueries({ queryKey: ["post", postId] });
            toast.success("Comment posted successfully");
        },
        onError: () => {
            toast.error("Failed to post comment");
        },
    });

    const onSubmit: SubmitHandler<CommentFormData> = (data) => {
        mutation.mutate(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-8 border-y border-border py-5"
        >
            <div className="flex flex-col gap-3">
                <Label htmlFor="comment" className="text-sm font-semibold">
                    What did you think?
                </Label>
                <Textarea
                    id="comment"
                    aria-invalid={Boolean(errors.comment)}
                    className={`min-h-[112px] resize-y rounded-md bg-background text-base ${
                        errors.comment ? "border-destructive focus-visible:ring-destructive" : ""
                    }`}
                    placeholder="Share a thoughtful response..."
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
                    <p role="alert" className="text-sm font-medium text-destructive">
                        {errors.comment.message}
                    </p>
                )}
                <div className="flex items-center justify-between gap-3">
                    <p className="text-xs text-muted-foreground">Be kind and keep it constructive.</p>
                    <Button
                        type="submit"
                        disabled={mutation.isPending}
                        size="sm"
                    >
                        {mutation.isPending && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {mutation.isPending ? "Responding..." : "Respond"}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default PostComment;
