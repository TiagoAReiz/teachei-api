"use client";

import { useState, useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FilterPanel } from "./filter-panel";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

// Pages that should show the filter sidebar
const FILTER_PAGES = ["/", "/feed"];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Load collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved !== null) {
      setIsCollapsed(saved === "true");
    }
  }, []);

  // Save collapsed state to localStorage
  const handleToggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", String(newState));
  };

  // Only show filter sidebar on filter-enabled pages
  const showFilters = FILTER_PAGES.some(
    (page) => pathname === page || (page !== "/" && pathname.startsWith(page))
  );

  if (!showFilters) {
    return null;
  }

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - Desktop */}
      <aside
        className={cn(
          "fixed top-16 left-0 h-[calc(100vh-4rem)] z-50 transition-all duration-300 lg:z-30",
          "hidden lg:block",
          isCollapsed ? "w-12" : "w-72"
        )}
      >
        <Suspense fallback={<div className="w-72 h-full bg-surface animate-pulse" />}>
          <FilterPanel 
            isCollapsed={isCollapsed} 
            onToggleCollapse={handleToggleCollapse}
            className="h-full"
          />
        </Suspense>
      </aside>

      {/* Sidebar - Mobile (Drawer) */}
      <aside
        className={cn(
          "fixed top-16 left-0 h-[calc(100vh-4rem)] z-50 transition-transform duration-300 lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Suspense fallback={<div className="w-72 h-full bg-surface animate-pulse" />}>
          <FilterPanel 
            isCollapsed={false} 
            onToggleCollapse={() => onClose?.()}
            className="h-full"
          />
        </Suspense>
      </aside>
    </>
  );
}



