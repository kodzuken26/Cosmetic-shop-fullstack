import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
import type { BlogPost, BlogState } from '../../types/blog';

const initialState: BlogState = {
    posts: [],
    currentPost: null,
    loading: false,
    error: null,
};

export const fetchBlogPosts = createAsyncThunk('blog/fetchAll', async () => {
    const res = await api.get('/blog/');
    return res.data as BlogPost[];
});

export const fetchBlogPostBySlug = createAsyncThunk('blog/fetchOne', async (slug: string) => {
    const res = await api.get(`/blog/${slug}/`);
    return res.data as BlogPost;
});

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBlogPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchBlogPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка загрузки статей';
            })
            .addCase(fetchBlogPostBySlug.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBlogPostBySlug.fulfilled, (state, action) => {
                state.loading = false;
                state.currentPost = action.payload;
            })
            .addCase(fetchBlogPostBySlug.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка загрузки статьи';
            });
    },
});

export default blogSlice.reducer;