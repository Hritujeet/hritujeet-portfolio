import AdminLayout from "@/components/admin/sidebar-layout-provider";
import Query from "@/providers/Query";
import { ClerkProvider } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import { isAdminEmail } from "@/utils/admin";
import "../globals.css";

export const metadata: Metadata = {
    title: "Hritujeet's Admin Dashboard",
};

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await currentUser();

    if (
        !user ||
        !user.emailAddresses.some(({ emailAddress }) =>
            isAdminEmail(emailAddress, process.env.ADMIN)
        )
    ) {
        return notFound();
    }
    return (
        <html lang="en" className="dark">
            <body className={`${inter.className} bg-background text-foreground antialiased`}>
                <ClerkProvider>
                    <Query>
                        <Toaster theme="dark" />
                        <AdminLayout
                            user={{
                                name: user.firstName || user.username || "Admin",
                                email: user.primaryEmailAddress?.emailAddress || "",
                                avatar: user.imageUrl,
                            }}
                        >
                            {children}
                        </AdminLayout>
                    </Query>
                </ClerkProvider>
            </body>
        </html>
    );
}
