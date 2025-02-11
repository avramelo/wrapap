"use client";

import { useEffect, useState } from "react";
import store from "store2";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const item = store.get(key);
      if (item !== undefined) {
        setValue(item);
      }
      setIsInitialized(true);
    } catch (error) {
      console.warn(`Error reading store key "${key}":`, error);
    }
  }, [key]);

  const setStoredValue = (newValue: T) => {
    try {
      setValue(newValue);
      store.set(key, newValue);
    } catch (error) {
      console.warn(`Error setting store key "${key}":`, error);
    }
  };

  const removeValue = () => {
    try {
      setValue(initialValue);
      store.remove(key);
    } catch (error) {
      console.warn(`Error removing store key "${key}":`, error);
    }
  };

  return {
    value,
    setValue: setStoredValue,
    removeValue,
    isInitialized,
  };
};
