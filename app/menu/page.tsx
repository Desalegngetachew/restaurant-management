"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Utensils } from "lucide-react";
import FoodCard from "../components/FoodCard";
import { getFoods, sampleFoods, type Food } from "@/lib/menu";

export default function MenuPage() {
    const [foods, setFoods] = useState<Food[]>(sampleFoods);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getFoods()
            .then(setFoods)
            .finally(() => setLoading(false));
    }, []);

    const categories = useMemo(
        () => ["All", ...Array.from(new Set(foods.map((food) => food.category)))],
        [foods]
    );

    const filtered = foods.filter((food) => {
        const matchesCategory = category === "All" || food.category === category;
        const query = search.toLowerCase();
        const matchesSearch =
            food.name.toLowerCase().includes(query) ||
            food.description.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
            <div className="rounded-3xl bg-stone-950 px-7 py-10 text-white sm:px-12 sm:py-14">
                <p className="font-bold uppercase tracking-[0.2em] text-orange-400">
                    Our kitchen, your favorites
                </p>
                <h1 className="mt-3 text-4xl font-black sm:text-5xl">Explore our menu</h1>
                <p className="mt-4 max-w-xl leading-7 text-stone-300">
                    From comforting classics to fresh favorites, find something delicious
                    for every craving.
                </p>
            </div>

            <div className="mt-9 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="relative w-full md:max-w-sm">
                    <Search size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search dishes..."
                        className="w-full rounded-xl border border-stone-200 bg-white py-3.5 pl-11 pr-4 outline-none focus:border-orange-500"
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    {categories.map((item) => (
                        <button
                            key={item}
                            onClick={() => setCategory(item)}
                            className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${category === item
                                ? "bg-orange-600 text-white"
                                : "bg-white text-stone-600 ring-1 ring-stone-200 hover:bg-orange-50"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-9 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-xl font-extrabold">
                    <Utensils className="text-orange-600" size={21} />
                    Our dishes
                </h2>
                <span className="text-sm text-stone-500">{filtered.length} items</span>
            </div>

            {loading && (
                <p className="py-8 text-stone-500">Loading the menu...</p>
            )}

            {!loading && filtered.length === 0 && (
                <div className="mt-8 rounded-2xl border border-dashed border-stone-300 p-12 text-center">
                    <h3 className="text-lg font-bold">No dishes found</h3>
                    <p className="mt-2 text-stone-500">Try a different search or category.</p>
                </div>
            )}

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((food) => (
                    <FoodCard key={food.id} food={food} />
                ))}
            </div>
        </div>
    );
}