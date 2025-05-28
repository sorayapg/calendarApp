import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar);
     const { user } = useSelector( state => state.auth);

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async( calendarEvent ) => {
        // llegar al backend 

        // Todo: Update event 

        if ( calendarEvent._id) {
            // Actualizando un evento
            dispatch( onUpdateEvent({ ...calendarEvent }));
        } else {
            // Creando un nuevo evento
            const { data } = await calendarApi.post('/events', calendarEvent)
            //console.log(data);
            dispatch ( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
        }
    }

    const startDeletingEvent = () => {
        // TODO: llegar al backend
        dispatch ( onDeleteEvent() );
    }

    const starrtLoadingEvents = async () => {
        try {

            const {data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents( data.events );
            console.log( events );
            
        } catch (error) {
            console.log('Error al cargar eventos');
            console.log(error);
            
        }
    }


    return {
        //* Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        //* Métodos
        setActiveEvent,
        startDeletingEvent,
        starrtLoadingEvents,
        startSavingEvent,
    }
  
}
