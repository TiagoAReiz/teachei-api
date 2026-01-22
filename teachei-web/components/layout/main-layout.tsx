"use client";

import { useState, useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { MobileNav } from "./mobile-nav";
import { AuthGuard } from "@/components/auth";
import { cn } from "@/lib/utils";

// Routes that don't require authentication
const PUBLIC_ROUTES = [
  "/",           // Main feed
  "/feed",       // Feed page
  "/intention",  // Public intention view
  "/user",       // Public user profiles
  "/termos",     // Terms of service
  "/privacidade" // Privacy policy
];

// Pages that should show the filter sidebar
const FILTER_PAGES = ["/", "/feed"];

interface MainLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
  className?: string;
}

export function MainLayout({ children, showSidebar = true, className }: MainLayoutProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Load collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved !== null) {
      setIsSidebarCollapsed(saved === "true");
    }
    
    // Listen for changes to localStorage
    const handleStorage = () => {
      const saved = localStorage.getItem("sidebar-collapsed");
      if (saved !== null) {
        setIsSidebarCollapsed(saved === "true");
      }
    };
    
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Check if current page should show filter sidebar
  const showFilters = FILTER_PAGES.some(
    (page) => pathname === page || (page !== "/" && pathname.startsWith(page))
  );

  // Calculate sidebar width for margin
  const sidebarWidth = showSidebar && showFilters 
    ? (isSidebarCollapsed ? "lg:ml-12" : "lg:ml-72") 
    : "";

  return (
    <AuthGuard publicRoutes={PUBLIC_ROUTES}>
      <div className="min-h-screen bg-background">
        <Header
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
        
        {showSidebar && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}
        
        <main
          className={cn(
            "min-h-[calc(100vh-4rem)] pb-20 lg:pb-0 transition-all duration-300",
            sidebarWidth,
            className
          )}
        >
          {children}
        </main>
        
        <MobileNav />
      </div>
    </AuthGuard>
  );
}



