import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ArrowLeft, ArrowLeftSquareIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const SignInPage = () => {
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
