import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  rightIcon?: keyof typeof MaterialIcons.glyphMap;
  onRightPress?: () => void;
  transparent?: boolean;
}

export function Header({
  title,
  showBack = true,
  rightIcon,
  onRightPress,
  transparent = false,
}: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={`
        flex-row items-center justify-between
        px-4 pb-2
        ${transparent ? "bg-transparent" : "bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md"}
      `}
      style={{ paddingTop: insets.top + 8 }}
    >
      {showBack ? (
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-12 w-12 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800"
        >
          <MaterialIcons name="arrow-back" size={24} color="#1e293b" />
        </TouchableOpacity>
      ) : (
        <View className="w-12" />
      )}
      <Text className="flex-1 text-center text-lg font-display-bold text-slate-900 dark:text-white">
        {title}
      </Text>
      {rightIcon ? (
        <TouchableOpacity
          onPress={onRightPress}
          className="h-12 w-12 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800"
        >
          <MaterialIcons name={rightIcon} size={24} color="#1e293b" />
        </TouchableOpacity>
      ) : (
        <View className="w-12" />
      )}
    </View>
  );
}



