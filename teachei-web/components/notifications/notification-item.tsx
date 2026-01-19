"use client";

import { DollarSign, MessageSquare, Clock, Bell, type LucideIcon } from "lucide-react";
import { cn, formatRelativeTime } from "@/lib/utils";

// Notification types that can be extended
export type NotificationType = "offer" | "payment" | "expiring" | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  href?: string;
}

// Icon mapping for notification types
const notificationIcons: Record<NotificationType, LucideIcon> = {
  offer: MessageSquare,
  payment: DollarSign,
  expiring: Clock,
  system: Bell,
};

// Color mapping for notification types
const notificationColors: Record<NotificationType, string> = {
  offer: "bg-blue-500/10 text-blue-500",
  payment: "bg-green-500/10 text-green-500",
  expiring: "bg-orange-500/10 text-orange-500",
  system: "bg-primary/10 text-primary",
};

interface NotificationItemProps {
  notification: Notification;
  onClick?: (notification: Notification) => void;
}

export function NotificationItem({ notification, onClick }: NotificationItemProps) {
  const Icon = notificationIcons[notification.type];
  const iconColor = notificationColors[notification.type];

  return (
    <button
      onClick={() => onClick?.(notification)}
      className={cn(
        "w-full flex items-start gap-3 p-3 text-left hover:bg-muted/10 transition-colors",
        !notification.read && "bg-primary/5"
      )}
    >
      {/* Icon */}
      <div className={cn("p-2 rounded-full shrink-0", iconColor)}>
        <Icon size={16} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={cn(
            "text-sm line-clamp-1",
            notification.read ? "text-foreground" : "font-semibold text-foreground"
          )}>
            {notification.title}
          </p>
          {!notification.read && (
            <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />
          )}
        </div>
        <p className="text-xs text-muted line-clamp-2 mt-0.5">
          {notification.description}
        </p>
        <p className="text-xs text-muted mt-1">
          {formatRelativeTime(notification.timestamp)}
        </p>
      </div>
    </button>
  );
}
