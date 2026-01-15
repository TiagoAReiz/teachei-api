import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { StepIndicator } from "@/components/create/step-indicator";
import { useCreateIntentionStore } from "@/stores/create-intention-store";
import { TipoVeiculo } from "@/types";

interface CategoryCardProps {
  tipo: TipoVeiculo;
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  subtitle: string;
  onPress: () => void;
}

function CategoryCard({ tipo, icon, title, subtitle, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className="
        flex-row items-center p-4
        bg-white dark:bg-slate-800 rounded-[2rem]
        shadow-sm border-2 border-transparent
        active:border-primary active:scale-[0.98]
      "
    >
      <View className="h-14 w-14 rounded-full bg-blue-50 dark:bg-blue-900/30 items-center justify-center">
        <MaterialIcons name={icon} size={28} color="#137fec" />
      </View>
      <View className="flex-1 ml-4">
        <Text className="text-lg font-display-bold text-slate-900 dark:text-white">
          {title}
        </Text>
        <Text className="text-sm text-slate-500 dark:text-slate-400">
          {subtitle}
        </Text>
      </View>
      <View className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-700 items-center justify-center">
        <MaterialIcons name="chevron-right" size={20} color="#94a3b8" />
      </View>
    </TouchableOpacity>
  );
}

const CATEGORIES: CategoryCardProps[] = [
  {
    tipo: "CARRO",
    icon: "directions-car",
    title: "Carro",
    subtitle: "Sedans, SUVs, Hatchbacks",
    onPress: () => {},
  },
  {
    tipo: "MOTO",
    icon: "two-wheeler",
    title: "Moto",
    subtitle: "Street, Sport, Scooter",
    onPress: () => {},
  },
  {
    tipo: "CAMINHAO",
    icon: "local-shipping",
    title: "Caminhão",
    subtitle: "Carga, Comercial",
    onPress: () => {},
  },
];

export default function CategoryScreen() {
  const insets = useSafeAreaInsets();
  const { setTipoVeiculo } = useCreateIntentionStore();

  const handleSelectCategory = (tipo: TipoVeiculo) => {
    setTipoVeiculo(tipo);
    router.push("/create/vehicle");
  };

  return (
    <View
      className="flex-1 bg-background-light dark:bg-background-dark"
      style={{ paddingTop: insets.top }}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-6 pb-2">
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-12 w-12 items-center justify-center rounded-full"
        >
          <MaterialIcons name="arrow-back" size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-display-bold text-slate-900 dark:text-white pr-12">
          Criar Anúncio
        </Text>
      </View>

      {/* Step Indicator */}
      <StepIndicator currentStep={0} totalSteps={4} />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Headline */}
        <View className="items-center mb-8">
          <Text className="text-[28px] font-display-extrabold leading-tight text-slate-900 dark:text-white mb-2 text-center">
            O que você procura?
          </Text>
          <Text className="text-base text-slate-500 dark:text-slate-400 text-center">
            Selecione o tipo de veículo que deseja comprar.
          </Text>
        </View>

        {/* Category Cards */}
        <View className="gap-4">
          {CATEGORIES.map((category) => (
            <CategoryCard
              key={category.tipo}
              {...category}
              onPress={() => handleSelectCategory(category.tipo)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="pb-6 pt-4 items-center">
        <Text className="text-xs text-slate-400 dark:text-slate-600">
          Transação Segura
        </Text>
      </View>
    </View>
  );
}



