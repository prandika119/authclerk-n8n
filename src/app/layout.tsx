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
                        padding: "1rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h1>My Awesome App</h1>
                    {/* <div>
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div> */}
                </header>
                <main>{children}</main>
            </body>
        </html>
        // </ClerkProvider>
    );
}
