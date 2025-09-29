"use client";

import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleContactSubmit } from "./submit-contact";

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
            <div className="form-control">
                <label htmlFor="name" className="label">
                    <span className="label-text">Your Name</span>
                </label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className={`input border shadow-none w-full ${
                        errors.name ? "input-error" : ""
                    }`}
                    {...register("name", {
                        required: "Name is required",
                        minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters",
                        },
                    })}
                />
                {errors.name && (
                    <label className="label">
                        <span className="label-text-alt text-error">
                            {errors.name.message}
                        </span>
                    </label>
                )}
            </div>

            {/* Email Input */}
            <div className="form-control">
                <label htmlFor="email" className="label">
                    <span className="label-text">Your Email</span>
                </label>
                <input
                    type="email"
                    id="email"
                    placeholder="example@email.com"
                    className={`input border shadow-none w-full ${
                        errors.email ? "input-error" : ""
                    }`}
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                        },
                    })}
                />
                {errors.email && (
                    <label className="label">
                        <span className="label-text-alt text-error">
                            {errors.email.message}
                        </span>
                    </label>
                )}
            </div>

            {/* Phone Input */}
            <div className="form-control">
                <label htmlFor="phone" className="label">
                    <span className="label-text">Your Phone Number</span>
                </label>
                <input
                    type="tel"
                    id="phone"
                    placeholder="90xxx xxxxx (IN)"
                    className={`input border shadow-none w-full ${
                        errors.phone ? "input-error" : ""
                    }`}
                    {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Please enter a valid 10-digit phone number",
                        },
                    })}
                />
                {errors.phone && (
                    <label className="label">
                        <span className="label-text-alt text-error">
                            {errors.phone.message}
                        </span>
                    </label>
                )}
            </div>

            {/* Message Textarea */}
            <div className="form-control">
                <label htmlFor="message" className="label">
                    <span className="label-text">Message</span>
                </label>
                <textarea
                    id="message"
                    placeholder="Tell me about your project or idea..."
                    className={`textarea border shadow-none h-24 w-full ${
                        errors.message ? "textarea-error" : ""
                    }`}
                    {...register("message", {
                        required: "Message is required",
                        minLength: {
                            value: 10,
                            message: "Message must be at least 10 characters",
                        },
                    })}
                ></textarea>
                {errors.message && (
                    <label className="label">
                        <span className="label-text-alt text-error">
                            {errors.message.message}
                        </span>
                    </label>
                )}
            </div>

            <button
                type="submit"
                disabled={mutation.isPending}
                className="btn btn-primary btn-lg w-full text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
                {mutation.isPending ? (
                    <span className="loading loading-spinner"></span>
                ) : (
                    <>
                        <Send className="w-5 h-5" />
                        Send Message
                    </>
                )}
            </button>
        </form>
    );
};

export default ContactForm;