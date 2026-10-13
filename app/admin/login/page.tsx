"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LockKeyhole, Store } from "lucide-react";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(
            "Admin authentication is not connected yet. Configure the backend login endpoint before using this panel.",
        );
    }

    return (<main className="flex min-h-screen items-center justify-center bg-[#F7F6FA] px-4 py-10"> <div className="w-full max-w-md"> <Link href="/" className="mb-8 flex items-center justify-center gap-3"> <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0EB8BA] text-white"> <Store size={25} /> </span> <span> <span className="block text-xl font-extrabold text-slate-900">Wenbeya</span> <span className="text-xs text-slate-500">Restaurant management</span> </span> </Link>

        ```
        <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm sm:p-9">
            <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-[#6D54A5]">
                <LockKeyhole size={23} />
            </div>

            <h1 className="text-2xl font-extrabold text-slate-900">Admin sign in</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">
                Sign-in will work once server-side authentication is connected.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Email address</span>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="admin@example.com"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#0EB8BA] focus:ring-2 focus:ring-teal-100"
                    />
                </label>

                <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter your password"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#0EB8BA] focus:ring-2 focus:ring-teal-100"
                    />
                </label>

                {error && (
                    <p role="alert" className="rounded-xl bg-amber-50 p-3 text-sm leading-5 text-amber-800">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="w-full rounded-xl bg-[#0EB8BA] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#0CA5A7]"
                >
                    Sign in
                </button>
            </form>

            <p className="mt-6 text-center text-xs leading-5 text-slate-400">
                Administrator access should be protected by server-side authentication and role permissions.
            </p>
        </div>
    </div>
    </main>

    );
}
