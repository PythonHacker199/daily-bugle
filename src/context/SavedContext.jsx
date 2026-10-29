import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const SavedContext = createContext(null);

// We store only story IDs (not whole stories). If a story's text changes in the JSON,
// the saved list still shows the latest version.
export function SavedProvider({ children }) {
  const [savedIds, setSavedIds] = useLocalStorage('dailyBugle:saved', []);

  const isSaved = (id) => savedIds.includes(id);

  const toggleSave = (id) => {
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const clearSaved = () => setSavedIds([]);

  return (
    <SavedContext.Provider value={{ savedIds, isSaved, toggleSave, clearSaved }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error('useSaved must be used inside <SavedProvider>');
  return ctx;
}
