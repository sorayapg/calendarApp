// Importa createSlice para crear un slice de Redux
import { createSlice } from '@reduxjs/toolkit';

// ❗ Importación innecesaria, no se usa en este archivo
import { eachHourOfInterval } from 'date-fns'; 
// 🔧 Eliminar si no se usa

// Definición del slice para el calendario
export const calendarSlice = createSlice({
    name: 'calendar', // Nombre del slice (clave del estado)
    
    initialState: {
        isLoadingEvents: true, // Indicador de carga de eventos
        events: [],            // Lista de eventos
        activeEvent: null,     // Evento actualmente seleccionado
    },

    reducers: {
        // Establece el evento activo seleccionado
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },

        // Añade un nuevo evento y limpia el evento activo
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },

        // Actualiza un evento existente comparando por ID
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event =>
                event.id === payload.id ? payload : event
            );
        },

        // Elimina el evento activo si existe
        onDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(
                    event => event.id !== state.activeEvent.id
                );
                state.activeEvent = null;
            }
        },

        // Carga eventos del backend y evita duplicados
        onLoadEvents: (state, { payload = [] }) => {
            state.isLoadingEvents = false;

            // ✅ En lugar de sobreescribir directamente,
            // se añade solo si no existen (evita duplicados)
            payload.forEach(event => {
                const exists = state.events.some(dbEvent => dbEvent.id === event.id);
                if (!exists) {
                    state.events.push(event);
                }
            });

            // ❌ Comentado, puede ser confuso
            // state.events = payload;
        },

        // Limpia el estado al cerrar sesión
        onLogoutCalendar: (state) => {
            state.isLoadingEvents = true;
            state.events = [];
            state.activeEvent = null;
        }
    }
});

// Exporta las acciones para usarlas en los dispatch
export const {
    onAddNewEvent,
    onDeleteEvent,
    onLoadEvents,
    onLogoutCalendar,
    onSetActiveEvent,
    onUpdateEvent,
} = calendarSlice.actions;
