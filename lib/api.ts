
const API_URL =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export async function api<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        cache: "no-store",
    });

    if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? `Request failed: ${response.status}`);
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json() as Promise<T>;
}

export type MenuItem = {
    id: string;
    name: string;
    description?: string | null;
    price: string | number;
    available: boolean;
    category: {
        id: string;
        name: string;
    };
};

export function getMenu() {
    return api<MenuItem[]>("/menu");
}

export function createMenuItem(data: {
    name: string;
    description?: string;
    price: number;
    categoryId: string;
}) {
    return api<MenuItem>("/menu", {
        method: "POST",
        body: JSON.stringify(data),
    });
}