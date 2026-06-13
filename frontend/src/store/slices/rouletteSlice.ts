import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

// Временный интерфейс для товара в рулетке
interface RouletteProduct {
    id: number;
    name: string;
    image: string;
    price: number;
}

interface RouletteState {
    products: RouletteProduct[];
    spinning: boolean;
    prize: RouletteProduct | null;
    open: boolean;
}

const initialState: RouletteState = {
    products: [],
    spinning: false,
    prize: null,
    open: false,
};

export const fetchRouletteProducts = createAsyncThunk('roulette/fetch', async () => {
    const res = await api.get('/roulette/products/');
    return res.data as RouletteProduct[];
});

const rouletteSlice = createSlice({
    name: 'roulette',
    initialState,
    reducers: {
        startSpin: (state) => { state.spinning = true; state.prize = null; },
        stopSpin: (state, action) => {
            state.spinning = false;
            state.prize = action.payload;
        },
        setOpen: (state, action) => { state.open = action.payload; },
        closeRoulette: (state) => { state.open = false; state.prize = null; state.spinning = false; },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRouletteProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        });
    },
});

export const { startSpin, stopSpin, setOpen, closeRoulette } = rouletteSlice.actions;
export default rouletteSlice.reducer;