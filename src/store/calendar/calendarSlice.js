import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';// importacion temporal que se acabara borrando

// crearemos aqui el evento temporalmente 
const tempEvent = {
    title: 'Cumpleaños de Diego',
    notes: 'Organizar el cumple',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Diego'
    }   
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent,
        ],
        activeEvent: null,
    },

    //TODO : cargar los reducers en el slice
    //TODO : crear los reducers para el slice
    
    reducers: {
        increment: (state, /* action */ ) => {
            state.counter += 1;
        },
    }
});


// Action creators are generated for each case reducer function
export const { increment } = calendarSlice.actions;