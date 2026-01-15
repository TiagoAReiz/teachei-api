import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/use-color-scheme";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Busque por modelos específicos...",
  onSubmit,
}: SearchBarProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View
      className="
        flex-row items-center
        h-12 rounded-full
        bg-white dark:bg-surface-dark
        shadow-sm border border-slate-200 dark:border-slate-700
      "
    >
      <View className="h-full w-12 items-center justify-center">
        <MaterialIcons
          name="search"
          size={22}
          color={isDark ? "#94a3b8" : "#94a3b8"}
        />
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
        className="
          flex-1 h-full pr-4
          text-sm font-display
          text-slate-700 dark:text-slate-200
        "
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChangeText("")}
          className="pr-4"
        >
          <MaterialIcons
            name="close"
            size={20}
            color={isDark ? "#64748b" : "#94a3b8"}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}



