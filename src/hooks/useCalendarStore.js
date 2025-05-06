import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent } from '../store';


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar);

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async( calendarEvent ) => {
        // TODO: llegar al backend 

        // Todo bien 

        if ( calendarEvent._id) {
            // Actualizando un evento
            dispatch( onUpdateEvent({ ...calendarEvent }));
        } else {
            // Creando un nuevo evento
            dispatch ( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
        }
    }


    return {
        //* Propiedades
        activeEvent,
        events,

        //* Métodos
        setActiveEvent,
        startSavingEvent,
    }
  
}
