"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useCart } from "@/lib/cart-context";

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

export default function CheckoutPage() {
    const router = useRouter();
    const { items, subtotal, ready, clearCart } = useCart();

    const [customer, setCustomer] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [orderType, setOrderType] = useState("Delivery");
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    function placeOrder(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        if (!items.length) {
            setError("Your cart is empty. Add dishes before checking out.");
            return;
        }

        if (orderType === "Delivery" && !address.trim()) {
            setError("Please enter your delivery address.");
            return;
        }

        setSubmitting(true);

        try {
            const order: SavedOrder = {
                id: `ORD-${Date.now().toString().slice(-8)}`,
                customer: customer.trim(),
                phone: phone.trim(),
                address: orderType === "Delivery" ? address.trim() : "Restaurant pickup",
                orderType,
                paymentMethod,
                items: items.map(({ id, name, price, quantity }) => ({
                    id, name, price, quantity,
                })),
                total: subtotal,
                status: "Pending",
                createdAt: new Date().toISOString(),
            };

            const existing = JSON.parse(
                localStorage.getItem("restaurant-customer-orders") || "[]"
            ) as SavedOrder[];

            localStorage.setItem(
                "restaurant-customer-orders",
                JSON.stringify([order, ...existing])
            );
            localStorage.setItem("restaurant-last-order", JSON.stringify(order));

            clearCart();
            router.push("/orders?placed=1");
        } catch {
            setError("We couldn't save your order. Please try again.");
            setSubmitting(false);
        }
    }

    if (!ready) {
        return <div className="mx-auto max-w-5xl px-5 py-20">Loading checkout...</div>;
    }

    if (items.length === 0) {
        return (
            <div className="mx-auto max-w-3xl px-5 py-20 text-center">
                <h1 className="text-3xl font-black">Your cart is empty</h1>
                <p className="mt-3 text-stone-500">Add some delicious dishes before checkout.</p>
                <Link href="/menu" className="mt-6 inline-block rounded-xl bg-orange-600 px-6 py-3 font-bold text-white">
                    Browse menu
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
            <p className="font-bold uppercase tracking-widest text-orange-600">Almost there</p>
            <h1 className="mt-2 text-4xl font-black">Checkout</h1>

            <form onSubmit={placeOrder} className="mt-9 grid gap-8 lg:grid-cols-[1fr_360px]">
                <section className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8">
                    <h2 className="text-xl font-extrabold">Customer information</h2>
                    <div className="mt-6 space-y-5">
                        <label className="block text-sm font-semibold">
                            Full name
                            <input required value={customer} onChange={(e) => setCustomer(e.target.value)} className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-3 outline-none focus:border-orange-500" placeholder="Your full name" />
                        </label>
                        <label className="block text-sm font-semibold">
                            Phone number
                            <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-3 outline-none focus:border-orange-500" placeholder="+251 ..." />
                        </label>

                        <div>
                            <p className="text-sm font-semibold">How would you like your order?</p>
                            <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                {["Delivery", "Pickup"].map((type) => (
                                    <button key={type} type="button" onClick={() => setOrderType(type)} className={`rounded-xl border p-4 text-left font-semibold ${orderType === type ? "border-orange-600 bg-orange-50 text-orange-700" : "border-stone-200"}`}>
                                        {type}
                                        <span className="mt-1 block text-xs font-normal text-stone-500">
                                            {type === "Delivery" ? "Have your meal delivered" : "Collect from the restaurant"}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {orderType === "Delivery" && (
                            <label className="block text-sm font-semibold">
                                Delivery address
                                <textarea required value={address} onChange={(e) => setAddress(e.target.value)} rows={3} className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-3 outline-none focus:border-orange-500" placeholder="Street, area, building, and any directions" />
                            </label>
                        )}

                        <label className="block text-sm font-semibold">
                            Payment method
                            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-orange-500">
                                <option value="Cash">Cash on delivery / pickup</option>
                                <option value="Bank Transfer">Bank transfer (arrange with restaurant)</option>
                            </select>
                        </label>
                    </div>
                </section>

                <aside className="h-fit rounded-3xl border border-stone-200 bg-white p-6">
                    <h2 className="text-xl font-extrabold">Your order</h2>
                    <div className="mt-5 space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="flex justify-between gap-3 text-sm">
                                <span className="text-stone-600">{item.name} × {item.quantity}</span>
                                <span className="shrink-0 font-semibold">{(item.price * item.quantity).toLocaleString()} ETB</span>
                            </div>
                        ))}
                    </div>
                    <div className="my-5 border-t border-stone-200" />
                    <div className="flex justify-between text-lg font-extrabold">
                        <span>Subtotal</span>
                        <span className="text-orange-600">{subtotal.toLocaleString()} ETB</span>
                    </div>
                    <p className="mt-3 text-xs leading-5 text-stone-500">
                        The restaurant will confirm any delivery fee. Online payment is not enabled in this version.
                    </p>

                    {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}

                    <button disabled={submitting} type="submit" className="mt-6 w-full rounded-xl bg-orange-600 px-5 py-4 font-bold text-white hover:bg-orange-500 disabled:opacity-50">
                        {submitting ? "Placing order..." : "Place order"}
                    </button>
                    <Link href="/cart" className="mt-4 block text-center text-sm font-semibold text-stone-500 hover:text-orange-600">
                        Return to cart
                    </Link>
                </aside>
            </form>
        </div>
    );
}