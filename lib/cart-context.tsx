"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import type { Food } from "./menu";

export type CartItem = Food & { quantity: number };

type CartContextType = {
    items: CartItem[];
    ready: boolean;
    count: number;
    subtotal: number;
    addItem: (food: Food) => void;
    updateQuantity: (id: string, quantity: number) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);
const STORAGE_KEY = "restaurant-customer-cart";

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) setItems(JSON.parse(saved) as CartItem[]);
        } catch {
            localStorage.removeItem(STORAGE_KEY);
        } finally {
            setReady(true);
        }
    }, []);

    useEffect(() => {
        if (ready) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        }
    }, [items, ready]);

    const addItem = useCallback((food: Food) => {
        if (!food.available) return;

        setItems((current) => {
            const existing = current.find((item) => item.id === food.id);

            if (existing) {
                return current.map((item) =>
                    item.id === food.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...current, { ...food, quantity: 1 }];
        });
    }, []);

    const updateQuantity = useCallback((id: string, quantity: number) => {
        if (quantity <= 0) {
            setItems((current) => current.filter((item) => item.id !== id));
            return;
        }

        setItems((current) =>
            current.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    }, []);

    const removeItem = useCallback((id: string) => {
        setItems((current) => current.filter((item) => item.id !== id));
    }, []);

    const clearCart = useCallback(() => setItems([]), []);

    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                items,
                ready,
                count,
                subtotal,
                addItem,
                updateQuantity,
                removeItem,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }

    return context;
}