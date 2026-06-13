import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const fetchQuestions = createAsyncThunk('test/fetchQuestions', async () => {
    const res = await api.get('/test/questions/');
    return res.data;
});

export const submitTest = createAsyncThunk('test/submit', async (answers: number[]) => {
    const res = await api.post('/test/submit/', { answers });
    return res.data;
});

const testSlice = createSlice({
    name: 'test',
    initialState: {
        questions: [],
        currentStep: 0,
        answers: [] as number[],
        result: null as any,
        loading: false,
        error: null as string | null,
    },
    reducers: {
        setAnswer: (state, action) => {
            const { index, value } = action.payload;
            state.answers[index] = value;
        },
        nextStep: (state) => {
            if (state.currentStep < 9) state.currentStep++;
        },
        prevStep: (state) => {
            if (state.currentStep > 0) state.currentStep--;
        },
        resetTest: (state) => {
            state.currentStep = 0;
            state.answers = [];
            state.result = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload;
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка загрузки вопросов';
            })
            .addCase(submitTest.pending, (state) => {
                state.loading = true;
            })
            .addCase(submitTest.fulfilled, (state, action) => {
                state.loading = false;
                state.result = action.payload;
            })
            .addCase(submitTest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка отправки теста';
            });
    },
});

export const { setAnswer, nextStep, prevStep, resetTest } = testSlice.actions;
export default testSlice.reducer;