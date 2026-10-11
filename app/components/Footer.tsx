import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";

export default function Footer() {
    return (
        <footer className="mt-20 bg-stone-950 text-stone-300">
            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
                <div>
                    <h2 className="text-xl font-extrabold text-white">
                        Savory<span className="text-orange-500">House</span>
                    </h2>
                    <p className="mt-4 max-w-xs text-sm leading-7 text-stone-400">
                        Fresh ingredients, delicious food, and memorable moments. We look
                        forward to serving you.
                    </p>
                </div>

                <div>
                    <h3 className="font-bold text-white">Quick links</h3>
                    <div className="mt-4 flex flex-col gap-3 text-sm">
                        <Link href="/menu" className="hover:text-orange-400">Our Menu</Link>
                        <Link href="/about" className="hover:text-orange-400">About Us</Link>
                        <Link href="/contact" className="hover:text-orange-400">Contact</Link>
                        <Link href="/orders" className="hover:text-orange-400">My Orders</Link>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-white">Contact us</h3>
                    <div className="mt-4 space-y-4 text-sm text-stone-400">
                        <p className="flex gap-3"><MapPin size={18} /> Addis Ababa, Ethiopia</p>
                        <p className="flex gap-3"><Phone size={18} /> +251 900 000 000</p>
                        <p className="flex gap-3"><Clock size={18} /> Daily, 9 AM – 10 PM</p>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-white">Opening hours</h3>
                    <p className="mt-4 text-sm leading-7 text-stone-400">
                        Monday – Friday: 9 AM – 10 PM<br />
                        Saturday – Sunday: 10 AM – 11 PM
                    </p>
                </div>
            </div>

            <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-stone-500">
                &copy;  {new Date().getFullYear()} Wenbeya Restaurant. All rights reserved.
            </div>
        </footer>
    );
}