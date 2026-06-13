import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const fetchLatestProducts = createAsyncThunk('latest/fetch', async () => {
    const res = await api.get('/products/latest/');
    return res.data;
});

interface LatestState {
    items: any[];
    loading: boolean;
    error: string | null;
}

const initialState: LatestState = {
    items: [],
    loading: false,
    error: null,
};

const latestSlice = createSlice({
    name: 'latest',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLatestProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLatestProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchLatestProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка загрузки новинок';
            });
    },
});

export default latestSlice.reducer;