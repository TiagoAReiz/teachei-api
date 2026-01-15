import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import { UserRole } from "@/types";

interface RoleOption {
  role: UserRole;
  icon: keyof typeof MaterialIcons.glyphMap;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    role: "BUYER",
    icon: "shopping-bag",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "#137fec",
    title: "Comprador Ocasional",
    description: "Estou procurando um veículo pessoal.",
  },
  {
    role: "SELLER",
    icon: "storefront",
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "#9333ea",
    title: "Lojista / Revendedor",
    description: "Compro e vendo veículos profissionalmente.",
  },
];

export default function RoleSelectScreen() {
  const insets = useSafeAreaInsets();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const { setRole } = useAuthStore();

  const handleContinue = async () => {
    if (selectedRole) {
      await setRole(selectedRole);
      router.replace("/(tabs)");
    }
  };

  return (
    <View
      className="flex-1 bg-background-light dark:bg-background-dark"
      style={{ paddingBottom: insets.bottom }}
    >
      {/* Drag Handle */}
      <View className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mt-3 mb-6" />

      {/* Content */}
      <View className="flex-1 px-6">
        <Text className="text-xl font-display-bold text-slate-900 dark:text-white text-center mb-2">
          Como você vai usar o TeAchei?
        </Text>
        <Text className="text-slate-500 text-center text-sm mb-6 px-4">
          Isso nos ajuda a personalizar sua experiência.
        </Text>

        {/* Options */}
        <View className="gap-4">
          {ROLE_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.role}
              onPress={() => setSelectedRole(option.role)}
              activeOpacity={0.8}
              className={`
                flex-row items-center p-4 rounded-2xl
                border-2 
                ${
                  selectedRole === option.role
                    ? "border-primary bg-primary/5"
                    : "border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50"
                }
              `}
            >
              <View
                className={`
                  h-12 w-12 rounded-full items-center justify-center mr-4
                  ${option.iconBg}
                `}
              >
                <MaterialIcons
                  name={option.icon}
                  size={24}
                  color={option.iconColor}
                />
              </View>
              <View className="flex-1">
                <Text className="font-display-bold text-slate-900 dark:text-white">
                  {option.title}
                </Text>
                <Text className="text-xs text-slate-500 mt-1">
                  {option.description}
                </Text>
              </View>
              <View
                className={`
                  h-6 w-6 rounded-full border-2 items-center justify-center
                  ${
                    selectedRole === option.role
                      ? "border-primary bg-primary"
                      : "border-slate-300 dark:border-slate-600"
                  }
                `}
              >
                {selectedRole === option.role && (
                  <MaterialIcons name="check" size={14} color="white" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Continue Button */}
        <View className="mt-6">
          <Button
            onPress={handleContinue}
            disabled={!selectedRole}
            fullWidth
            size="lg"
          >
            Continuar
          </Button>
        </View>
      </View>
    </View>
  );
}



