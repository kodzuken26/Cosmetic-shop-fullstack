import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const fetchFavorites = createAsyncThunk('favorites/fetch', async () => {
    const res = await api.get('/favorites/');
    return res.data;
});

export const addToFavorite = createAsyncThunk('favorites/add', async (product_id: number) => {
    const res = await api.post('/favorites/add/', { product_id });
    return res.data;
});

export const removeFromFavorite = createAsyncThunk('favorites/remove', async (product_id: number) => {
    await api.delete(`/favorites/remove/${product_id}/`);
    return product_id;
});

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState: { items: [] as any[], loading: false, error: null },
    reducers: {
        clearFavorites: (state) => {
            state.items = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addToFavorite.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(removeFromFavorite.fulfilled, (state, action) => {
                state.items = state.items.filter((i: any) => i.product.id !== action.payload);
            });
    }
});

export const { clearFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;