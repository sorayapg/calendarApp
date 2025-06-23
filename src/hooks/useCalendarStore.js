import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';
import Swal from 'sweetalert2';


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar);
     const { user } = useSelector( state => state.auth);

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async( calendarEvent ) => {
       
        try {
            if ( calendarEvent.id) {
            // Actualizando un evento

            await calendarApi.put(`/events/${calendarEvent.id }`, calendarEvent)
            dispatch( onUpdateEvent({ ...calendarEvent, user }));
            return;
        } 

        // Creando un nuevo evento
         const { data } = await calendarApi.post('/events', calendarEvent)
         //console.log(data);
         dispatch ( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));

        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
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
            dispatch( onLoadEvents( events ));
            
            
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
