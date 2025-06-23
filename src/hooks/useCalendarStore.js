// Importa hooks de Redux para despachar acciones y leer el estado
import { useDispatch, useSelector } from 'react-redux';

// Acciones de Redux relacionadas con eventos del calendario
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';

// Cliente API configurado para hacer peticiones HTTP
import { calendarApi } from '../api';

// Helper que convierte eventos del backend al formato correcto con objetos Date
import { convertEventsToDateEvents } from '../helpers';

// Librería para mostrar alertas bonitas
import Swal from 'sweetalert2';


// Hook personalizado para encapsular lógica del calendario
export const useCalendarStore = () => {

    const dispatch = useDispatch();

    // Extrae eventos y evento activo desde el store de Redux
    const { events, activeEvent } = useSelector( state => state.calendar);

    // Extrae usuario autenticado desde el store
    const { user } = useSelector( state => state.auth);

    // Establece un evento como activo
    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    // Crea o actualiza un evento en el backend
    const startSavingEvent = async( calendarEvent ) => {
        try {
            if ( calendarEvent.id ) {
                // Actualizar evento existente
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch( onUpdateEvent({ ...calendarEvent, user }));
                return;
            }

            // Crear nuevo evento
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));

        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response?.data?.msg || 'Error inesperado', 'error');
        }
    }

    // Eliminar evento activo del backend y del store
    const startDeletingEvent = async () => {
        if ( !activeEvent ) return;

        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch( onDeleteEvent() );
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response?.data?.msg || 'No se pudo eliminar el evento', 'error');
        }
    }

    // Cargar eventos del backend al iniciar la app
    const starrtLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.events); // Convierte fechas a objetos Date
            dispatch( onLoadEvents(events));
        } catch (error) {
            console.log('Error al cargar eventos');
            console.log(error);
        }
    }

    return {
        //* Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent, // Booleano si hay evento activo

        //* Métodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        starrtLoadingEvents,
    }
};
