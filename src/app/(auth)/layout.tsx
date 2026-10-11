import { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
    title: "Auth | Hritujeet",
    description: "Sign in to join the conversation on Hritujeet's personal website.",
    keywords:
        "sign in, login, Hritujeet Sharma, personal website, technology, software, Next.js, React, JavaScript, tech blogs, software development, programming, personal tech blog",
};

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children, 
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className="dark">
            <ClerkProvider>
                <body className={`${inter.className} bg-background text-foreground flex flex-col justify-center items-center h-screen w-screen`}>
                    {children}
                </body>
            </ClerkProvider>
        </html>
    );
}
