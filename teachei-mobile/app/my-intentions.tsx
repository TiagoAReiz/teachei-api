import React, { useState } from "react";
import { View, Text, FlatList, RefreshControl, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Chip } from "@/components/ui/chip";
import { FAB } from "@/components/ui/fab";
import { MyIntentionCard } from "@/components/intentions/my-intention-card";
import { Anuncio, StatusAnuncio } from "@/types";
import { paymentsService } from "@/services/payments";

// Mock data
const MOCK_MY_INTENTIONS: Anuncio[] = [
  {
    id: "m1",
    usuarioId: "me",
    veiculoInfo: { tipoVeiculo: "CARRO", marca: "Jeep", modelo: "Renegade Longitude" },
    anoMinimo: 2019,
    precoMinimo: 80000,
    precoMaximo: 90000,
    cores: [],
    status: "ATIVO",
    visualizacoes: 15,
    propostas: 3,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "m2",
    usuarioId: "me",
    veiculoInfo: { tipoVeiculo: "CARRO", marca: "Toyota", modelo: "Corolla XEi" },
    anoMinimo: 2020,
    precoMinimo: 110000,
    precoMaximo: 120000,
    cores: [],
    status: "PENDENTE_PAGAMENTO",
    visualizacoes: 0,
    propostas: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "m3",
    usuarioId: "me",
    veiculoInfo: { tipoVeiculo: "CARRO", marca: "Honda", modelo: "Civic Touring" },
    precoMinimo: 140000,
    precoMaximo: 150000,
    cores: [],
    status: "ATIVO",
    visualizacoes: 2,
    propostas: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "m4",
    usuarioId: "me",
    veiculoInfo: { tipoVeiculo: "CARRO", marca: "VW", modelo: "T-Cross 2021" },
    anoMinimo: 2021,
    anoMaximo: 2021,
    cores: [],
    status: "FINALIZADO",
    visualizacoes: 30,
    propostas: 8,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

type FilterType = "all" | StatusAnuncio;

interface FilterOption {
  type: FilterType;
  label: string;
  count?: number;
  variant?: "warning";
}

export default function MyIntentionsScreen() {
  const insets = useSafeAreaInsets();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");
  const [refreshing, setRefreshing] = useState(false);

  // Count items by status
  const counts = MOCK_MY_INTENTIONS.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    },
    {} as Record<StatusAnuncio, number>
  );

  const filterOptions: FilterOption[] = [
    { type: "all", label: "Todos" },
    { type: "ATIVO", label: "Ativos", count: counts.ATIVO },
    { type: "PENDENTE_PAGAMENTO", label: "Pendentes", count: counts.PENDENTE_PAGAMENTO, variant: "warning" },
    { type: "FINALIZADO", label: "Finalizados" },
  ];

  const filteredIntentions = MOCK_MY_INTENTIONS.filter((item) => {
    if (selectedFilter === "all") return true;
    return item.status === selectedFilter;
  });

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleEdit = (id: string) => {
    // Navigate to edit screen
    Alert.alert("Editar", "Funcionalidade de edição em desenvolvimento.");
  };

  const handleMarkComplete = (id: string) => {
    Alert.alert(
      "Marcar como comprado",
      "Você encontrou o veículo que procurava? Sua intenção será marcada como finalizada.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Confirmar", onPress: () => {} },
      ]
    );
  };

  const handlePay = async (id: string) => {
    try {
      // In a real app, create payment and redirect
      Alert.alert("Pagamento", "Redirecionando para pagamento...");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível processar o pagamento.");
    }
  };

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark">
      {/* Header */}
      <View
        className="flex-row items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 pb-2 border-b border-slate-200 dark:border-slate-800"
        style={{ paddingTop: insets.top + 8 }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full"
        >
          <MaterialIcons name="arrow-back" size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text className="flex-1 text-xl font-display-bold text-slate-900 dark:text-white pl-2">
          Minhas Intenções
        </Text>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full">
            <MaterialIcons name="search" size={24} color="#1e293b" />
          </TouchableOpacity>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full">
            <MaterialIcons name="filter-list" size={24} color="#1e293b" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Chips */}
      <View className="pt-2 pb-4 px-4 border-b border-transparent">
        <FlatList
          horizontal
          data={filterOptions}
          keyExtractor={(item) => item.type}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}
          renderItem={({ item }) => (
            <Chip
              label={item.label}
              variant="filter"
              selected={selectedFilter === item.type}
              count={item.count}
              onPress={() => setSelectedFilter(item.type)}
            />
          )}
        />
      </View>

      {/* List */}
      <FlatList
        data={filteredIntentions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MyIntentionCard
            intention={item}
            onEdit={() => handleEdit(item.id)}
            onMarkComplete={() => handleMarkComplete(item.id)}
            onPay={() => handlePay(item.id)}
          />
        )}
        contentContainerStyle={{
          padding: 16,
          gap: 16,
          paddingBottom: 120,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center py-12">
            <MaterialIcons name="directions-car" size={48} color="#94a3b8" />
            <Text className="text-slate-500 dark:text-slate-400 text-base font-display-medium mt-4 text-center">
              Você ainda não tem intenções de compra.
            </Text>
          </View>
        }
      />

      {/* FAB */}
      <View
        className="absolute bottom-24 right-4"
        style={{ bottom: insets.bottom + 80 }}
      >
        <FAB
          onPress={() => router.push("/create/category")}
          label="Nova Intenção"
          icon="add"
          variant="primary"
        />
      </View>

      {/* Bottom Navigation Spacer */}
      <View className="h-16" />
    </View>
  );
}



