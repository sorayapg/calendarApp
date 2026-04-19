// Importación de hooks de React
import { useCallback, useEffect, useMemo, useState } from 'react';

// Componente principal del calendario de la librería react-big-calendar
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Estilos del calendario

// Componentes personalizados del proyecto
import { CalendarEvent, CalendarModal, CalendarToolbar, FabAddNew, FabDelete, Navbar } from '../';
import { CalendarTouchDayColumnWrapper } from '../components/CalendarTouchDayColumnWrapper';
import { CalendarTouchSlotWrapper } from '../components/CalendarTouchSlotWrapper';
import { createDraftEvent } from '../helpers/createDraftEvent';

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
  const [isTouchDevice, setIsTouchDevice] = useState(false);

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

  // Selecciona un evento existente y abre el modal de edición con un solo click/tap
  const onSelect = (event) => {
    setActiveEvent(event);
    openDateModal();
  }

  const openDraftEventModal = useCallback((start) => {
    setActiveEvent(createDraftEvent({ start, user, view: lastView }));
    openDateModal();
  }, [lastView, openDateModal, setActiveEvent, user]);

  const onSelectSlot = ({ start }) => {
    openDraftEventModal(start);
  };

  // Guarda en localStorage la vista seleccionada y la actualiza en estado
  const onViewChange = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  }

  // Efecto que se ejecuta una vez al montar el componente para cargar eventos
  useEffect(() => {
    starrtLoadingEvents();
  }, []);

  useEffect(() => {
    const coarsePointerQuery = window.matchMedia('(pointer: coarse)');
    const noHoverQuery = window.matchMedia('(hover: none)');

    const updateTouchDeviceState = () => {
      // Solo activamos el modo touch cuando el dispositivo se comporta realmente como móvil/tablet.
      // En portátiles con pantalla táctil pero uso principal con ratón, mantener onSelectSlot de escritorio.
      setIsTouchDevice(coarsePointerQuery.matches && noHoverQuery.matches);
    };

    updateTouchDeviceState();
    coarsePointerQuery.addEventListener?.('change', updateTouchDeviceState);
    noHoverQuery.addEventListener?.('change', updateTouchDeviceState);

    return () => {
      coarsePointerQuery.removeEventListener?.('change', updateTouchDeviceState);
      noHoverQuery.removeEventListener?.('change', updateTouchDeviceState);
    };
  }, []);

  const calendarComponents = useMemo(() => {
    const components = {
      event: CalendarEvent,
      toolbar: CalendarToolbar,
    };

    if (!isTouchDevice) return components;

    return {
      ...components,
      dateCellWrapper: (wrapperProps) => (
        <CalendarTouchSlotWrapper
          {...wrapperProps}
          onTapSlot={openDraftEventModal}
        />
      ),
      dayColumnWrapper: (wrapperProps) => (
        <CalendarTouchDayColumnWrapper
          {...wrapperProps}
          onTapSlot={openDraftEventModal}
        />
      ),
    };
  }, [isTouchDevice, openDraftEventModal]);

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
        selectable={isTouchDevice ? false : 'ignoreEvents'} // En touch usamos wrappers propios; en desktop mantenemos la selección nativa de RBC
        startAccessor="start" // Campo que indica la fecha de inicio
        endAccessor="end" // Campo que indica la fecha de fin
        style={{ height: 'calc( 100vh - 80px )' }} // Altura ajustada al viewport
        longPressThreshold={250} // Mantiene el umbral por defecto cuando la selección nativa está activa
        messages={getMessagesES()} // Traducción de mensajes al español
        eventPropGetter={eventStyleGetter} // Estilo personalizado por evento
        components={calendarComponents}
        onSelectEvent={onSelect} // Click/tap en evento existente para editar
        onSelectSlot={onSelectSlot} // Click/tap en celda o franja para crear un nuevo evento
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
