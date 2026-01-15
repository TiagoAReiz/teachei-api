"use client";

import { useState, type ReactNode } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { MobileNav } from "./mobile-nav";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
  className?: string;
}

export function MainLayout({ children, showSidebar = true, className }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
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
          "min-h-[calc(100vh-4rem)] pb-20 lg:pb-0",
          showSidebar && "lg:ml-64",
          className
        )}
      >
        {children}
      </main>
      
      <MobileNav />
    </div>
  );
}



