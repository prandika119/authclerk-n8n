"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginForm({ webhookUrl }: { webhookUrl: string }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const tele_id = searchParams.get("tele_id");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch(webhookUrl ?? "", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, tele_id }),
            });
            const data = await res.json().catch(() => ({}));
            setLoading(false);
            if (res.ok) {
                alert(
                    "Login berhasil!" +
                        (data && data.message ? `\n${data.message}` : "")
                );
            } else {
                setError(
                    data && data.error
                        ? data.error
                        : "Login gagal, cek data Anda."
                );
            }
        } catch {
            setLoading(false);
            setError("Terjadi kesalahan koneksi ke server.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-neutral-900 p-8 rounded shadow-md w-full max-w-md"
        >
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            {error && (
                <div className="mb-4 text-red-500 text-center">{error}</div>
            )}
            <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="email">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 dark:bg-neutral-800 dark:text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                />
            </div>

            <div className="mb-6">
                <label className="block mb-1 font-medium" htmlFor="password">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 dark:bg-neutral-800 dark:text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors disabled:opacity-50"
                disabled={loading}
            >
                {loading ? "Memproses..." : "Login"}
            </button>
        </form>
    );
}
