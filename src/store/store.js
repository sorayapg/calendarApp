import { configureStore } from '@reduxjs/toolkit';
import { uiSlice,  } from './ui/uiSlice'; // ✅ evita la circularidad
import { calendarSlice } from './calendar/calendarSlice';


export const store = configureStore({
    reducer: {
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})