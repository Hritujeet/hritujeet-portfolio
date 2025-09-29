"use client";
import { SignIn, useClerk } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

const SignInPage = () => {
    const { loaded } = useClerk();
    if (!loaded) {
        return <Loader2 className="animate-spin h-8 w-8" />;
    }
    return (
        <div className="flex flex-col gap-2">
            <Link href={"/"} className="btn btn-accent">
                <ArrowLeft /> Home
            </Link>
            <SignIn
                appearance={{
                    theme: dark,
                }}
            />
        </div>
    );
};

export default SignInPage;
