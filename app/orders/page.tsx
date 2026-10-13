"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, Clock, Package, ShoppingBag } from "lucide-react";

type SavedOrder = {
    id: string;
    customer: string;
    phone: string;
    address: string;
    orderType: string;
    paymentMethod: string;
    items: { id: string; name: string; price: number; quantity: number }[];
    total: number;
    status: string;
    createdAt: string;
};

export default function OrdersPage() {
    const [orders, setOrders] = useState<SavedOrder[]>([]);
    const [ready, setReady] = useState(false);
    const [justPlaced, setJustPlaced] = useState(false);

    useEffect(() => {
        try {
            setOrders(
                JSON.parse(localStorage.getItem("restaurant-customer-orders") || "[]")
            );
            setJustPlaced(new URLSearchParams(window.location.search).get("placed") === "1");
        } catch {
            setOrders([]);
        } finally {
            setReady(true);
        }
    }, []);

    if (!ready) {
        return <div className="mx-auto max-w-5xl px-5 py-20">Loading your orders...</div>;
    }

    return (
        <div className="mx-auto max-w-5xl px-5 py-14 lg:px-8">
            {justPlaced && (
                <div className="mb-7 flex gap-3 rounded-2xl border border-green-200 bg-green-50 p-5 text-green-800">
                    <CheckCircle2 className="shrink-0" />
                    <div>
                        <h2 className="font-extrabold">Order saved!</h2>
                        <p className="mt-1 text-sm">Your order is saved in this browser as a demo. It has not yet been sent to the restaurant.</p>
                    </div>
                </div>
            )}

            <p className="font-bold uppercase tracking-widest text-orange-600">Your activity</p>
            <h1 className="mt-2 text-4xl font-black">My orders</h1>
            <p className="mt-3 text-stone-500">View orders placed from this browser.</p>

            {orders.length === 0 ? (
                <div className="mt-9 rounded-3xl border border-stone-200 bg-white p-12 text-center">
                    <ShoppingBag size={42} className="mx-auto text-orange-600" />
                    <h2 className="mt-4 text-xl font-extrabold">No orders yet</h2>
                    <p className="mt-2 text-stone-500">Your future orders will appear here.</p>
                    <Link href="/menu" className="mt-6 inline-block rounded-xl bg-orange-600 px-6 py-3 font-bold text-white">
                        Explore menu
                    </Link>
                </div>
            ) : (
                <div className="mt-8 space-y-5">
                    {orders.map((order) => (
                        <article key={order.id} className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-7">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Order number</p>
                                    <h2 className="mt-1 text-xl font-extrabold">{order.id}</h2>
                                    <p className="mt-2 text-sm text-stone-500">
                                        {new Date(order.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <span className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-2 text-sm font-bold text-amber-700">
                                    <Clock size={15} /> {order.status}
                                </span>
                            </div>

                            <div className="my-5 border-t border-stone-100" />

                            <div className="space-y-2">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex justify-between gap-4 text-sm">
                                        <span className="text-stone-600">{item.name} × {item.quantity}</span>
                                        <span className="font-semibold">{(item.price * item.quantity).toLocaleString()} ETB</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                                <p className="flex items-center gap-2 text-sm text-stone-500">
                                    <Package size={17} /> {order.orderType} · {order.paymentMethod}
                                </p>
                                <p className="text-lg font-extrabold text-orange-600">{order.total.toLocaleString()} ETB</p>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}