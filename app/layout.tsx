import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import { CartProvider } from "@/lib/cart-context";


export const metadata: Metadata = {
  title: "Wenbeya Restaurant | Good Food, Better Together",
  description:
    "Discover delicious meals at Wenbeya Restaurant. Explore our menu, order your favorite food, and enjoy every bite.",
  icons: {
    icon: "/wenbeya-logo.png",
    shortcut: "/wenbeya-logo.png",
    apple: "/wenbeya-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FCFBF8] text-stone-900 antialiased">
        <CartProvider>
          <Navbar />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}