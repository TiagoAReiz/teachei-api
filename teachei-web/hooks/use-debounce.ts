"use client";

import { useState, useEffect } from "react";

/**
 * Hook that debounces a value by the specified delay.
 * Returns the debounced value that only updates after the delay has passed
 * without the input value changing.
 * 
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds (default: 200ms)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number = 200): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer if value changes before delay completes
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook that provides a debounced callback function.
 * The callback will only be executed after the specified delay has passed
 * without the function being called again.
 * 
 * @param callback - The function to debounce
 * @param delay - The delay in milliseconds (default: 200ms)
 * @returns The debounced callback
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number = 200
): T {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const debouncedCallback = ((...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      callback(...args);
    }, delay);

    setTimeoutId(newTimeoutId);
  }) as T;

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return debouncedCallback;
}
