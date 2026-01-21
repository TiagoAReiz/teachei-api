"use client";

import { useState, useEffect } from "react";
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
  
  // Debounce search query by 200ms
  const debouncedSearch = useDebounce(searchQuery, 200);

  // Trigger search when debounced value changes
  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    
    // Only update if the debounced value is different from current URL
    if (debouncedSearch !== currentSearch) {
      const params = new URLSearchParams(searchParams.toString());
      
      if (debouncedSearch.trim().length >= 2) {
        params.set("search", debouncedSearch.trim());
      } else {
        params.delete("search");
      }
      
      // Navigate to update URL with new search params
      const queryString = params.toString();
      router.push(queryString ? `/?${queryString}` : "/");
    }
  }, [debouncedSearch, searchParams, router]);

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
          placeholder="Buscar veículos..."
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
          placeholder="Buscar veículos..."
          className="w-full bg-background border-0 ring-1 ring-border text-foreground placeholder:text-muted rounded-full h-10 pl-11 pr-4 text-sm"
          disabled
        />
      </div>
    </div>
  );
}
