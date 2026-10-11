"use client";

import { useState } from "react";

type Order = {
  id: string;
  table: string;
  customer: string;
  items: number;
  total: number;
  status: "Pending" | "Preparing" | "Ready" | "Completed";
};

const orders: Order[] = [
  {
    id: "#ORD-001",
    table: "Table 04",
    customer: "Abebe Kebede",
    items: 4,
    total: 1250,
    status: "Preparing",
  },
  {
    id: "#ORD-002",
    table: "Table 07",
    customer: "Sara Ahmed",
    items: 2,
    total: 850,
    status: "Pending",
  },
  {
    id: "#ORD-003",
    table: "Takeaway",
    customer: "John Smith",
    items: 3,
    total: 1450,
    status: "Ready",
  },
  {
    id: "#ORD-004",
    table: "Table 02",
    customer: "Mekdes Tesfaye",
    items: 5,
    total: 2200,
    status: "Completed",
  },
];

const tables = [
  { number: 1, seats: 4, status: "Available" },
  { number: 2, seats: 4, status: "Occupied" },
  { number: 3, seats: 2, status: "Available" },
  { number: 4, seats: 6, status: "Occupied" },
  { number: 5, seats: 4, status: "Reserved" },
  { number: 6, seats: 8, status: "Available" },
  { number: 7, seats: 2, status: "Occupied" },
  { number: 8, seats: 4, status: "Available" },
];

const menuItems = [
  { name: "Chicken Burger", category: "Main Course", price: 450 },
  { name: "Beef Pizza", category: "Pizza", price: 650 },
  { name: "Pasta Alfredo", category: "Pasta", price: 520 },
  { name: "Caesar Salad", category: "Salad", price: 350 },
];

function formatCurrency(value: number) {
  return `ETB ${value.toLocaleString()}`;
}

