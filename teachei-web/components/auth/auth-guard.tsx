"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { getToken } from "@/lib/api";

interface AuthGuardProps {
  children: React.ReactNode;
  /** Routes that don't require authentication (e.g., public feed) */
  publicRoutes?: string[];
}

/**
 * Authentication guard component.
 * Redirects to login if user is not authenticated on protected routes.
 */
export function AuthGuard({ children, publicRoutes = [] }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAuth();
  
  // Check if current route is public
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + "/")
  );
  
  // Check if we have a token (quick check before auth query completes)
  const hasToken = typeof window !== "undefined" && !!getToken();

  useEffect(() => {
    // Skip if on public route
    if (isPublicRoute) return;
    
    // Skip if still loading
    if (isLoading) return;
    
    // Redirect to login if not authenticated
    if (!user && !hasToken) {
      router.replace("/login");
    }
  }, [user, isLoading, isPublicRoute, hasToken, router]);

  // Show loading state while checking auth (only for protected routes)
  if (!isPublicRoute && isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted text-sm">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // If not authenticated and not on public route, show nothing (redirect happening)
  if (!isPublicRoute && !user && !hasToken) {
    return null;
  }

  return <>{children}</>;
}
