import { LandingPage } from "@/components/landing/landing-page";

export default function RootPage() {
  // Show landing page for all users - the landing page handles auth state
  return <LandingPage />;
}
