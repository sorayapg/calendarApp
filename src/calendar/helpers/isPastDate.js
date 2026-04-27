import { isBefore, startOfDay } from 'date-fns';

export const isPastDate = (date) => {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return true;
  }

  return isBefore(startOfDay(date), startOfDay(new Date()));
};