import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { uiSlice } from './ui';
import { bookSlice } from './books';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        books: bookSlice.reducer,
        ui: uiSlice.reducer
    },
});