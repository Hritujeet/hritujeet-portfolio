import Link from "next/link";
import React from "react";

const CTA = () => {
    return (
        <div className="rounded-xl border w-[80vw] md:w-[60vw] mx-auto py-10 mt-20 text-center space-y-8">
            <h2 className="text-4xl font-semibold">Let&#39;s Talk</h2>
            <Link
                href={"/about"}
                className="mx-2 translate-0 hover:translate-y-5 transition-all font-medium text-sm border px-4 py-2 duration-150 rounded-md cursor-pointer"
            >
                Learn More
            </Link>
            <Link
                href={"/contact"}
                className="px-4 py-2 translate-0 hover:translate-y-5 transition-all cursor-pointer rounded-md shadow-md hover:drop-shadow-white duration-150"
            >
                Contact
            </Link>
        </div>
    );
};

export default CTA;
