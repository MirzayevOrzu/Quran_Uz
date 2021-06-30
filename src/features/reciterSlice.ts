import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../app/store';

interface Reciter {
    identifier: string,
    language: string,
    name: string,
    englishName: string
    format: "audio",
    type: "translation" | "versebyverse",
    direction: null
}

interface Reciters {
    reciters: Reciter[];
    current: Reciter;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null
}

const initialState: Reciters = {
    reciters: [],
    current: {
        identifier: "ar.alafasy",
        language: "ar",
        name: "\u0645\u0634\u0627\u0631\u064a \u0627\u0644\u0639\u0641\u0627\u0633\u064a",
        englishName: "Alafasy",
        format: "audio",
        type: "versebyverse",
        direction: null
    },
    status: 'idle',
    error: null
}

export const fetchReciters = createAsyncThunk('reciter/fetchReciters', async () => {
    const response = await axios.get('http://api.alquran.cloud/v1/edition?format=audio');
    return response.data.data;
})

export const reciterSlice = createSlice({
    name: 'reciter',
    initialState,
    reducers: {
        recitersAdded(state, action) {
            const posts = action.payload;
            state.reciters.push(...posts);
        },
        setCurrentReciter(state, action) {
            const current = state.reciters.find(one => one.identifier === action.payload);
            if (current !== undefined) {
                state.current = current;
            }
        }
    },
    extraReducers: {
        [`${fetchReciters.pending}`]: (state, action) => {
            state.status = 'loading'
        },
        [`${fetchReciters.fulfilled}`]: (state, action) => {
            state.status = 'succeeded'
            state.reciters = state.reciters.concat(action.payload)
        },
        [`${fetchReciters.rejected}`]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
})

export const { setCurrentReciter } = reciterSlice.actions;

export const selectReciters = (state: RootState) => state.reciter.reciters;
export const selectCurReciter = (state: RootState) => state.reciter.current;
export const selectRStatus = (state: RootState) => state.reciter.status;

export default reciterSlice.reducer;