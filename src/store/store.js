import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './ui/uiSlice'; // ✅ evita la circularidad


export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer
    }
})