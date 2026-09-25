import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";
import Query from "@/providers/Query";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://hritujeet-portfolio.vercel.app"),
    title: {
        default: "Hritujeet Sharma | Full-Stack Engineer",
        template: "%s | Hritujeet Sharma",
    },
    description: "Portfolio of Hritujeet Sharma. Teenage full-stack developer, specializing in Next.js, React, Node.js, and modern web architectures. Building impactful digital experiences.",
    keywords: [
        "Hritujeet Sharma", "Full-Stack Developer", "Software Engineer", 
        "Next.js Developer", "React Developer", "TypeScript", 
        "Web Development", "Frontend Engineer", "Backend Engineer"
    ],
    authors: [{ name: "Hritujeet Sharma" }],
    creator: "Hritujeet Sharma",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://hritujeet-portfolio.vercel.app",
        title: "Hritujeet Sharma | Full-Stack Engineer",
        description: "Portfolio of Hritujeet Sharma. Teenage full-stack developer, specializing in Next.js, React, Node.js, and modern web architectures.",
        siteName: "Hritujeet Sharma Portfolio",
        images: [
            {
                url: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=1200&h=630&auto=format&fit=crop",
                width: 1200,
                height: 630,
                alt: "Hritujeet Sharma - Full-Stack Engineer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Hritujeet Sharma | Full-Stack Engineer",
        description: "Portfolio of Hritujeet Sharma. Teenage full-stack developer, specializing in Next.js, React, Node.js, and modern web architectures.",
        images: ["https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=1200&h=630&auto=format&fit=crop"],
        creator: "@hritujeet",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <head>
                <meta name="theme-color" content="#000000" />
            </head>
            <body className={`${inter.className} bg-background text-foreground antialiased`}>
                <ClerkProvider>
                    <Query>
                        <Navbar />
                        <Toaster theme="dark"/>
                        <NextTopLoader
                            color="green"
                            height={1.5}
                            showSpinner={false}
                        />
                        {children}
                        <Footer />
                    </Query>
                </ClerkProvider>
            </body>
        </html>
    );
}
