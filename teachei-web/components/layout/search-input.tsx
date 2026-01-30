"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";

interface SearchInputProps {
  className?: string;
}

export function SearchInput({ className }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  
  // Track if navigation is in progress to prevent loops
  const isNavigatingRef = useRef(false);
  // Store initial search param for comparison
  const lastSearchRef = useRef(searchParams.get("search") || "");
  
  // Debounce search query by 500ms to prevent excessive API calls
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Sync input with URL when searchParams change externally (e.g., back button)
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    if (urlSearch !== lastSearchRef.current && !isNavigatingRef.current) {
      setSearchQuery(urlSearch);
      lastSearchRef.current = urlSearch;
    }
  }, [searchParams]);

  // Trigger search when debounced value changes
  useEffect(() => {
    // Skip if we're already navigating or if the value hasn't actually changed
    if (isNavigatingRef.current) return;
    
    const trimmedSearch = debouncedSearch.trim();
    const currentSearch = lastSearchRef.current;
    
    // Only update if the debounced value is different from last known value
    if (trimmedSearch === currentSearch) return;
    
    isNavigatingRef.current = true;
    lastSearchRef.current = trimmedSearch;
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (trimmedSearch.length >= 2) {
      params.set("search", trimmedSearch);
    } else {
      params.delete("search");
    }
    
    // Navigate to update URL with new search params
    const queryString = params.toString();
    router.push(queryString ? `/?${queryString}` : "/");
    
    // Reset navigation flag after a short delay
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 100);
  }, [debouncedSearch, router, searchParams]);

  return (
    <div className={className}>
      <div className="relative w-full group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted group-focus-within:text-primary transition-colors">
          <Search size={20} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar por marca ou modelo..."
          className="w-full bg-background border-0 ring-1 ring-border text-foreground placeholder:text-muted rounded-full h-10 pl-11 pr-4 focus:ring-2 focus:ring-primary transition-all text-sm"
        />
      </div>
    </div>
  );
}

// Fallback component for Suspense
export function SearchInputFallback({ className }: SearchInputProps) {
  return (
    <div className={className}>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Buscar por marca ou modelo..."
          className="w-full bg-background border-0 ring-1 ring-border text-foreground placeholder:text-muted rounded-full h-10 pl-11 pr-4 text-sm"
          disabled
        />
      </div>
    </div>
  );
}
