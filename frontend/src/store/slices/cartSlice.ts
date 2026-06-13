import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

interface CartItem {
    id: number;
    product: number;
    product_name: string;
    product_price: number;
    image_url: string;
    quantity: number;
    price: number;
    total_price: number;
}

interface CartState {
    items: CartItem[];
    total_price: number;
    total_items: number;
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    items: [],
    total_price: 0,
    total_items: 0,
    loading: false,
    error: null,
};

// Загрузка корзины
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    const response = await api.get('/cart/');
    return response.data;
});

// Добавление товара в корзину
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ product_id, quantity = 1, price }: { product_id: number; quantity?: number; price?: number }) => {
        const response = await api.post('/cart/add/', { product_id, quantity, price });
        return response.data;
    }
);

// Удаление товара из корзины
export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (item_id: number) => {
        const response = await api.delete(`/cart/remove/${item_id}/`);
        return response.data;
    }
);

// Обновление количества товара
export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async ({ item_id, quantity }: { item_id: number; quantity: number }) => {
        const response = await api.patch(`/cart/update/${item_id}/`, { quantity });
        return response.data;
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.items = [];
            state.total_price = 0;
            state.total_items = 0;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                state.total_price = action.payload.total_price;
                state.total_items = action.payload.total_items;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка загрузки корзины';
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                state.total_price = action.payload.total_price;
                state.total_items = action.payload.total_items;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                state.total_price = action.payload.total_price;
                state.total_items = action.payload.total_items;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                state.total_price = action.payload.total_price;
                state.total_items = action.payload.total_items;
            });
    },
});

// Экспортируем actions и reducer
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;