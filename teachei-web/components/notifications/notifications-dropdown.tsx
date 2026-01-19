"use client";

import { useState } from "react";
import { Bell, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { NotificationItem, type Notification } from "./notification-item";

interface NotificationsDropdownProps {
  notifications?: Notification[];
  onNotificationClick?: (notification: Notification) => void;
  onMarkAllRead?: () => void;
}

export function NotificationsDropdown({
  notifications = [],
  onNotificationClick,
  onMarkAllRead,
}: NotificationsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const hasNotifications = notifications.length > 0;

  const handleNotificationClick = (notification: Notification) => {
    onNotificationClick?.(notification);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full text-muted hover:text-foreground hover:bg-muted/10 transition-colors relative"
      >
        <Bell size={22} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 h-2 w-2 bg-error rounded-full" />
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Content */}
          <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-surface rounded-xl shadow-lg border border-border z-50 animate-scale-in origin-top-right overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h3 className="font-semibold text-foreground">Notificações</h3>
              {hasNotifications && unreadCount > 0 && (
                <button
                  onClick={onMarkAllRead}
                  className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  <Check size={14} />
                  <span>Marcar como lidas</span>
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-[400px] overflow-y-auto">
              {hasNotifications ? (
                <div className="divide-y divide-border">
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onClick={handleNotificationClick}
                    />
                  ))}
                </div>
              ) : (
                // Empty State
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <div className="w-16 h-16 bg-muted/10 rounded-full flex items-center justify-center mb-4">
                    <Bell className="text-muted" size={28} />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    Nenhuma notificação
                  </p>
                  <p className="text-xs text-muted text-center">
                    Você receberá notificações sobre ofertas, pagamentos e atualizações aqui.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
