"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginForm({ webhookUrl }: { webhookUrl: string }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [popup, setPopup] = useState<{
        show: boolean;
        type: "success" | "error";
        message: string;
    }>({ show: false, type: "success", message: "" });

    const searchParams = useSearchParams();
    const tele_id = searchParams.get("tele_id");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
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
                setPopup({
                    show: true,
                    type: "success",
                    message: data?.message || "Login berhasil!",
                });
            } else {
                setPopup({
                    show: true,
                    type: "error",
                    message:
                        data?.error || "Login gagal, cek data Anda.",
                });
            }
        } catch {
            setLoading(false);
            setPopup({
                show: true,
                type: "error",
                message: "Terjadi kesalahan koneksi ke server.",
            });
        }
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
            <form
                onSubmit={handleSubmit}
                className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-8 min-w-[350px] w-full max-w-md"
            >
                <h2 className="font-semibold text-2xl text-black text-center">Login Chatbot RoboAI</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                        Email Robota
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        placeholder="Enter your password"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
                    disabled={loading}
                >
                    {loading ? "Memproses..." : "Login"}
                </button>
                <p className="text-center text-black text-sm">
                    Need to create an account?{' '}
                    <Link className="text-indigo-500 hover:underline" href="https://robota.app/id/signup">
                        Create Account
                    </Link>
                </p>
            </form>

            {popup.show && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center"
                    onClick={() => setPopup({ ...popup, show: false })}
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full"
                        onClick={(e) => e.stopPropagation()}>
                        <h3
                            className={`text-xl font-bold mb-4 ${popup.type === "success"
                                ? "text-green-600"
                                : "text-red-600"
                                }`}
                        >
                            {popup.type === "success" ? "Berhasil!" : "Gagal"}
                        </h3>
                        <p className="text-gray-700 mb-6">{popup.message}</p>
                        {popup.type === "success" ? (
                            <a
                                href="https://t.me/RoboAI_AsistenHotelManager_bot"
                                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Kembali ke Telegram
                            </a>
                        ) : (
                            <button
                                onClick={() => setPopup({ ...popup, show: false })}
                                className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition-colors"
                            >
                                Coba Lagi
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
