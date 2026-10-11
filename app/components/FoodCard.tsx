"use client";

import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import type { Food } from "@/lib/menu";
import { useCart } from "@/lib/cart-context";

export default function FoodCard({ food }: { food: Food }) {
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);

    return (
        <article className="group overflow-hidden rounded-3xl border border-stone-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
            <div className="relative h-56 overflow-hidden bg-stone-100">
                <Image
                    src={food.image}
                    alt={food.name}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-stone-700 shadow-sm">
                    {food.category}
                </span>
                {!food.available && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/50 font-bold text-white">
                        Currently unavailable
                    </span>
                )}
            </div>

            <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold">{food.name}</h3>
                    <span className="shrink-0 font-extrabold text-orange-600">
                        {food.price.toLocaleString()} ETB
                    </span>
                </div>

                <p className="mt-2 min-h-12 text-sm leading-6 text-stone-500">
                    {food.description}
                </p>

                <button
                    type="button"
                    disabled={!food.available}
                    onClick={() => {
                        addItem(food);
                        setAdded(true);
                        window.setTimeout(() => setAdded(false), 1200);
                    }}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-stone-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-stone-300"
                >
                    {added ? <Check size={17} /> : <Plus size={17} />}
                    {added ? "Added to cart" : "Add to cart"}
                </button>
            </div>
        </article>
    );
}