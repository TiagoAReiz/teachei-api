import React from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 bg-background-light dark:bg-background-dark"
      style={{ paddingTop: insets.top }}
    >
      {/* Header */}
      <View className="px-6 py-4">
        <Text className="text-xl font-display-bold text-slate-900 dark:text-white">
          Salvos
        </Text>
      </View>

      {/* Empty State */}
      <View className="flex-1 items-center justify-center px-8">
        <View className="h-24 w-24 rounded-full bg-slate-100 dark:bg-slate-800 items-center justify-center mb-6">
          <MaterialIcons name="favorite-border" size={48} color="#94a3b8" />
        </View>
        <Text className="text-xl font-display-bold text-slate-900 dark:text-white text-center mb-2">
          Nenhum item salvo
        </Text>
        <Text className="text-slate-500 dark:text-slate-400 text-base font-display text-center leading-relaxed">
          Quando você salvar intenções de compra, elas aparecerão aqui para fácil acesso.
        </Text>
      </View>
    </View>
  );
}



