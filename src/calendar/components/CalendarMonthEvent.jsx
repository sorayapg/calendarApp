import { format, isSameDay } from 'date-fns';

const hasExplicitAllDayFlag = (event) => event?.allDay === true;

const isFullDayRange = (start, end) => {
  if (!(start instanceof Date) || Number.isNaN(start.getTime())) return false;
  if (!(end instanceof Date) || Number.isNaN(end.getTime())) return false;

  return !isSameDay(start, end)
    && start.getHours() === 0
    && start.getMinutes() === 0
    && end.getHours() === 0
    && end.getMinutes() === 0;
};

const getMonthEventTimeRange = (event) => {
  const start = event?.start;
  const end = event?.end;

  if (hasExplicitAllDayFlag(event) || isFullDayRange(start, end)) {
    return '';
  }

  if (!(start instanceof Date) || Number.isNaN(start.getTime())) {
    return '';
  }

  if (!(end instanceof Date) || Number.isNaN(end.getTime())) {
    return format(start, 'HH:mm');
  }

  return `${format(start, 'HH:mm')}–${format(end, 'HH:mm')}`;
};

export const CalendarMonthEvent = ({ event }) => {
  const timeRange = getMonthEventTimeRange(event);

  return (
    <span>
      {timeRange ? `${timeRange} · ` : ''}
      <strong>{event?.title}</strong>
    </span>
  );
};