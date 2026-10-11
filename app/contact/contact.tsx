"use client";

import { useState, type FormEvent } from "react";
import { MapPin, Phone, Clock, Mail, Send } from "lucide-react";

export default function ContactPage() {
    const [sent, setSent] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // Demo only: no message is sent to the restaurant yet.
        setSent(true);
        event.currentTarget.reset();
    }

    return (
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
            <div className="max-w-2xl">
                <p className="font-bold uppercase tracking-widest text-orange-600">Get in touch</p>
                <h1 className="mt-3 text-4xl font-black sm:text-5xl">We would love to hear from you.</h1>
                <p className="mt-4 leading-7 text-stone-500">
                    Have a question about the menu, an order, or visiting us? Contact our team.
                </p>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="space-y-4">
                    {[
                        { icon: MapPin, title: "Visit us", text: "Addis Ababa, Ethiopia" },
                        { icon: Phone, title: "Call us", text: "+251 900 000 000" },
                        { icon: Mail, title: "Email us", text: "hello@example.com" },
                        { icon: Clock, title: "Opening hours", text: "Daily, 9 AM – 10 PM" },
                    ].map(({ icon: Icon, title, text }) => (
                        <div key={title} className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-5">
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                                <Icon size={22} />
                            </span>
                            <div>
                                <h2 className="font-extrabold">{title}</h2>
                                <p className="mt-1 text-sm text-stone-500">{text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8">
                    <h2 className="text-2xl font-extrabold">Send us a message</h2>
                    <p className="mt-2 text-sm text-stone-500">Fill out the form below and our team can follow up.</p>

                    <div className="mt-6 space-y-5">
                        <label className="block text-sm font-semibold">
                            Your name
                            <input required name="name" className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-3 outline-none focus:border-orange-500" placeholder="Full name" />
                        </label>
                        <label className="block text-sm font-semibold">
                            Email address
                            <input required name="email" type="email" className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-3 outline-none focus:border-orange-500" placeholder="you@example.com" />
                        </label>
                        <label className="block text-sm font-semibold">
                            Subject
                            <input required name="subject" className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-3 outline-none focus:border-orange-500" placeholder="How can we help?" />
                        </label>
                        <label className="block text-sm font-semibold">
                            Message
                            <textarea required name="message" rows={5} className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-3 outline-none focus:border-orange-500" placeholder="Write your message..." />
                        </label>
                    </div>

                    {sent && (
                        <p role="status" className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-700">
                            Form validated. Message sending isn't connected yet.
                        </p>
                    )}

                    <button type="submit" className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-4 font-bold text-white hover:bg-orange-500">
                        Submit message <Send size={17} />
                    </button>
                </form>
            </div>
        </div>
    );
}