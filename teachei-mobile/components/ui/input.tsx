import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, TextInputProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/use-color-scheme";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  rightIcon?: keyof typeof MaterialIcons.glyphMap;
  onRightIconPress?: () => void;
}

export function Input({
  label,
  error,
  icon,
  rightIcon,
  onRightIconPress,
  secureTextEntry,
  className,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const isPassword = secureTextEntry !== undefined;

  return (
    <View className="w-full">
      {label && (
        <Text className="text-sm font-display-medium text-slate-700 dark:text-slate-300 mb-2">
          {label}
        </Text>
      )}
      <View
        className={`
          flex-row items-center
          h-[52px] rounded-full
          bg-surface-light dark:bg-surface-dark
          border ${isFocused ? "border-primary" : error ? "border-red-500" : "border-slate-200 dark:border-slate-700"}
          ${isFocused ? "ring-2 ring-primary/20" : ""}
        `}
      >
        {icon && (
          <View className="pl-4">
            <MaterialIcons
              name={icon}
              size={20}
              color={isFocused ? "#137fec" : isDark ? "#94a3b8" : "#94a3b8"}
            />
          </View>
        )}
        <TextInput
          className={`
            flex-1 h-full
            ${icon ? "pl-3" : "pl-4"}
            ${rightIcon || isPassword ? "pr-3" : "pr-4"}
            text-base font-display
            text-slate-900 dark:text-white
          `}
          placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="pr-4"
          >
            <MaterialIcons
              name={showPassword ? "visibility-off" : "visibility"}
              size={20}
              color={isDark ? "#64748b" : "#94a3b8"}
            />
          </TouchableOpacity>
        )}
        {rightIcon && !isPassword && (
          <TouchableOpacity onPress={onRightIconPress} className="pr-4">
            <MaterialIcons
              name={rightIcon}
              size={20}
              color={isDark ? "#64748b" : "#94a3b8"}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text className="text-sm text-red-500 mt-1 ml-4">{error}</Text>
      )}
    </View>
  );
}



