import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { chapters } from '../../api/staticData';
 
interface Suras {
    data: any[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null
}

const initialState: Suras = {
    data: chapters,
    status: 'idle',
    error: null
}

export const listOfSuras = createSlice({
    name: 'listOfSuras',
    initialState,
    reducers: {
        getDataSuccess: (state, action) => {
            return {
                ...state,
                data: action.payload,
                status: 'idle',
                error: null,
            }
        },
        getDataLoading: (state) => {
            return {
                ...state,
                status: 'loading',
                error: null
            }
        },
        getDataError: (state, action) => {
            return {
                ...state,
                status: 'failed',
                error: action.payload
            }
        }
    }
})

export const {getDataSuccess, getDataLoading, getDataError} = listOfSuras.actions;

export const selectListOfSuras = (state: RootState) => state.listOfSuras.data;
export default listOfSuras.reducer;