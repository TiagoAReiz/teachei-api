import React from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

export default function ChatScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 bg-background-light dark:bg-background-dark"
      style={{ paddingTop: insets.top }}
    >
      {/* Header */}
      <View className="px-6 py-4">
        <Text className="text-xl font-display-bold text-slate-900 dark:text-white">
          Chat
        </Text>
      </View>

      {/* Coming Soon State */}
      <View className="flex-1 items-center justify-center px-8">
        <View className="h-24 w-24 rounded-full bg-primary/10 items-center justify-center mb-6">
          <MaterialIcons name="chat-bubble-outline" size={48} color="#137fec" />
        </View>
        <Text className="text-xl font-display-bold text-slate-900 dark:text-white text-center mb-2">
          Em breve!
        </Text>
        <Text className="text-slate-500 dark:text-slate-400 text-base font-display text-center leading-relaxed">
          O chat em tempo real está chegando. Em breve você poderá conversar diretamente com compradores e vendedores.
        </Text>
        <View className="mt-6 px-4 py-2 bg-primary/10 rounded-full">
          <Text className="text-primary font-display-semibold text-sm">
            🚀 Lançamento em 2024
          </Text>
        </View>
      </View>
    </View>
  );
}



