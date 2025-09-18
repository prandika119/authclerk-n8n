import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK || "";

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-black">
            <Suspense fallback={<div>Loading...</div>}>
                <LoginForm webhookUrl={webhookUrl} />
            </Suspense>
        </div>
    );
}
