import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CalendarToolbar = ({ label, onNavigate, onView, view, views }) => {
  const [activeNavButton, setActiveNavButton] = useState(null);

  const handleNavigate = (direction) => {
    setActiveNavButton(direction);
    onNavigate(direction.toUpperCase());
  };

  const handleTodayClick = () => {
    setActiveNavButton(null);
    onNavigate('TODAY');
  };

  const handleViewClick = (nextView) => {
    setActiveNavButton(null);
    onView(nextView);
  };

  return (
    <div className="rbc-toolbar">

      {/* "Hoy" solo en su grupo */}
      <div className="rbc-btn-group">
        <button type="button" onClick={handleTodayClick}>
          Hoy
        </button>
      </div>

      {/* Flechas en grupo propio */}
      <div className="rbc-btn-group rbc-nav-arrows">
        <button
          type="button"
          className={activeNavButton === 'prev' ? 'rbc-nav-button-active' : ''}
          aria-label="Anterior"
          aria-pressed={activeNavButton === 'prev'}
          onClick={() => handleNavigate('prev')}
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>
        <button
          type="button"
          className={activeNavButton === 'next' ? 'rbc-nav-button-active' : ''}
          aria-label="Siguiente"
          aria-pressed={activeNavButton === 'next'}
          onClick={() => handleNavigate('next')}
        >
          <ChevronRight size={20} strokeWidth={2} />
        </button>
      </div>

      {/* Título central: mes y año actual */}
      <span className="rbc-toolbar-label">{label}</span>

      {/* Grupo derecho: Mes, Semana, Día, Agenda */}
      <div className="rbc-btn-group">
        {views.map((v) => (
          <button
            key={v}
            type="button"
            className={v === view ? 'rbc-active' : ''}
            onClick={() => handleViewClick(v)}
          >
            {{ month: 'Mes', week: 'Semana', day: 'Día', agenda: 'Agenda' }[v] ?? v}
          </button>
        ))}
      </div>

    </div>
  );
};
