import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";
import Query from "@/providers/Query";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { currentUser } from "@clerk/nextjs/server";
import { isAdminEmail } from "@/utils/admin";

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://hritujeet-portfolio.vercel.app"),
    title: {
        default: "Hritujeet | Tech Notes & Experiments",
        template: "%s | Hritujeet",
    },
    description: "A personal space for Hritujeet's notes on technology, ideas worth exploring, and things in progress.",
    keywords: [
        "Hritujeet Sharma", "personal tech website", "technology", "software development",
        "web development", "programming", "build logs", "Next.js", "React", "TypeScript"
    ],
    authors: [{ name: "Hritujeet Sharma" }],
    creator: "Hritujeet Sharma",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://hritujeet-portfolio.vercel.app",
        title: "Hritujeet | Tech Notes & Experiments",
        description: "A personal space for technology notes, ideas worth exploring, and things in progress.",
        siteName: "Hritujeet Sharma",
        images: [
            {
                url: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=1200&h=630&auto=format&fit=crop",
                width: 1200,
                height: 630,
                alt: "Hritujeet Sharma's personal website",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Hritujeet | Tech Notes & Experiments",
        description: "A personal space for technology notes, ideas worth exploring, and things in progress.",
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

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await currentUser();
    const isAdmin = Boolean(
        user?.emailAddresses.some(({ emailAddress }) =>
            isAdminEmail(emailAddress, process.env.ADMIN)
        )
    );

    return (
        <html lang="en" className="dark">
            <head>
                <meta name="theme-color" content="#000000" />
            </head>
            <body className={`${inter.className} bg-background text-foreground antialiased`}>
                <ClerkProvider>
                    <Query>
                        <Navbar isAdmin={isAdmin} />
                        <Toaster theme="dark"/>
                        <NextTopLoader
                            color="gold"
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
