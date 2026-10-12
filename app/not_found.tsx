
import Link from "next/link";
import { Home, UtensilsCrossed, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <main className="flex min-h-[75vh] items-center justify-center bg-white px-6 py-16">
            <div className="w-full max-w-xl text-center">
                {/* Restaurant icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#E8FAFA]">
                    <UtensilsCrossed
                        size={38}
                        className="text-[#6D54A5]"
                    />
                </div>

                {/* Error code */}
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#6D54A5]">
                    SavoryHouse
                </p>

                <h1 className="text-8xl font-extrabold tracking-tight text-[#0EB8BA] sm:text-9xl">
                    404
                </h1>

                <h2 className="mt-5 text-2xl font-bold text-[#252238] sm:text-3xl">
                    Oops! This page is off the menu.
                </h2>

                <p className="mx-auto mt-4 max-w-md text-base leading-7 text-[#716D80]">
                    Looks like this page isn&apos;t available.
                    Don&apos;t worry — there are plenty of delicious
                    things waiting for you at SavoryHouse.
                </p>

                {/* Navigation buttons */}
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0EB8BA] px-6 py-3.5 font-semibold text-[#17212B] transition hover:bg-[#0CA5A7]"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>

                    <Link
                        href="/menu"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#6D54A5] px-6 py-3.5 font-semibold text-[#6D54A5] transition hover:bg-[#F7F6FA]"
                    >
                        <UtensilsCrossed size={18} />
                        Explore Our Menu
                    </Link>
                </div>

                <div className="mt-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-[#716D80] transition hover:text-[#6D54A5]"
                    >
                        <ArrowLeft size={16} />
                        Return to SavoryHouse
                    </Link>
                </div>
            </div>
        </main>
    );
}