"use client";
import { Loader, Send } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            className="btn btn-primary btn-lg w-full text-lg shadow-lg hover:shadow-xl transition-shadow"
        >
            {pending ? (
                <Loader className="animate-spin" />
            ) : (
                <>
                    <Send className="w-5 h-5" />
                    Send Message
                </>
            )}
        </button>
    );
};

export default SubmitButton;
