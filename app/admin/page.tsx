"use client";

import Link from "next/link";
import {
    ArrowDownRight,
    ArrowRight,
    ArrowUpRight,
    Banknote,
    Clock3,
    ShoppingBag,
    Users,
} from "lucide-react";

const stats = [
    {
        label: "Today's Revenue",
        value: "ETB 24,850",
        change: "+12.8%",
        positive: true,
        icon: Banknote,
        iconClass: "bg-teal-50 text-[#0CA5A7]",
    },
    {
        label: "Total Orders",
        value: "148",
        change: "+8.2%",
        positive: true,
        icon: ShoppingBag,
        iconClass: "bg-violet-50 text-[#6D54A5]",
    },
    {
        label: "Customers",
        value: "1,284",
        change: "+5.4%",
        positive: true,
        icon: Users,
        iconClass: "bg-amber-50 text-amber-600",
    },
    {
        label: "Pending Orders",
        value: "12",
        change: "Needs attention",
        positive: false,
        icon: Clock3,
        iconClass: "bg-rose-50 text-rose-600",
    },
];

const weeklySales = [
    { day: "Mon", amount: 48 },
    { day: "Tue", amount: 66 },
    { day: "Wed", amount: 55 },
    { day: "Thu", amount: 82 },
    { day: "Fri", amount: 68 },
    { day: "Sat", amount: 100 },
    { day: "Sun", amount: 76 },
];

const popularItems = [
    { name: "Traditional Injera Combo", category: "Ethiopian", sold: 86, price: "ETB 450", color: "bg-amber-100" },
    { name: "Doro Wat", category: "Main course", sold: 64, price: "ETB 520", color: "bg-rose-100" },
    { name: "Special Tibs", category: "Main course", sold: 51, price: "ETB 580", color: "bg-orange-100" },
    { name: "Fresh Mango Juice", category: "Drinks", sold: 43, price: "ETB 140", color: "bg-yellow-100" },
];

const recentOrders = [
    { id: "WB-1048", customer: "Abebe T.", items: "2 items", amount: "ETB 970", status: "Preparing" },
    { id: "WB-1047", customer: "Sara M.", items: "3 items", amount: "ETB 1,240", status: "Pending" },
    { id: "WB-1046", customer: "Dawit K.", items: "1 item", amount: "ETB 450", status: "Completed" },
    { id: "WB-1045", customer: "Hana A.", items: "4 items", amount: "ETB 1,650", status: "Completed" },
];

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        Pending: "bg-amber-50 text-amber-700",
        Preparing: "bg-violet-50 text-violet-700",
        Completed: "bg-teal-50 text-teal-700",
    };

    return (
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status] ?? "bg-slate-100 text-slate-600"}`}>
            {status} </span>
    );
}

export default function AdminDashboard() {
    return (<div className="space-y-8"> <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"> <div> <p className="text-sm font-medium text-[#0CA5A7]">
        Monday, October 12, 2026 </p> <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Dashboard overview </h1> <p className="mt-2 text-sm text-slate-500">
            Here’s what’s happening at your restaurant today. </p> </div> <Link
                href="/admin/orders"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0EB8BA] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0CA5A7]"
            >
            Manage orders <ArrowRight size={17} /> </Link> </div>

        ```
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon;
                const ChangeIcon = stat.positive ? ArrowUpRight : ArrowDownRight;

                return (
                    <article key={stat.label} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                <p className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
                                    {stat.value}
                                </p>
                            </div>
                            <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconClass}`}>
                                <Icon size={21} />
                            </span>
                        </div>
                        <div className="mt-5 flex items-center gap-1.5 text-xs">
                            {stat.positive && <ChangeIcon size={15} className="text-emerald-600" />}
                            <span className={stat.positive ? "font-bold text-emerald-600" : "font-semibold text-rose-600"}>
                                {stat.change}
                            </span>
                            {stat.positive && <span className="text-slate-400">vs. previous period</span>}
                        </div>
                    </article>
                );
            })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
            <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h2 className="font-bold text-slate-900">Weekly sales</h2>
                        <p className="mt-1 text-sm text-slate-500">Illustrative sales · current week</p>
                    </div>
                    <span className="rounded-lg bg-teal-50 px-3 py-2 text-xs font-bold text-teal-700">
                        This week
                    </span>
                </div>

                <div className="mt-8 flex h-56 items-end justify-between gap-3 sm:gap-5">
                    {weeklySales.map((item) => (
                        <div key={item.day} className="flex h-full flex-1 flex-col items-center justify-end gap-3">
                            <div className="flex h-full w-full items-end">
                                <div
                                    title={`${item.amount}% of weekly peak`}
                                    className={`w-full rounded-t-lg transition hover:opacity-80 ${item.day === "Sat" ? "bg-[#6D54A5]" : "bg-[#0EB8BA]"}`}
                                    style={{ height: `${item.amount}%` }}
                                />
                            </div>
                            <span className="text-xs font-medium text-slate-400">{item.day}</span>
                        </div>
                    ))}
                </div>
            </article>

            <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="font-bold text-slate-900">Popular menu items</h2>
                        <p className="mt-1 text-sm text-slate-500">Top-selling dishes</p>
                    </div>
                    <Link href="/admin/menu" className="text-sm font-bold text-[#0CA5A7] hover:underline">
                        View menu
                    </Link>
                </div>

                <div className="mt-5 divide-y divide-slate-100">
                    {popularItems.map((item, index) => (
                        <div key={item.name} className="flex items-center gap-3 py-4">
                            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold text-slate-700 ${item.color}`}>
                                {index + 1}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-bold text-slate-800">{item.name}</p>
                                <p className="mt-1 text-xs text-slate-400">{item.category} · {item.sold} sold</p>
                            </div>
                            <p className="whitespace-nowrap text-sm font-bold text-slate-700">{item.price}</p>
                        </div>
                    ))}
                </div>
            </article>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="flex items-center justify-between gap-3 p-5 sm:px-6">
                <div>
                    <h2 className="font-bold text-slate-900">Recent orders</h2>
                    <p className="mt-1 text-sm text-slate-500">Latest customer orders</p>
                </div>
                <Link href="/admin/orders" className="inline-flex items-center gap-1 text-sm font-bold text-[#0CA5A7] hover:underline">
                    All orders <ArrowRight size={15} />
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Order ID</th>
                            <th className="px-6 py-4 font-semibold">Customer</th>
                            <th className="px-6 py-4 font-semibold">Items</th>
                            <th className="px-6 py-4 font-semibold">Total</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {recentOrders.map((order) => (
                            <tr key={order.id} className="transition hover:bg-slate-50/70">
                                <td className="px-6 py-4 font-bold text-[#6D54A5]">{order.id}</td>
                                <td className="px-6 py-4 font-medium text-slate-700">{order.customer}</td>
                                <td className="px-6 py-4 text-slate-500">{order.items}</td>
                                <td className="px-6 py-4 font-semibold text-slate-700">{order.amount}</td>
                                <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>

        <p className="text-xs text-slate-400">
            Demo dashboard: figures and orders are sample data, not live restaurant records.
        </p>
    </div>

    );
}
