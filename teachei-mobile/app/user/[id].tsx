import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Linking } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Anuncio } from "@/types";
import { formatPriceRange } from "@/utils/format";

// Mock data
const MOCK_USER: User = {
  id: "u1",
  email: "alex@email.com",
  nome: "Alex Rivera",
  role: "BUYER",
  telefone: "11999999999",
  cidade: "Austin",
  estado: "Texas",
  bio: "Enthusiast collector looking for reliable vintage trucks and weekend bikes. Serious buyer, quick responses.",
  instagramUrl: "https://instagram.com/alexrivera",
  facebookUrl: "https://facebook.com/alexrivera",
  verified: true,
  createdAt: "2021-01-01",
};

const MOCK_OTHER_INTENTIONS: Anuncio[] = [
  {
    id: "o1",
    usuarioId: "u1",
    veiculoInfo: { tipoVeiculo: "CAMINHAO", marca: "Ford", modelo: "F-150" },
    anoMinimo: 2018,
    precoMaximo: 35000,
    cores: [],
    status: "ATIVO",
    visualizacoes: 10,
    propostas: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "o2",
    usuarioId: "u1",
    veiculoInfo: { tipoVeiculo: "MOTO", marca: "Harley", modelo: "Iron 883" },
    precoMaximo: 8000,
    cores: [],
    status: "ATIVO",
    visualizacoes: 5,
    propostas: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

interface SocialButtonProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress: () => void;
}

function SocialButton({ icon, label, onPress }: SocialButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="items-center gap-2 w-20"
      activeOpacity={0.8}
    >
      <View className="rounded-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-3 shadow-sm">
        <MaterialIcons name={icon} size={24} color="#1e293b" />
      </View>
      <Text className="text-xs font-display-semibold text-slate-900 dark:text-white">
        {label}
      </Text>
    </TouchableOpacity>
  );
}

interface WishlistItemProps {
  intention: Anuncio;
  onPress: () => void;
}

function WishlistItem({ intention, onPress }: WishlistItemProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card variant="elevated" className="flex-row items-center gap-4">
        <View className="h-24 w-24 rounded-lg bg-slate-100 dark:bg-slate-700 items-center justify-center">
          <MaterialIcons
            name={
              intention.veiculoInfo.tipoVeiculo === "MOTO"
                ? "two-wheeler"
                : intention.veiculoInfo.tipoVeiculo === "CAMINHAO"
                ? "local-shipping"
                : "directions-car"
            }
            size={32}
            color="#94a3b8"
          />
        </View>
        <View className="flex-1 gap-1">
          <Text className="text-base font-display-bold text-slate-900 dark:text-white leading-tight">
            {intention.anoMinimo ? `${intention.anoMinimo} ` : ""}
            {intention.veiculoInfo.marca} {intention.veiculoInfo.modelo}
          </Text>
          <View className="flex-row items-center gap-2 mt-0.5">
            <Badge label="Ativo" variant="active" size="sm" />
            <Text className="text-xs text-slate-500 dark:text-slate-400 capitalize">
              {intention.veiculoInfo.tipoVeiculo.toLowerCase()}
            </Text>
          </View>
          <View className="flex-row items-center mt-2">
            <MaterialIcons name="payments" size={16} color="#94a3b8" />
            <Text className="text-sm font-display-medium text-slate-700 dark:text-slate-300 ml-1">
              Budget: {formatPriceRange(intention.precoMinimo, intention.precoMaximo)}
            </Text>
          </View>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#cbd5e1" />
      </Card>
    </TouchableOpacity>
  );
}

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();

  // Use mock data
  const user = MOCK_USER;
  const otherIntentions = MOCK_OTHER_INTENTIONS;

  const handleContact = () => {
    // Open contact options
  };

  const handleInstagram = () => {
    if (user.instagramUrl) {
      Linking.openURL(user.instagramUrl);
    }
  };

  const handleFacebook = () => {
    if (user.facebookUrl) {
      Linking.openURL(user.facebookUrl);
    }
  };

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark">
      {/* Header */}
      <View
        className="flex-row items-center bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm p-4 pb-2 justify-between"
        style={{ paddingTop: insets.top + 8 }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-12 w-12 items-center justify-center rounded-full"
        >
          <MaterialIcons name="arrow-back" size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-display-bold text-slate-900 dark:text-white">
          Perfil
        </Text>
        <TouchableOpacity className="h-12 w-12 items-center justify-center rounded-full">
          <MaterialIcons name="share" size={24} color="#1e293b" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View className="items-center p-4 mt-2">
          <Avatar
            source={user.avatarUrl}
            name={user.nome}
            size="xl"
            verified={user.verified}
          />
          <View className="items-center mt-4">
            <View className="flex-row items-center gap-1.5">
              <Text className="text-2xl font-display-bold text-slate-900 dark:text-white text-center">
                {user.nome}
              </Text>
              {user.verified && (
                <MaterialIcons name="verified" size={20} color="#137fec" />
              )}
            </View>
            {user.cidade && user.estado && (
              <View className="flex-row items-center gap-1 mt-1">
                <MaterialIcons name="location-on" size={16} color="#64748b" />
                <Text className="text-base text-slate-500 dark:text-slate-400 text-center">
                  {user.cidade}, {user.estado}
                </Text>
              </View>
            )}
            <Text className="text-sm text-slate-400 font-display-medium text-center mt-1">
              Membro desde {new Date(user.createdAt).getFullYear()}
            </Text>
          </View>
        </View>

        {/* Bio */}
        {user.bio && (
          <View className="px-6 pb-3 pt-1">
            <Text className="text-slate-700 dark:text-slate-300 text-base leading-relaxed text-center">
              {user.bio}
            </Text>
          </View>
        )}

        {/* Social Actions */}
        <View className="flex-row justify-center gap-6 px-4 mt-4">
          {user.instagramUrl && (
            <SocialButton
              icon="camera-alt"
              label="Instagram"
              onPress={handleInstagram}
            />
          )}
          {user.facebookUrl && (
            <SocialButton
              icon="public"
              label="Facebook"
              onPress={handleFacebook}
            />
          )}
        </View>

        {/* Divider */}
        <View className="h-px bg-slate-200 dark:bg-slate-800 w-[90%] mx-auto my-8" />

        {/* Other Intentions */}
        <View className="px-4">
          <View className="flex-row items-center justify-between pb-4">
            <Text className="text-xl font-display-bold text-slate-900 dark:text-white">
              Também procura...
            </Text>
            <TouchableOpacity>
              <Text className="text-sm font-display-semibold text-primary">
                Ver todos
              </Text>
            </TouchableOpacity>
          </View>

          <View className="gap-4">
            {otherIntentions.map((intention) => (
              <WishlistItem
                key={intention.id}
                intention={intention}
                onPress={() => router.push(`/intention/${intention.id}`)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Action */}
      <View
        className="absolute bottom-0 left-0 right-0 p-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <Button onPress={handleContact} fullWidth size="lg" icon="chat-bubble">
          Contatar Usuário
        </Button>
      </View>
    </View>
  );
}



