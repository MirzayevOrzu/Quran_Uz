import { configureStore } from '@reduxjs/toolkit';
import listOfSurasReducer from '../features/Quran/listOfSurasSlice';

export const store = configureStore({
    reducer: {
        listOfSuras: listOfSurasReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;