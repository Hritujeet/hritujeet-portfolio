import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "@/components/ui/button";

const SignUpPage = () => {
    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
            <div className="w-full max-w-[400px]">
                <Link className={buttonVariants({ variant: "ghost" })} href={"/"}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Home
                </Link>
            </div>
            <SignUp
                appearance={{
                    theme: dark,
                }}
            />
        </div>
    );
};

export default SignUpPage;
