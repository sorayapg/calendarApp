import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, calendarSlice, authSlice  } from './'; // ✅ evita la circularidad
// Importa los slices desde el índice de la carpeta store
export const store = configureStore({
    reducer: {
        auth:       authSlice.reducer,
        calendar:   calendarSlice.reducer,
        ui:         uiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})