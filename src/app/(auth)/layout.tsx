import { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
    title: "Auth | Hritujeet",
    description: "Hey, there! I am Hritujeet, a web dev enthusiast as a teenage developer. I love to build things and share my knowledge with the world.",
    keywords:
        "sign in, login, explore portfolio, Hritujeet Sharma, teenage developer, coding enthusiast, web dev, Next.js, React, JavaScript, tech blogs, software development, coding tutorials, personal blog, tech enthusiast, coding community, web design, frontend development, backend development, full-stack development, open source, tech education, coding resources, developer portfolio, Kota, MIT Aspirant",
};

export default function RootLayout({
    children, 
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-theme="forest" suppressHydrationWarning>
            <ClerkProvider>
                <body className="flex flex-col justify-center items-center h-[calc(100vh-1px)] w-screen">
                    {children}
                </body>
            </ClerkProvider>
        </html>
    );
}
