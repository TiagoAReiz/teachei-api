"use client";

import { useEffect, useState } from "react";
import { LandingPage } from "@/components/landing/landing-page";
import { MainLayout } from "@/components/layout";
import { getToken } from "@/lib/api";

// Dynamically import HomePage to avoid SSR issues
import dynamic from "next/dynamic";
const HomePage = dynamic(() => import("./(main)/page"), { ssr: false });

export default function RootPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has a token
    const token = getToken();
    setIsAuthenticated(!!token);
  }, []);

  // Show nothing while checking auth state
  if (isAuthenticated === null) {
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
        <HomePage />
      </MainLayout>
    );
  }

  return <LandingPage />;
}
