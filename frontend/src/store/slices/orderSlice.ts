import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

interface OrderItem {
    id: number;
    product_name: string;
    product_price: number;
    quantity: number;
    total_price: number;
}

interface Order {
    id: number;
    created_at: string;
    status: string;
    total_price: number;
    items: OrderItem[];
    full_name: string;
    phone: string;
    city: string;
    street: string;
    house: string;
    apartment: string;
    postal_code: string;
}

interface OrdersState {
    items: Order[];
    loading: boolean;
    error: string | null;
}

const initialState: OrdersState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchUserOrders = createAsyncThunk('orders/fetch', async () => {
    const res = await api.get('/orders/');
    return res.data;
});

export const createOrder = createAsyncThunk('orders/create', async (address: any) => {
    const res = await api.post('/order/create/', { address });
    return res.data;
});

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearOrdersError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка загрузки заказов';
            })
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка оформления заказа';
            });
    },
});

export const { clearOrdersError } = orderSlice.actions;
export default orderSlice.reducer;