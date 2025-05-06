import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';// importacion temporal que se acabara borrando

// crearemos aqui el evento temporalmente 
const tempEvent = {
    _id: new Date().getTime(),
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

    
    
    reducers: {
        onSetActiveEvent: ( state, { payload }) => {
            state.activeEvent = payload;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent } = calendarSlice.actions;