import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, ChefHat, Leaf, Star } from "lucide-react";
import FoodCard from "./components/FoodCard";
import { getFoods } from "@/lib/menu";

export default async function HomePage() {
  const foods = await getFoods();
  const featured = foods.filter((food) => food.available).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-stone-950 text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1800"
            alt="Warm and welcoming restaurant interior"
            fill
            priority
            unoptimized
            className="object-cover opacity-35"
          />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:py-32 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
              <Star size={15} className="fill-orange-400 text-orange-400" />
              Delicious food, made with care
            </span>

            <h1 className="mt-7 max-w-2xl text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Great food.
              <br />
              <span className="text-orange-400">Great moments.</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-stone-200">
              Discover freshly prepared favorites, made with quality
              ingredients and served with a little extra love.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-4 font-bold text-white transition hover:bg-orange-500"
              >
                Explore our menu <ArrowRight size={19} />
              </Link>
              <Link
                href="/about"
                className="rounded-xl border border-white/30 px-6 py-4 font-bold hover:bg-white/10"
              >
                Our story
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-7 text-sm text-stone-200">
              <span className="flex items-center gap-2"><Clock size={17} /> Freshly prepared</span>
              <span className="flex items-center gap-2"><ChefHat size={17} /> Made by our chefs</span>
              <span className="flex items-center gap-2"><Leaf size={17} /> Quality ingredients</span>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative ml-auto h-[430px] w-full max-w-[490px] overflow-hidden rounded-[2rem] border-8 border-white/10 shadow-2xl">
              <Image
                src={featured[0]?.image || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900"}
                alt={featured[0]?.name || "Featured restaurant dish"}
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white p-5 text-stone-900 shadow-xl">
                <p className="text-sm text-stone-500">A guest favorite</p>
                <p className="mt-1 text-xl font-extrabold">
                  {featured[0]?.name || "Freshly made favorites"}
                </p>
                <p className="mt-2 font-bold text-orange-600">
                  {featured[0]
                    ? `${featured[0].price.toLocaleString()} ETB`
                    : "Made fresh for you"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="font-bold uppercase tracking-[0.2em] text-orange-600">
              Made for your cravings
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Popular right now
            </h2>
            <p className="mt-3 text-stone-500">
              Explore a few of the dishes our guests love.
            </p>
          </div>
          <Link href="/menu" className="flex items-center gap-2 font-bold text-orange-600 hover:text-orange-700">
            View full menu <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="grid gap-8 rounded-[2rem] bg-orange-50 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-bold uppercase tracking-widest text-orange-600">
              Your table is waiting
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Something delicious is just a few clicks away.
            </h2>
            <p className="mt-4 leading-7 text-stone-600">
              Find your next favorite meal. Browse our menu, build your cart,
              and get your order ready.
            </p>
            <Link href="/menu" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-stone-950 px-6 py-4 font-bold text-white hover:bg-orange-600">
              Order your favorites <ArrowRight size={18} />
            </Link>
          </div>
          <div className="relative h-64 overflow-hidden rounded-3xl sm:h-80">
            <Image
              src="https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=1200"
              alt="Freshly prepared food served at a table"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}