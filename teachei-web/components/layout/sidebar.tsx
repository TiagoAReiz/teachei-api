"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bookmark, User, Settings, Car, Bike, Truck, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { href: "/", label: "Feed", icon: Home },
  { href: "/favorites", label: "Salvos", icon: Bookmark },
  { href: "/profile", label: "Perfil", icon: User },
];

const vehicleFilters = [
  { type: "CARRO", label: "Carros", icon: Car },
  { type: "MOTO", label: "Motos", icon: Bike },
  { type: "CAMINHAO", label: "Caminhões", icon: Truck },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-surface border-r border-border z-50 transition-transform duration-300 lg:translate-x-0 lg:z-30",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-4">
          {/* Main Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-foreground hover:bg-muted/10"
                  )}
                >
                  <Icon size={22} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Create CTA */}
          {isAuthenticated && (
            <Link href="/create" onClick={onClose} className="mt-4">
              <Button className="w-full">
                <Plus size={20} />
                Nova Intenção
              </Button>
            </Link>
          )}

          {/* Vehicle Type Filters */}
          <div className="mt-8">
            <h3 className="px-4 text-xs font-semibold text-muted uppercase tracking-wider mb-3">
              Filtrar por Tipo
            </h3>
            <div className="space-y-1">
              {vehicleFilters.map((filter) => {
                const Icon = filter.icon;
                const href = `/?tipo=${filter.type}`;
                const isActive = pathname === "/" && new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '').get('tipo') === filter.type;
                
                return (
                  <Link
                    key={filter.type}
                    href={href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted hover:text-foreground hover:bg-muted/10"
                    )}
                  >
                    <Icon size={18} />
                    <span>{filter.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Settings Link */}
          <div className="mt-auto pt-4 border-t border-border">
            <Link
              href="/settings"
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors",
                pathname === "/settings"
                  ? "bg-primary text-white"
                  : "text-foreground hover:bg-muted/10"
              )}
            >
              <Settings size={22} />
              <span>Configurações</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}



