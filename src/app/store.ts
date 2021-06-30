import { configureStore } from '@reduxjs/toolkit';
import listOfSurasReducer from '../features/listOfSurasSlice';
import reciterReducer from '../features/reciterSlice';

export const store = configureStore({
    reducer: {
        listOfSuras: listOfSurasReducer,
        reciter: reciterReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;