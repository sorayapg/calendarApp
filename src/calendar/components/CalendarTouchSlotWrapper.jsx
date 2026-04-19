import { cloneElement, useRef } from 'react';

const TAP_MOVE_TOLERANCE = 10;
const TAP_DURATION_TOLERANCE = 350;

const shouldIgnoreTouchTarget = (target) => {
  return !!target.closest('.rbc-event, .rbc-show-more, .rbc-button-link');
};

const composeHandlers = (originalHandler, nextHandler) => (event) => {
  originalHandler?.(event);

  if (!event.defaultPrevented) {
    nextHandler(event);
  }
};

export const CalendarTouchSlotWrapper = ({ children, value, onTapSlot }) => {
  const touchStateRef = useRef({
    startX: 0,
    startY: 0,
    startTime: 0,
    moved: false,
    shouldHandleTap: false,
  });

  const handleTouchStart = (event) => {
    const touch = event.touches[0];

    touchStateRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now(),
      moved: false,
      shouldHandleTap: !shouldIgnoreTouchTarget(event.target),
    };
  };

  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    const { startX, startY } = touchStateRef.current;

    if (
      Math.abs(touch.clientX - startX) > TAP_MOVE_TOLERANCE ||
      Math.abs(touch.clientY - startY) > TAP_MOVE_TOLERANCE
    ) {
      touchStateRef.current.moved = true;
    }
  };

  const handleTouchEnd = () => {
    const { moved, shouldHandleTap, startTime } = touchStateRef.current;
    const touchDuration = Date.now() - startTime;

    if (shouldHandleTap && !moved && touchDuration <= TAP_DURATION_TOLERANCE) {
      onTapSlot?.(value);
    }
  };

  return cloneElement(children, {
    onTouchStart: composeHandlers(children.props.onTouchStart, handleTouchStart),
    onTouchMove: composeHandlers(children.props.onTouchMove, handleTouchMove),
    onTouchEnd: composeHandlers(children.props.onTouchEnd, handleTouchEnd),
  });
};