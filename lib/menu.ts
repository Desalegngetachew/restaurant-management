export type Food = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    available: boolean;
};

export const sampleFoods: Food[] = [
    {
        id: "food-1",
        name: "Classic Beef Burger",
        description: "Juicy beef, fresh lettuce, tomato and house sauce.",
        price: 450,
        category: "Burgers",
        image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900",
        available: true,
    },
    {
        id: "food-2",
        name: "Margherita Pizza",
        description: "Tomato, mozzarella, basil and our signature crust.",
        price: 650,
        category: "Pizza",
        image:
            "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=900",
        available: true,
    },
    {
        id: "food-3",
        name: "Creamy Alfredo Pasta",
        description: "Creamy parmesan sauce with herbs and tender pasta.",
        price: 520,
        category: "Pasta",
        image:
            "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=900",
        available: true,
    },
    {
        id: "food-4",
        name: "Grilled Chicken",
        description: "Seasoned grilled chicken served with fresh vegetables.",
        price: 700,
        category: "Main Course",
        image:
            "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=900",
        available: true,
    },
    {
        id: "food-5",
        name: "Fresh Garden Salad",
        description: "Crisp greens, cucumber, tomatoes and house dressing.",
        price: 320,
        category: "Salads",
        image:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900",
        available: true,
    },
    {
        id: "food-6",
        name: "Chocolate Dessert",
        description: "Rich chocolate dessert for a sweet finish.",
        price: 280,
        category: "Desserts",
        image:
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900",
        available: true,
    },
    {
        id: "food-7",
        name: "Fresh Fruit Juice",
        description: "Refreshing seasonal fruit juice, served chilled.",
        price: 150,
        category: "Drinks",
        image:
            "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=900",
        available: true,
    },
    {
        id: "food-8",
        name: "Crispy Chicken Burger",
        description: "Crispy chicken, lettuce and a creamy house dressing.",
        price: 420,
        category: "Burgers",
        image:
            "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=900",
        available: true,
    },
];

type ApiFood = {
    id: string | number;
    name: string;
    description?: string | null;
    price: string | number;
    available?: boolean;
    category?: string | { name: string } | null;
    image?: string | null;
    imageUrl?: string | null;
};

export async function getFoods(): Promise<Food[]> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) return sampleFoods;

    try {
        const response = await fetch(`${apiUrl}/menu`, {
            cache: "no-store",
        });

        if (!response.ok) return sampleFoods;

        const result: unknown = await response.json();

        const data = Array.isArray(result)
            ? result
            : typeof result === "object" &&
                result !== null &&
                "data" in result &&
                Array.isArray((result as { data: unknown }).data)
                ? (result as { data: ApiFood[] }).data
                : [];

        if (!data.length) return sampleFoods;

        return (data as ApiFood[]).map((item) => ({
            id: String(item.id),
            name: item.name,
            description: item.description || "Freshly prepared by our kitchen.",
            price: Number(item.price),
            category:
                typeof item.category === "string"
                    ? item.category
                    : item.category?.name || "Main Course",
            image: item.image || item.imageUrl || sampleFoods[0].image,
            available: item.available !== false,
        }));
    } catch {
        return sampleFoods;
    }
}