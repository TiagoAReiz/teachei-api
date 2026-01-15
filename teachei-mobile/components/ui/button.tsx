import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  TouchableOpacityProps,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "whatsapp" | "warning";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: keyof typeof MaterialIcons.glyphMap;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary active:bg-primary-dark shadow-lg shadow-primary/30",
  secondary: "bg-slate-100 dark:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600",
  outline: "bg-transparent border-2 border-slate-200 dark:border-slate-700 active:bg-slate-100 dark:active:bg-slate-800",
  ghost: "bg-transparent active:bg-slate-100 dark:active:bg-slate-800",
  whatsapp: "bg-whatsapp active:bg-green-600 shadow-lg shadow-whatsapp/30",
  warning: "bg-amber-500 active:bg-amber-600 shadow-lg shadow-amber-500/20",
};

const variantTextStyles: Record<ButtonVariant, string> = {
  primary: "text-white",
  secondary: "text-slate-900 dark:text-white",
  outline: "text-slate-900 dark:text-white",
  ghost: "text-slate-900 dark:text-white",
  whatsapp: "text-white",
  warning: "text-white",
};

const sizeStyles: Record<ButtonSize, { container: string; text: string; icon: number }> = {
  sm: { container: "h-9 px-4", text: "text-sm", icon: 18 },
  md: { container: "h-12 px-6", text: "text-base", icon: 20 },
  lg: { container: "h-14 px-8", text: "text-lg", icon: 24 },
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconPosition = "left",
  children,
  fullWidth = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      className={`
        flex-row items-center justify-center rounded-full
        ${variantStyles[variant]}
        ${sizeStyles[size].container}
        ${fullWidth ? "w-full" : ""}
        ${isDisabled ? "opacity-50" : ""}
        active:scale-[0.98]
        ${className || ""}
      `}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" || variant === "whatsapp" || variant === "warning" ? "white" : "#137fec"}
          size="small"
        />
      ) : (
        <View className="flex-row items-center gap-2">
          {icon && iconPosition === "left" && (
            <MaterialIcons
              name={icon}
              size={sizeStyles[size].icon}
              color={variant === "primary" || variant === "whatsapp" || variant === "warning" ? "white" : "#1e293b"}
            />
          )}
          <Text
            className={`
              font-display-bold
              ${sizeStyles[size].text}
              ${variantTextStyles[variant]}
            `}
          >
            {children}
          </Text>
          {icon && iconPosition === "right" && (
            <MaterialIcons
              name={icon}
              size={sizeStyles[size].icon}
              color={variant === "primary" || variant === "whatsapp" || variant === "warning" ? "white" : "#1e293b"}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}



