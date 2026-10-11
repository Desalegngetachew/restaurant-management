"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
    const { items, ready, subtotal, updateQuantity, removeItem } = useCart();

    if (!ready) {
        return <div className="mx-auto max-w-5xl px-5 py-20">Loading your cart...</div>;
    }

    return (
        <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
            <p className="font-bold uppercase tracking-widest text-orange-600">Your selections</p>
            <h1 className="mt-2 text-4xl font-black">Shopping cart</h1>
            <p className="mt-3 text-stone-500">Review your dishes before checkout.</p>

            {items.length === 0 ? (
                <div className="mt-10 rounded-3xl border border-stone-200 bg-white px-6 py-16 text-center">
                    <ShoppingBag size={44} className="mx-auto text-orange-600" />
                    <h2 className="mt-5 text-2xl font-extrabold">Your cart is empty</h2>
                    <p className="mt-2 text-stone-500">Your next favorite meal is waiting.</p>
                    <Link href="/menu" className="mt-7 inline-flex rounded-xl bg-orange-600 px-6 py-3.5 font-bold text-white hover:bg-orange-500">
                        Browse menu
                    </Link>
                </div>
            ) : (
                <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_340px]">
                    <div className="space-y-4">
                        {items.map((item) => (
                            <article key={item.id} className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-4 sm:flex-row sm:items-center">
                                <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-stone-100 sm:w-32">
                                    <Image src={item.image} alt={item.name} fill unoptimized className="object-cover" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">{item.category}</p>
                                    <h2 className="mt-1 text-lg font-bold">{item.name}</h2>
                                    <p className="mt-1 text-sm text-stone-500">{item.price.toLocaleString()} ETB each</p>
                                    <p className="mt-2 font-extrabold">{(item.price * item.quantity).toLocaleString()} ETB</p>
                                </div>

                                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                                    <div className="flex items-center gap-3 rounded-full border border-stone-200 px-2 py-1.5">
                                        <button aria-label="Decrease quantity" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="rounded-full p-1 hover:bg-stone-100">
                                            <Minus size={16} />
                                        </button>
                                        <span className="min-w-5 text-center font-bold">{item.quantity}</span>
                                        <button aria-label="Increase quantity" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="rounded-full p-1 hover:bg-stone-100">
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <button onClick={() => removeItem(item.id)} className="flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700">
                                        <Trash2 size={15} /> Remove
                                    </button>
                                </div>
                            </article>
                        ))}
                        <Link href="/menu" className="inline-flex items-center gap-2 pt-3 font-semibold text-stone-600 hover:text-orange-600">
                            <ArrowLeft size={17} /> Continue shopping
                        </Link>
                    </div>

                    <aside className="h-fit rounded-3xl border border-stone-200 bg-white p-6">
                        <h2 className="text-xl font-extrabold">Order summary</h2>
                        <div className="mt-6 flex justify-between text-stone-600">
                            <span>Subtotal</span>
                            <span>{subtotal.toLocaleString()} ETB</span>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-stone-500">
                            Delivery fees, if applicable, will be confirmed when your order is placed.
                        </p>
                        <div className="my-5 border-t border-stone-200" />
                        <div className="flex justify-between text-lg font-extrabold">
                            <span>Total</span>
                            <span className="text-orange-600">{subtotal.toLocaleString()} ETB</span>
                        </div>
                        <Link href="/checkout" className="mt-6 block rounded-xl bg-orange-600 px-5 py-4 text-center font-bold text-white hover:bg-orange-500">
                            Proceed to checkout
                        </Link>
                    </aside>
                </div>
            )}
        </div>
    );
}