// app/layout.tsx
import type { Metadata } from "next";
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
    title: "Clerk + Next.js App Router Quickstart",
    description: "A simple example of using Clerk with Next.js App Router.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // <ClerkProvider>
        <html lang="en">
            <body>
                <header
                    style={{
                        backgroundColor: "white",
                        padding: "1rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h1 style={{ color: "black" }}>Chatbot Robota</h1>
                </header>
                <main>{children}</main>
            </body>
        </html>
        // </ClerkProvider>
    );
}
