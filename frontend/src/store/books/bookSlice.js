import { createSlice } from '@reduxjs/toolkit';


export const bookSlice = createSlice({
    name: 'book',
    initialState: {
        books: [],
        userBooks: [],
        book: {},
        loading: false,
        error: null
    },
    reducers: {
        onLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        onGetBooks: (state, { payload }) => {
            state.books = payload;
            state.loading = false;
        },
        onGetBook: (state, { payload }) => {
            state.book = payload;
            state.loading = false;
        },
        onGetUserBooks: (state, { payload }) => {
            state.userBooks = payload;
            state.loading = false;
        },
        onError: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        }
    }
});

export const { onLoading, onGetBooks, onGetBook, onGetUserBooks, onError } = bookSlice.actions;