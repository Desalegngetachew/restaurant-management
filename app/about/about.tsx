import Image from "next/image";
import Link from "next/link";
import { Heart, Leaf, Award, Users } from "lucide-react";

const values = [
    { icon: Heart, title: "Made with care", text: "Every dish is prepared with attention and a commitment to a great dining experience." },
    { icon: Leaf, title: "Quality ingredients", text: "We believe delicious meals start with thoughtful ingredient choices." },
    { icon: Award, title: "Quality first", text: "We work to make every visit and every order one to remember." },
    { icon: Users, title: "Community matters", text: "We want our restaurant to be a welcoming place for families and friends." },
];

export default function AboutPage() {
    return (
        <div>
            <section className="bg-stone-950 px-5 py-20 text-center text-white sm:py-28">
                <p className="font-bold uppercase tracking-[0.2em] text-orange-400">Our story</p>
                <h1 className="mt-4 text-4xl font-black sm:text-6xl">More than just a meal</h1>
                <p className="mx-auto mt-5 max-w-2xl leading-8 text-stone-300">
                    We believe good food brings people together. Our goal is to make
                    every meal feel welcoming, fresh, and memorable.
                </p>
            </section>

            <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8">
                <div className="relative h-80 overflow-hidden rounded-3xl sm:h-[450px]">
                    <Image
                        src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200"
                        alt="Restaurant dining space"
                        fill
                        unoptimized
                        className="object-cover"
                    />
                </div>
                <div>
                    <p className="font-bold uppercase tracking-widest text-orange-600">Welcome to SavoryHouse</p>
                    <h2 className="mt-3 text-3xl font-black sm:text-4xl">Food that brings people together</h2>
                    <p className="mt-5 leading-8 text-stone-600">
                        SavoryHouse is built around a simple idea: meals should taste
                        wonderful and the people enjoying them should feel at home.
                        From quick lunches to meals shared with family, we aim to make
                        ordering and dining easy and enjoyable.
                    </p>
                    <p className="mt-4 leading-8 text-stone-600">
                        Our team focuses on flavor, friendly service, and making it easy
                        for guests to find their next favorite dish.
                    </p>
                    <Link href="/menu" className="mt-7 inline-flex rounded-xl bg-orange-600 px-6 py-4 font-bold text-white hover:bg-orange-500">
                        Discover our menu
                    </Link>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
                <div className="text-center">
                    <p className="font-bold uppercase tracking-widest text-orange-600">What matters to us</p>
                    <h2 className="mt-3 text-3xl font-black">Our values</h2>
                </div>
                <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {values.map(({ icon: Icon, title, text }) => (
                        <article key={title} className="rounded-2xl border border-stone-200 bg-white p-6">
                            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                                <Icon size={23} />
                            </span>
                            <h3 className="mt-5 text-lg font-extrabold">{title}</h3>
                            <p className="mt-3 text-sm leading-7 text-stone-500">{text}</p>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}