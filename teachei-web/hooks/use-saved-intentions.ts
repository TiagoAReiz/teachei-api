"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "teachei_saved_intentions";

/**
 * Load saved IDs from localStorage (runs only on client)
 */
function getInitialSavedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Error loading saved intentions:", error);
  }
  return [];
}

/**
 * Hook to manage saved intentions in localStorage
 * Provides persistence across browser sessions
 */
export function useSavedIntentions() {
  // Use lazy initialization to load from localStorage
  const [savedIds, setSavedIds] = useState<string[]>(getInitialSavedIds);
  const [isLoaded, setIsLoaded] = useState(() => typeof window !== "undefined");

  // Mark as loaded on mount (for SSR hydration)
  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true);
    }
  }, [isLoaded]);

  // Persist to localStorage whenever savedIds changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
      } catch (error) {
        console.error("Error saving intentions:", error);
      }
    }
  }, [savedIds, isLoaded]);

  /**
   * Check if an intention is saved
   */
  const isSaved = useCallback(
    (id: string): boolean => {
      return savedIds.includes(id);
    },
    [savedIds]
  );

  /**
   * Toggle save state for an intention
   */
  const toggleSave = useCallback((id: string) => {
    setSavedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((savedId) => savedId !== id);
      } else {
        return [...prev, id];
      }
    });
  }, []);

  /**
   * Save an intention (add to saved list)
   */
  const save = useCallback((id: string) => {
    setSavedIds((prev) => {
      if (prev.includes(id)) {
        return prev;
      }
      return [...prev, id];
    });
  }, []);

  /**
   * Unsave an intention (remove from saved list)
   */
  const unsave = useCallback((id: string) => {
    setSavedIds((prev) => prev.filter((savedId) => savedId !== id));
  }, []);

  /**
   * Clear all saved intentions
   */
  const clearAll = useCallback(() => {
    setSavedIds([]);
  }, []);

  return {
    savedIds,
    isSaved,
    toggleSave,
    save,
    unsave,
    clearAll,
    isLoaded,
  };
}
