"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu as MenuIcon, X, Utensils } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

const links = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Our Menu" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/orders", label: "My Orders" },
];

export default function Navbar() {
    const pathname = usePathname();
    const { count } = useCart();
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
                <Link href="/" className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-600 text-white">
                        <Utensils size={23} />
                    </span>
                    <span>
                        <span className="block text-lg font-extrabold tracking-tight">
                            ጣፋጭ<span className="text-orange-600">House</span>
                        </span>
                        <span className="block text-xs text-stone-500">
                            Good food, good moments
                        </span>
                    </span>
                </Link>

                <nav className="hidden items-center gap-7 md:flex">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition ${pathname === link.href
                                ? "text-orange-600"
                                : "text-stone-600 hover:text-orange-600"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <Link
                        href="/cart"
                        aria-label={`Shopping cart with ${count} items`}
                        className="relative flex h-11 w-11 items-center justify-center rounded-full bg-stone-100 hover:bg-orange-50"
                    >
                        <ShoppingBag size={20} />
                        {count > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-600 px-1 text-xs font-bold text-white">
                                {count}
                            </span>
                        )}
                    </Link>

                    <button
                        type="button"
                        className="rounded-lg p-2 md:hidden"
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle navigation"
                    >
                        {open ? <X /> : <MenuIcon />}
                    </button>
                </div>
            </div>

            {open && (
                <nav className="border-t border-stone-100 bg-white px-5 py-3 md:hidden">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-3 py-3 text-sm font-medium hover:bg-orange-50"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/cart"
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-3 font-semibold text-orange-600"
                    >
                        Shopping Cart ({count})
                    </Link>
                </nav>
            )}
        </header>
    );
}