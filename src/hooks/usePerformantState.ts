import { useState, useCallback, useRef } from "react";

export const usePerformantState = <T>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setStateWithDebounce = useCallback(
    (newState: T | ((prev: T) => T), delay: number = 100) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setState(newState);
      }, delay);
    },
    []
  );

  const setStateImmediate = useCallback((newState: T | ((prev: T) => T)) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setState(newState);
  }, []);

  const clearDebounce = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return {
    state,
    setState: setStateImmediate,
    setStateWithDebounce,
    clearDebounce,
  };
};
