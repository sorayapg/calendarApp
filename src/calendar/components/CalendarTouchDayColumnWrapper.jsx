import { forwardRef, useRef } from 'react';

const TAP_MOVE_TOLERANCE = 10;
const TAP_DURATION_TOLERANCE = 350;

const shouldIgnoreTouchTarget = (target) => {
  return !!target.closest('.rbc-event, .rbc-show-more, .rbc-button-link');
};

export const CalendarTouchDayColumnWrapper = forwardRef(({
  children,
  className,
  style,
  slotMetrics,
  onTapSlot,
}, ref) => {
  const touchStateRef = useRef({
    startX: 0,
    startY: 0,
    startTime: 0,
    moved: false,
    shouldHandleTap: false,
  });

  const setRefs = (node) => {
    if (typeof ref === 'function') {
      ref(node);
      return;
    }

    if (ref) {
      ref.current = node;
    }
  };

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

  const handleTouchEnd = (event) => {
    const { moved, shouldHandleTap, startTime } = touchStateRef.current;
    const touchDuration = Date.now() - startTime;

    if (!shouldHandleTap || moved || touchDuration > TAP_DURATION_TOLERANCE || !slotMetrics) {
      return;
    }

    const touch = event.changedTouches[0];
    const bounds = event.currentTarget.getBoundingClientRect();
    const start = slotMetrics.closestSlotFromPoint({ x: touch.clientX, y: touch.clientY }, bounds);

    onTapSlot?.(start);
  };

  return (
    <div
      ref={setRefs}
      className={className}
      style={style}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
});