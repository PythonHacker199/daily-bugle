import { useEffect, useState } from 'react';

/**
 * Like useState, but the value is also written to localStorage
 * so it survives a page refresh.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      // Private mode, blocked storage or corrupted JSON: fall back to the default.
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or blocked; the app still works for this session.
    }
  }, [key, value]);

  return [value, setValue];
}
