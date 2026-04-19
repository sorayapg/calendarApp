import { addHours } from 'date-fns';

export const createDraftEvent = ({ start = new Date(), user = {}, view = 'week' } = {}) => {
  const eventStart = new Date(start);

  if (view === 'month') {
    const now = new Date();
    eventStart.setHours(now.getHours(), 0, 0, 0);
  }

  const eventEnd = addHours(eventStart, 2);

  return {
    title: '',
    notes: '',
    start: eventStart,
    end: eventEnd,
    bgColor: '#fafafa',
    user: {
      _id: user?.uid || user?._id || '',
      name: user?.name || '',
    },
  };
};