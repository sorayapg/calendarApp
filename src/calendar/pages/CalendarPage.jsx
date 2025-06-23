// Importación de hooks de React
import { useEffect, useState } from 'react';

// Componente principal del calendario de la librería react-big-calendar
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Estilos del calendario

// Componentes personalizados del proyecto
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from '../';

// Funciones helper
import { localizer, getMessagesES } from '../../helpers';

// Hooks personalizados (probablemente gestionan global state o contexto)
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';


// Componente principal que muestra la página del calendario
export const CalendarPage = () => {

  // Obtiene el usuario autenticado
  const { user } = useAuthStore();

  // Acción para abrir el modal
  const { openDateModal } = useUiStore();

  // Obtiene los eventos, función para establecer evento activo, y cargar eventos
  const { events, setActiveEvent, starrtLoadingEvents } = useCalendarStore();

  // Estado para recordar la última vista del calendario (semana, mes, día, etc.)
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  // Función que define el estilo de cada evento
  const eventStyleGetter = (event, start, end, isSelected) => {
    // Comprueba si el evento es del usuario autenticado
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);

    const style = {
      backgroundColor: isMyEvent ? '#34d0f7' : '#465660', // Azul si es tuyo, gris si es de otro
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }

    return {
      style
    }
  }

  // Abre el modal al hacer doble clic sobre un evento
  const onDoubleClick = (event) => {
    openDateModal();
  }

  // Marca el evento seleccionado como activo
  const onSelect = (event) => {
    setActiveEvent(event);
  }

  // Guarda en localStorage la vista seleccionada y la actualiza en estado
  const onViewChange = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  }

  // Efecto que se ejecuta una vez al montar el componente para cargar eventos
  useEffect(() => {
    starrtLoadingEvents();
  }, []);

  return (
    <>
      {/* Barra de navegación */}
      <Navbar />

      {/* Componente de calendario */}
      <Calendar
        culture='es' // Idioma del calendario
        localizer={localizer} // Localizador de fechas
        events={events} // Lista de eventos a mostrar
        defaultView={lastView} // Vista por defecto
        startAccessor="start" // Campo que indica la fecha de inicio
        endAccessor="end" // Campo que indica la fecha de fin
        style={{ height: 'calc( 100vh - 80px )' }} // Altura ajustada al viewport
        messages={getMessagesES()} // Traducción de mensajes al español
        eventPropGetter={eventStyleGetter} // Estilo personalizado por evento
        components={{
          event: CalendarEvent // Componente personalizado para mostrar eventos
        }}
        onDoubleClickEvent={onDoubleClick} // Doble clic en evento
        onSelectEvent={onSelect} // Selección de evento
        onView={onViewChange} // Cambio de vista
      />

      {/* Modal para crear/editar eventos */}
      <CalendarModal />

      {/* Botón flotante para añadir nuevo evento */}
      <FabAddNew />

      {/* Botón flotante para eliminar evento */}
      <FabDelete />
    </>
  );
}
