import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";
import Query from "@/providers/Query";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
export const metadata: Metadata = {
    title: "Hritujeet | Portfolio",
    description:
        "Hey, there! I am Hritujeet, a web dev enthusiast as a teenage developer. I love to build things and share my knowledge with the world.",
};

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname =
        typeof window !== "undefined" ? window.location.pathname : "";
    const canonicalUrl = `https://hritujeet-portfolio.vercel.app${
        pathname.split("?")[0]
    }`;
    return (
        <html lang="en" className="dark">
            <Head>
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={canonicalUrl} />
                <meta property="og:title" content="Hritujeet | Portfolio" />
                <meta
                    property="og:description"
                    content="Hey, there! I am Hritujeet, a web dev enthusiast as a teenage developer. I love to build things and share my knowledge with the world."
                />
                <meta property="og:type" content="website" />
            </Head>
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
