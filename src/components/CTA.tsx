import Link from "next/link";
import React from "react";

const CTA = () => {
    return (
        <div className="card bg-base-200 w-full py-8">
            <div className="card-body items-center text-center gap-8">
                <h2 className="card-title text-5xl font-semibold">
                    Let&#39;s Talk
                </h2>
                <div className="card-actions justify-end">
                    <Link href={"/about"} className="btn btn-outline btn-accent">
                        Learn More
                    </Link>
                    <Link
                        href={"/contact"}
                        className="btn btn-soft btn-accent"
                    >
                        Contact
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CTA;