export default function Dashboard() {
  const [activePage, setActivePage] = useState("Dashboard");

  const navigation = [
    { name: "Dashboard", icon: "▦" },
    { name: "Orders", icon: "🧾" },
    { name: "Tables", icon: "🪑" },
    { name: "Menu", icon: "🍽️" },
    { name: "Inventory", icon: "📦" },
    { name: "Customers", icon: "👥" },
    { name: "Staff", icon: "👨‍💼" },
    { name: "Reports", icon: "📊" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="hidden w-64 bg-white shadow-sm lg:block">
        <div className="flex h-20 items-center border-b px-6">
          <div>
            <h1 className="text-xl font-bold text-orange-600">
              RestaurantOS
            </h1>
            <p className="text-xs text-gray-400">Management System</p>
          </div>
        </div>

        <nav className="space-y-1 p-4">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => setActivePage(item.name)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition ${activePage === item.name
                ? "bg-orange-50 text-orange-600"
                : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              <span>{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-64 border-t p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
              AD
            </div>
            <div>
              <p className="text-sm font-semibold">Admin User</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1">
        {/* Header */}
        <header className="flex h-20 items-center justify-between border-b bg-white px-4 md:px-8">
          <div>
            <h2 className="text-xl font-bold">{activePage}</h2>
            <p className="text-sm text-gray-500">
              Welcome back, Admin
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="rounded-lg border bg-white px-3 py-2">
              🔔
            </button>

            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">Thursday, Oct 8</p>
              <p className="text-xs text-gray-400">Restaurant Branch #1</p>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8">
          {activePage === "Dashboard" ? (
            <DashboardContent />
          ) : (
            <PlaceholderPage page={activePage} />
          )}
        </div>
      </main>
    </div>
  );
}

function DashboardContent() {
  return (
    <>
      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Today's Sales"
          value="ETB 48,750"
          change="+12.5%"
          icon="💰"
        />

        <StatCard
          title="Total Orders"
          value="126"
          change="+8.2%"
          icon="🧾"
        />

        <StatCard
          title="Customers"
          value="94"
          change="+5.4%"
          icon="👥"
        />

        <StatCard
          title="Average Order"
          value="ETB 387"
          change="+3.1%"
          icon="📈"
        />
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-bold">Sales Overview</h3>
              <p className="text-sm text-gray-400">
                Revenue for the last 7 days
              </p>
            </div>

            <select className="rounded-lg border px-3 py-2 text-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This year</option>
            </select>
          </div>

          <SalesChart />
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h3 className="font-bold">Popular Items</h3>
          <p className="mb-6 text-sm text-gray-400">
            Best selling menu items
          </p>

          <div className="space-y-5">
            {[
              ["Chicken Burger", "86 orders", "🍔"],
              ["Beef Pizza", "72 orders", "🍕"],
              ["Pasta Alfredo", "64 orders", "🍝"],
              ["Caesar Salad", "51 orders", "🥗"],
            ].map(([name, count, icon], index) => (
              <div
                key={name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    {icon}
                  </div>

                  <div>
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-gray-400">{count}</p>
                  </div>
                </div>

                <span className="text-sm font-bold">
                  #{index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orders + Tables */}
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="overflow-hidden rounded-xl bg-white shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between border-b p-6">
            <div>
              <h3 className="font-bold">Recent Orders</h3>
              <p className="text-sm text-gray-400">
                Latest restaurant orders
              </p>
            </div>

            <button className="text-sm font-medium text-orange-600">
              View all
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-4">Order</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Items</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium">
                      {order.id}
                      <div className="text-xs text-gray-400">
                        {order.table}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {order.customer}
                    </td>

                    <td className="px-6 py-4">
                      {order.items}
                    </td>

                    <td className="px-6 py-4 font-medium">
                      {formatCurrency(order.total)}
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tables */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-bold">Restaurant Tables</h3>
              <p className="text-sm text-gray-400">
                Current table status
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {tables.map((table) => (
              <div
                key={table.number}
                className={`rounded-xl border p-4 ${table.status === "Available"
                  ? "border-green-200 bg-green-50"
                  : table.status === "Occupied"
                    ? "border-red-200 bg-red-50"
                    : "border-yellow-200 bg-yellow-50"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">
                    Table {table.number}
                  </span>

                  <span className="text-lg">🪑</span>
                </div>

                <p className="mt-1 text-xs text-gray-500">
                  {table.seats} seats
                </p>

                <p className="mt-3 text-xs font-semibold">
                  {table.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="font-bold">Menu Items</h3>
            <p className="text-sm text-gray-400">
              Current restaurant menu
            </p>
          </div>

          <button className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700">
            + Add Item
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="rounded-xl border p-4 hover:shadow-sm"
            >
              <div className="mb-3 flex h-24 items-center justify-center rounded-lg bg-orange-50 text-4xl">
                🍽️
              </div>

              <p className="font-semibold">{item.name}</p>

              <p className="mt-1 text-xs text-gray-400">
                {item.category}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="font-bold text-orange-600">
                  {formatCurrency(item.price)}
                </span>

                <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                  Available
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function StatCard({
  title,
  value,
  change,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  icon: string;
}) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold">{value}</h3>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-xl">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-xs font-medium text-green-600">
        ↑ {change} from last week
      </p>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: Order["status"];
}) {
  const styles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Preparing: "bg-blue-100 text-blue-700",
    Ready: "bg-green-100 text-green-700",
    Completed: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function SalesChart() {
  const data = [
    { day: "Fri", value: 32000 },
    { day: "Sat", value: 42000 },
    { day: "Sun", value: 38000 },
    { day: "Mon", value: 29000 },
    { day: "Tue", value: 45000 },
    { day: "Wed", value: 41000 },
    { day: "Thu", value: 48750 },
  ];

  const max = Math.max(...data.map((item) => item.value));

  return (
    <div className="flex h-64 items-end gap-3 border-b border-l px-4 pb-2 pt-6">
      {data.map((item) => (
        <div
          key={item.day}
          className="flex flex-1 flex-col items-center justify-end gap-2"
        >
          <span className="text-[10px] text-gray-400">
            {Math.round(item.value / 1000)}k
          </span>

          <div
            className="w-full max-w-12 rounded-t-md bg-orange-500 transition hover:bg-orange-600"
            style={{
              height: `${(item.value / max) * 180}px`,
            }}
          />

          <span className="text-xs text-gray-500">
            {item.day}
          </span>
        </div>
      ))}
    </div>
  );
}

function PlaceholderPage({ page }: { page: string }) {
  return (
    <div className="flex min-h-[500px] items-center justify-center rounded-xl bg-white shadow-sm">
      <div className="text-center">
        <div className="mb-4 text-5xl">🚧</div>
        <h2 className="text-2xl font-bold">{page}</h2>
        <p className="mt-2 text-gray-500">
          This module is ready to be connected to the database.
        </p>
      </div>
    </div>
  );
}