import { useEffect, useRef } from 'react';

export const useResizeObserver = (callback) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      callback(entries[0]);
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.unobserve(element);
    };
  }, [callback]);

  return ref;
};