import React from "react";
import { View, ViewProps, TouchableOpacity } from "react-native";

interface CardProps extends ViewProps {
  variant?: "default" | "elevated" | "outlined";
  pressable?: boolean;
  onPress?: () => void;
}

export function Card({
  variant = "default",
  pressable = false,
  onPress,
  children,
  className,
  ...props
}: CardProps) {
  const variantStyles = {
    default: "bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-800",
    elevated: "bg-surface-light dark:bg-surface-dark shadow-soft border border-slate-100 dark:border-slate-800",
    outlined: "bg-transparent border-2 border-slate-200 dark:border-slate-700",
  };

  const containerClass = `
    rounded-[2rem] p-5
    ${variantStyles[variant]}
    ${className || ""}
  `;

  if (pressable && onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        className={`${containerClass} active:scale-[0.99]`}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View className={containerClass} {...props}>
      {children}
    </View>
  );
}



