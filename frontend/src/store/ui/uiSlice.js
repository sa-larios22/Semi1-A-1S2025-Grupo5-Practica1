import { createSlice } from '@reduxjs/toolkit';

export const UI_STATUS = {
    OPEN: true,
    CLOSE: false,
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        status: UI_STATUS.CLOSE,
    },
    reducers: {
        onChangeStatus: (state) => {
            state.status = !state.status;
        },
    }
});

export const { onChangeStatus } = uiSlice.actions;