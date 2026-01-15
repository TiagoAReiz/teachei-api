import React from "react";
import { View, Text } from "react-native";

type BadgeVariant = "active" | "pending" | "finished" | "info" | "success" | "warning" | "error";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: "sm" | "md";
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
  active: {
    bg: "bg-primary/10 dark:bg-primary/20",
    text: "text-primary dark:text-blue-400",
  },
  pending: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-400",
  },
  finished: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-700 dark:text-green-400",
  },
  info: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-700 dark:text-blue-400",
  },
  success: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-700 dark:text-green-400",
  },
  warning: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-400",
  },
  error: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-700 dark:text-red-400",
  },
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-xs",
};

export function Badge({ label, variant = "info", size = "md" }: BadgeProps) {
  const styles = variantStyles[variant];

  return (
    <View className={`rounded-full ${styles.bg} ${sizeStyles[size]}`}>
      <Text className={`font-display-bold uppercase tracking-wider ${styles.text}`}>
        {label}
      </Text>
    </View>
  );
}



