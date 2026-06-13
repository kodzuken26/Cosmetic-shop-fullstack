export interface CartItem {
    id: number;
    product: number;
    product_name: string;
    price: number;
    image_url: string;
    quantity: number;
    total_price: number;
}

export interface CartState {
    items: CartItem[];
    total_price: number;
    total_items: number;
    loading: boolean;
    error: string | null;
}