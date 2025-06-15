import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";
import Query from "@/providers/Query";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Hritujeet | Portfolio",
    description: "Hey, there! I am Hritujeet, a web dev enthusiast as a teenage developer. I love to build things and share my knowledge with the world."
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-900 to-gray-950 text-gray-200`}
        >
        <Query>
            <Navbar/>
            <NextTopLoader/>
            {children}
            <Footer/>
        </Query>
        </body>
        </html>
    );
}
