"use client";

import { Send, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleContactSubmit } from "./submit-contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type ContactFormData = {
    name: string;
    email: string;
    phone: string;
    message: string;
};

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>();

    const mutation = useMutation({
        mutationFn: async (data: ContactFormData)=>{
            await handleContactSubmit(data);
        },
        onSuccess: () => {
            toast.success("Message sent successfully!", {
                description: "I'll get back to you as soon as possible.",
            });
            reset();
        },
        onError: (error) => {
            toast.error("Failed to send message", {
                description: "Please try again or contact me directly via email.",
            });
            console.error("Form submission error:", error);
        },
    });

    const onSubmit = (data: ContactFormData) => {
        mutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
                    {...register("name", {
                        required: "Name is required",
                        minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters",
                        },
                    })}
                />
                {errors.name && (
                    <Label className="text-sm font-medium text-destructive">
                        {errors.name.message}
                    </Label>
                )}
            </div>

            {/* Email Input */}
            <div className="space-y-2">
                <Label htmlFor="email">Your Email</Label>
                <Input
                    type="email"
                    id="email"
                    placeholder="example@email.com"
                    className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                        },
                    })}
                />
                {errors.email && (
                    <Label className="text-sm font-medium text-destructive">
                        {errors.email.message}
                    </Label>
                )}
            </div>

            {/* Phone Input */}
            <div className="space-y-2">
                <Label htmlFor="phone">Your Phone Number</Label>
                <Input
                    type="tel"
                    id="phone"
                    placeholder="90xxx xxxxx (IN)"
                    className={errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}
                    {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Please enter a valid 10-digit phone number",
                        },
                    })}
                />
                {errors.phone && (
                    <Label className="text-sm font-medium text-destructive">
                        {errors.phone.message}
                    </Label>
                )}
            </div>

            {/* Message Textarea */}
            <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                    id="message"
                    placeholder="Tell me about your project or idea..."
                    className={`min-h-[150px] resize-none ${errors.message ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    {...register("message", {
                        required: "Message is required",
                        minLength: {
                            value: 10,
                            message: "Message must be at least 10 characters",
                        },
                    })}
                />
                {errors.message && (
                    <Label className="text-sm font-medium text-destructive">
                        {errors.message.message}
                    </Label>
                )}
            </div>

            <Button
                type="submit"
                size="lg"
                disabled={mutation.isPending}
                className="w-full text-base"
            >
                {mutation.isPending ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                    <Send className="mr-2 h-5 w-5" />
                )}
                {mutation.isPending ? "Sending..." : "Send Message"}
            </Button>
        </form>
    );
};

export default ContactForm;