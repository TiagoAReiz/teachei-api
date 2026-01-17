"use client";

import { useEffect, useState, Suspense } from "react";
import { LandingPage } from "@/components/landing/landing-page";
import { MainLayout } from "@/components/layout";

// Dynamically import HomePage to avoid SSR issues
import dynamic from "next/dynamic";
const HomePage = dynamic(() => import("./(main)/page"), { 
  ssr: false,
  loading: () => <HomeLoading />
});

function HomeLoading() {
  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6">
        <div className="h-8 w-48 bg-muted/20 rounded animate-pulse mb-2" />
        <div className="h-5 w-72 bg-muted/20 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 bg-muted/20 rounded-2xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default function RootPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if user has a token - only on client side
    if (typeof window !== "undefined") {
      // Dynamic import to avoid SSR issues with cookies
      import("@/lib/api").then(({ getToken }) => {
        const token = getToken();
        setIsAuthenticated(!!token);
      });
    }
  }, []);

  // During SSR or before mount, show landing page (default for SEO)
  if (!isMounted || isAuthenticated === null) {
    // Show a brief loading state that won't cause hydration issues
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // Show feed for authenticated users, landing page for guests
  if (isAuthenticated) {
    return (
      <MainLayout>
        <Suspense fallback={<HomeLoading />}>
          <HomePage />
        </Suspense>
      </MainLayout>
    );
  }

  return <LandingPage />;
}
