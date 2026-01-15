import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface FABProps {
  onPress: () => void;
  label?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  variant?: "primary" | "dark";
}

export function FAB({ onPress, label, icon = "add", variant = "primary" }: FABProps) {
  const isExpanded = !!label;
  
  const variantStyles = {
    primary: "bg-primary shadow-primary/40",
    dark: "bg-slate-900 dark:bg-white shadow-slate-900/20 dark:shadow-white/20",
  };

  const iconColor = variant === "primary" ? "white" : variant === "dark" ? "white" : "#1e293b";
  const darkIconColor = variant === "dark" ? "#1e293b" : iconColor;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className={`
        flex-row items-center justify-center
        ${isExpanded ? "h-14 pl-5 pr-6 rounded-full" : "h-14 w-14 rounded-full"}
        ${variantStyles[variant]}
        shadow-xl
        active:scale-95
      `}
    >
      <MaterialIcons
        name={icon}
        size={24}
        color={variant === "dark" ? "#1e293b" : "white"}
        style={{ color: variant === "dark" ? "#1e293b" : "white" }}
      />
      {label && (
        <Text
          className={`
            ml-2 font-display-bold text-base
            ${variant === "dark" ? "text-slate-900 dark:text-slate-900" : "text-white"}
          `}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}



