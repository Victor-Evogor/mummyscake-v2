export interface OrderType {
    value: number;
    status: "pending" | "completed"
    items: {
        id: string;
        name: string;
        quantity: number;
        price: number
    }[]
}