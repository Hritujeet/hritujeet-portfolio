import AdminLayout from "@/components/admin/sidebar-layout-provider";
import Query from "@/providers/Query";
import { ClerkProvider } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import "../globals.css";

export const metadata: Metadata = {
    title: "Hritujeet's Admin Dashboard",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await currentUser();

    if (
        !user ||
        user.emailAddresses.length <= 0 ||
        !user.emailAddresses[0] ||
        user.emailAddresses[0].emailAddress !== process.env.ADMIN
    ) {
        return notFound();
    }
    return (
        <html lang="en" data-theme="forest">
            <body>
                <ClerkProvider>
                    <Query>
                        <Toaster theme="dark" />
                        <AdminLayout>{children}</AdminLayout>
                    </Query>
                </ClerkProvider>
            </body>
        </html>
    );
}
