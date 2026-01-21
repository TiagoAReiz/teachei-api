"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Menu, X, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { NotificationsDropdown } from "@/components/notifications";
import { useAuth } from "@/hooks/use-auth";
import { SearchInput, SearchInputFallback } from "./search-input";

interface HeaderProps {
  onMenuClick?: () => void;
  isSidebarOpen?: boolean;
}

export function Header({ onMenuClick, isSidebarOpen }: HeaderProps) {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center gap-4 h-16 px-4 lg:px-6">
        {/* Menu Button (Mobile) */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-full text-muted hover:text-foreground hover:bg-muted/10 transition-colors"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-primary font-extrabold text-xl tracking-tight">
          <Car size={28} />
          <span className="hidden sm:inline">TeAchei</span>
        </Link>

        {/* Search Bar (Desktop) */}
        <Suspense fallback={<SearchInputFallback className="hidden md:flex flex-1 max-w-md mx-4" />}>
          <SearchInput className="hidden md:flex flex-1 max-w-md mx-4" />
        </Suspense>

        {/* Right Actions */}
        <div className="flex items-center gap-2 ml-auto">
          {isAuthenticated ? (
            <>
              {/* Create Button */}
              <Button
                size="sm"
                onClick={() => router.push("/create")}
                className="hidden sm:flex"
              >
                <Plus size={18} />
                <span>Nova Intenção</span>
              </Button>
              <Button
                size="icon"
                variant="primary"
                onClick={() => router.push("/create")}
                className="sm:hidden h-9 w-9"
              >
                <Plus size={18} />
              </Button>

              {/* Notifications */}
              <NotificationsDropdown
                notifications={[]}
                onNotificationClick={(notification) => {
                  if (notification.href) {
                    router.push(notification.href);
                  }
                }}
              />

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-muted/10 transition-colors"
                >
                  <Avatar src={user?.avatarUrl} fallback={user?.nome} size="sm" />
                </button>

                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-surface rounded-xl shadow-lg border border-border z-50 py-2 animate-scale-in origin-top-right">
                      <div className="px-4 py-2 border-b border-border">
                        <p className="font-semibold text-foreground truncate">{user?.nome}</p>
                        <p className="text-sm text-muted truncate">{user?.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm hover:bg-muted/10 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Meu Perfil
                      </Link>
                      <Link
                        href="/my-intentions"
                        className="block px-4 py-2 text-sm hover:bg-muted/10 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Minhas Intenções
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-sm hover:bg-muted/10 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Configurações
                      </Link>
                      <hr className="my-2 border-border" />
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors"
                      >
                        Sair
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => router.push("/login")}>
                Entrar
              </Button>
              <Button size="sm" onClick={() => router.push("/register")}>
                Criar Conta
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <Suspense fallback={<SearchInputFallback className="md:hidden px-4 pb-3" />}>
        <SearchInput className="md:hidden px-4 pb-3" />
      </Suspense>
    </header>
  );
}
