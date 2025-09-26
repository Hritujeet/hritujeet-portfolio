import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-theme="forest">
            <ClerkProvider>
                <body className="flex flex-col justify-center items-center h-[calc(100vh-1px)] w-screen">
                    {children}
                </body>
            </ClerkProvider>
        </html>
    );
}
