import React from "react";
import { View, Image, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface AvatarProps {
  source?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  verified?: boolean;
}

const sizeStyles = {
  sm: { container: "h-8 w-8", text: "text-xs", badge: 12, badgeContainer: "h-4 w-4" },
  md: { container: "h-10 w-10", text: "text-sm", badge: 14, badgeContainer: "h-5 w-5" },
  lg: { container: "h-14 w-14", text: "text-base", badge: 16, badgeContainer: "h-6 w-6" },
  xl: { container: "h-32 w-32", text: "text-2xl", badge: 20, badgeContainer: "h-8 w-8" },
};

function getInitials(name: string): string {
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

export function Avatar({ source, name, size = "md", verified = false }: AvatarProps) {
  const styles = sizeStyles[size];
  const hasImage = !!source;

  return (
    <View className="relative">
      {hasImage ? (
        <Image
          source={{ uri: source }}
          className={`
            ${styles.container}
            rounded-full bg-slate-200 dark:bg-slate-600
            border-2 border-white dark:border-slate-800
          `}
        />
      ) : (
        <View
          className={`
            ${styles.container}
            rounded-full bg-primary/10
            items-center justify-center
            border-2 border-white dark:border-slate-800
          `}
        >
          <Text className={`${styles.text} font-display-bold text-primary`}>
            {name ? getInitials(name) : "?"}
          </Text>
        </View>
      )}
      {verified && (
        <View
          className={`
            absolute -bottom-0.5 -right-0.5
            ${styles.badgeContainer}
            rounded-full bg-primary
            items-center justify-center
            border-2 border-white dark:border-slate-800
          `}
        >
          <MaterialIcons name="verified" size={styles.badge - 4} color="white" />
        </View>
      )}
    </View>
  );
}



