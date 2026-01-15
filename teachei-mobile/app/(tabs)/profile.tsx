import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import { useLogout } from "@/hooks/use-auth";

interface MenuItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress: () => void;
  danger?: boolean;
}

function MenuItem({ icon, label, onPress, danger = false }: MenuItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center py-4 px-4"
      activeOpacity={0.7}
    >
      <View
        className={`
          h-10 w-10 rounded-full items-center justify-center mr-4
          ${danger ? "bg-red-100 dark:bg-red-900/30" : "bg-slate-100 dark:bg-slate-800"}
        `}
      >
        <MaterialIcons
          name={icon}
          size={20}
          color={danger ? "#ef4444" : "#64748b"}
        />
      </View>
      <Text
        className={`
          flex-1 text-base font-display-medium
          ${danger ? "text-red-500" : "text-slate-900 dark:text-white"}
        `}
      >
        {label}
      </Text>
      <MaterialIcons name="chevron-right" size={24} color="#94a3b8" />
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();
  const { mutate: logout } = useLogout();

  return (
    <View
      className="flex-1 bg-background-light dark:bg-background-dark"
      style={{ paddingTop: insets.top }}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-6 py-4 flex-row items-center justify-between">
          <Text className="text-xl font-display-bold text-slate-900 dark:text-white">
            Perfil
          </Text>
          <TouchableOpacity>
            <MaterialIcons name="settings" size={24} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View className="items-center px-6 py-6">
          <Avatar
            source={user?.avatarUrl}
            name={user?.nome}
            size="xl"
            verified={user?.verified}
          />
          <View className="items-center mt-4">
            <View className="flex-row items-center gap-1.5">
              <Text className="text-2xl font-display-bold text-slate-900 dark:text-white">
                {user?.nome || "Usuário"}
              </Text>
              {user?.verified && (
                <MaterialIcons name="verified" size={20} color="#137fec" />
              )}
            </View>
            {user?.cidade && user?.estado && (
              <View className="flex-row items-center gap-1 mt-1">
                <MaterialIcons name="location-on" size={16} color="#64748b" />
                <Text className="text-base text-slate-500 dark:text-slate-400">
                  {user.cidade}, {user.estado}
                </Text>
              </View>
            )}
            <Text className="text-sm text-slate-400 font-display-medium mt-1">
              Membro desde {new Date(user?.createdAt || Date.now()).getFullYear()}
            </Text>
          </View>

          {/* Role Badge */}
          <View className="mt-4 px-4 py-2 bg-primary/10 rounded-full">
            <Text className="text-primary font-display-semibold text-sm">
              {user?.role === "SELLER" ? "🏪 Lojista / Revendedor" : "🛒 Comprador"}
            </Text>
          </View>
        </View>

        {/* Bio */}
        {user?.bio && (
          <View className="px-6 pb-4">
            <Text className="text-slate-700 dark:text-slate-300 text-base text-center leading-relaxed">
              {user.bio}
            </Text>
          </View>
        )}

        {/* Divider */}
        <View className="h-2 bg-slate-100 dark:bg-slate-800/50 my-4" />

        {/* Menu Items */}
        <View className="px-2">
          <MenuItem
            icon="directions-car"
            label="Minhas Intenções"
            onPress={() => router.push("/my-intentions")}
          />
          <MenuItem
            icon="edit"
            label="Editar Perfil"
            onPress={() => {}}
          />
          <MenuItem
            icon="notifications"
            label="Notificações"
            onPress={() => {}}
          />
          <MenuItem
            icon="help"
            label="Ajuda & Suporte"
            onPress={() => {}}
          />
          <MenuItem
            icon="description"
            label="Termos de Serviço"
            onPress={() => {}}
          />
        </View>

        {/* Divider */}
        <View className="h-2 bg-slate-100 dark:bg-slate-800/50 my-4" />

        {/* Logout */}
        <View className="px-2">
          <MenuItem
            icon="logout"
            label="Sair"
            onPress={() => logout()}
            danger
          />
        </View>
      </ScrollView>
    </View>
  );
}



