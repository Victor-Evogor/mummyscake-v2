export interface Cake {
    id: string,
    name: string,
    description: string,
    price: number,
    weight: number,
    flavors: string[],
    ingredients: string[],
    image: string,
    rating: number,
    reviews: {
        user: string,
        comment: string,
        rating: number
    }[],
    delivery_info: {
        available: boolean,
        shipping_cost: number,
        estimated_delivery_time: string
    },
    size: {
        diameter: number,
        height: number,
        serving_size: number
    },
    occasion: string,
    allergens: string[],
    nutritional_info: {
        calories: number,
        fat: number,
        sugar: number,
        protein: number
    }
}