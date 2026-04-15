import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CalendarToolbar = ({ label, onNavigate, onView, view, views }) => {
  return (
    <div className="rbc-toolbar">

      {/* "Hoy" solo en su grupo */}
      <div className="rbc-btn-group">
        <button type="button" onClick={() => onNavigate('TODAY')}>
          Hoy
        </button>
      </div>

      {/* Flechas en grupo propio */}
      <div className="rbc-btn-group rbc-nav-arrows">
        <button
          type="button"
          aria-label="Anterior"
          onClick={() => onNavigate('PREV')}
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>
        <button
          type="button"
          aria-label="Siguiente"
          onClick={() => onNavigate('NEXT')}
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
            onClick={() => onView(v)}
          >
            {{ month: 'Mes', week: 'Semana', day: 'Día', agenda: 'Agenda' }[v] ?? v}
          </button>
        ))}
      </div>

    </div>
  );
};
