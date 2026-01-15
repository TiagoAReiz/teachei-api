import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: keyof typeof MaterialIcons.glyphMap;
  variant?: "default" | "filter";
  size?: "sm" | "md";
  count?: number;
}

export function Chip({
  label,
  selected = false,
  onPress,
  icon,
  variant = "default",
  size = "md",
  count,
}: ChipProps) {
  const isFilter = variant === "filter";
  
  const sizeStyles = {
    sm: "h-8 px-3",
    md: "h-10 px-4",
  };

  const textSizeStyles = {
    sm: "text-xs",
    md: "text-sm",
  };

  if (isFilter) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        className={`
          flex-row items-center justify-center gap-2
          ${sizeStyles[size]} rounded-full
          ${
            selected
              ? "bg-primary shadow-lg shadow-primary/25"
              : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700"
          }
          active:scale-95
        `}
      >
        {icon && (
          <MaterialIcons
            name={icon}
            size={size === "sm" ? 16 : 18}
            color={selected ? "white" : "#64748b"}
          />
        )}
        <Text
          className={`
            font-display-semibold
            ${textSizeStyles[size]}
            ${selected ? "text-white" : "text-slate-600 dark:text-slate-300"}
          `}
        >
          {label}
        </Text>
        {count !== undefined && (
          <View
            className={`
              flex items-center justify-center
              h-5 min-w-[20px] px-1 rounded-full
              ${selected ? "bg-white/20" : "bg-slate-100 dark:bg-slate-600"}
            `}
          >
            <Text
              className={`
                text-xs font-display-bold
                ${selected ? "text-white" : "text-slate-600 dark:text-slate-300"}
              `}
            >
              {count}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  // Default variant - display chip (non-interactive)
  return (
    <View
      className={`
        flex-row items-center px-3 py-1.5 rounded-full
        bg-slate-100 dark:bg-slate-700
      `}
    >
      <Text className="text-xs font-display-medium text-slate-600 dark:text-slate-300">
        {label}
      </Text>
    </View>
  );
}



