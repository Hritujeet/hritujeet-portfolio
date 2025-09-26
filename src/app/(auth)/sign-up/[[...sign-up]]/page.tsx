import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const SignUpPage = () => {
    return (
        <div className="flex flex-col gap-2">
            <Link href={"/"} className="btn btn-accent">
                <ArrowLeft /> Home
            </Link>
            <SignUp
                appearance={{
                    theme: dark,
                }}
            />
        </div>
    );
};

export default SignUpPage;
