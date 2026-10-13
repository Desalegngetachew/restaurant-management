"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
    LayoutDashboard,
    ClipboardList,
    UtensilsCrossed,
    Tags,
    Package,
    Users,
    UserCog,
    BarChart3,
    Settings,
    LogOut,
    Menu,
    X,
    Store,
    ExternalLink,
} from "lucide-react";

const navigation = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Orders", href: "/admin/orders", icon: ClipboardList },
    { label: "Menu", href: "/admin/menu", icon: UtensilsCrossed },
    { label: "Categories", href: "/admin/categories", icon: Tags },
    { label: "Inventory", href: "/admin/inventory", icon: Package },
    { label: "Customers", href: "/admin/customers", icon: Users },
    { label: "Staff", href: "/admin/staff", icon: UserCog },
    { label: "Reports", href: "/admin/reports", icon: BarChart3 },
    { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    function signOut() {
        // Demo-only sign out. Replace with server-side session termination.
        router.push("/admin/login");
    }

    return (<div className="min-h-screen bg-[#F7F6FA] text-slate-800">
        {sidebarOpen && (
            <button
                aria-label="Close navigation"
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
            />
        )}

        ```
        <aside
            className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white shadow-sm transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            <div className="flex h-20 items-center justify-between border-b border-slate-100 px-5">
                <Link href="/admin" className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0EB8BA] text-white">
                        <Store size={23} />
                    </span>
                    <span>
                        <span className="block text-lg font-extrabold tracking-tight">
                            Wenbeya
                        </span>
                        <span className="text-xs font-medium text-slate-400">
                            Restaurant Admin
                        </span>
                    </span>
                </Link>
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
                    aria-label="Close sidebar"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="px-4 pb-2 pt-6">
                <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    Management
                </p>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-5">
                {navigation.map(({ label, href, icon: Icon }) => {
                    const active =
                        href === "/admin"
                            ? pathname === href
                            : pathname === href || pathname.startsWith(`${href}/`);

                    return (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${active
                                ? "bg-[#E7FAFA] text-[#087F81]"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <Icon size={19} />
                            <span>{label}</span>
                            {active && (
                                <span className="ml-auto h-2 w-2 rounded-full bg-[#0EB8BA]" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t border-slate-100 p-4">
                <Link
                    href="/"
                    className="mb-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50"
                >
                    <ExternalLink size={18} />
                    View customer website
                </Link>
                <button
                    onClick={signOut}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50"
                >
                    <LogOut size={18} />
                    Sign out
                </button>
            </div>
        </aside>

        <div className="min-h-screen lg:pl-64">
            <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur sm:px-8">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open navigation"
                        className="rounded-xl border border-slate-200 p-2 lg:hidden"
                    >
                        <Menu size={20} />
                    </button>
                    <div>
                        <p className="text-sm font-bold text-slate-800">
                            Wenbeya Restaurant
                        </p>
                        <p className="text-xs text-slate-400">
                            Good Food. Better Together.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden text-right sm:block">
                        <p className="text-sm font-bold">Restaurant Admin</p>
                        <p className="text-xs text-slate-400">Administrator</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6D54A5] font-bold text-white">
                        WA
                    </div>
                </div>
            </header>

            <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-8">
                {children}
            </main>
        </div>
    </div>


    );
}
