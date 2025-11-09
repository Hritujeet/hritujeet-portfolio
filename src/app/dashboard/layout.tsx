import type { Metadata } from "next";
import "../globals.css";
import AdminLayout from "@/components/admin/sidebar-layout-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";

export const metadata: Metadata = {
    title: "Hritujeet's Admin Dashboard",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await currentUser();

    if (!user || user.emailAddresses.length <= 0 || !user.emailAddresses[0] || user.emailAddresses[0].emailAddress !== process.env.ADMIN) {
        return notFound();
    }
    return (
        <html lang="en" data-theme="forest">
            <body>
                <ClerkProvider>
                    <Toaster theme="dark" />
                    <AdminLayout>{children}</AdminLayout>
                </ClerkProvider>
            </body>
        </html>
    );
}
