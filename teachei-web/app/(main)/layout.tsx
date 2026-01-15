import { type ReactNode } from "react";
import { MainLayout } from "@/components/layout";

export default function MainAppLayout({ children }: { children: ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}



