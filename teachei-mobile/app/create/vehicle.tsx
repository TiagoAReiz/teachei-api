import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, FlatList, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { StepIndicator } from "@/components/create/step-indicator";
import { Button } from "@/components/ui/button";
import { useCreateIntentionStore } from "@/stores/create-intention-store";
import { useMarcas, useModelos } from "@/hooks/use-vehicles";
import { Marca, Modelo } from "@/types";

// Mock data for development
const MOCK_MARCAS: Marca[] = [
  { codigo: "1", nome: "Chevrolet" },
  { codigo: "2", nome: "Fiat" },
  { codigo: "3", nome: "Ford" },
  { codigo: "4", nome: "Honda" },
  { codigo: "5", nome: "Hyundai" },
  { codigo: "6", nome: "Jeep" },
  { codigo: "7", nome: "Nissan" },
  { codigo: "8", nome: "Toyota" },
  { codigo: "9", nome: "Volkswagen" },
];

const MOCK_MODELOS: Record<string, Modelo[]> = {
  "1": [{ codigo: "1", nome: "Onix" }, { codigo: "2", nome: "Tracker" }, { codigo: "3", nome: "S10" }],
  "2": [{ codigo: "1", nome: "Argo" }, { codigo: "2", nome: "Strada" }, { codigo: "3", nome: "Toro" }],
  "3": [{ codigo: "1", nome: "Ka" }, { codigo: "2", nome: "Ranger" }, { codigo: "3", nome: "Territory" }],
  "4": [{ codigo: "1", nome: "Civic" }, { codigo: "2", nome: "City" }, { codigo: "3", nome: "HR-V" }],
  "5": [{ codigo: "1", nome: "HB20" }, { codigo: "2", nome: "Creta" }, { codigo: "3", nome: "Tucson" }],
  "6": [{ codigo: "1", nome: "Renegade" }, { codigo: "2", nome: "Compass" }, { codigo: "3", nome: "Commander" }],
  "7": [{ codigo: "1", nome: "Kicks" }, { codigo: "2", nome: "Frontier" }, { codigo: "3", nome: "Versa" }],
  "8": [{ codigo: "1", nome: "Corolla" }, { codigo: "2", nome: "Hilux" }, { codigo: "3", nome: "Yaris" }],
  "9": [{ codigo: "1", nome: "Polo" }, { codigo: "2", nome: "T-Cross" }, { codigo: "3", nome: "Nivus" }],
};

export default function VehicleScreen() {
  const insets = useSafeAreaInsets();
  const { tipoVeiculo, marca, modelo, setMarca, setModelo } = useCreateIntentionStore();
  const [searchMarca, setSearchMarca] = useState("");
  const [searchModelo, setSearchModelo] = useState("");

  // Use mock data for now
  const marcas = MOCK_MARCAS;
  const modelos = marca ? MOCK_MODELOS[marca.codigo] || [] : [];
  const isLoadingMarcas = false;
  const isLoadingModelos = false;

  const filteredMarcas = marcas.filter((m) =>
    m.nome.toLowerCase().includes(searchMarca.toLowerCase())
  );

  const filteredModelos = modelos.filter((m) =>
    m.nome.toLowerCase().includes(searchModelo.toLowerCase())
  );

  const handleSelectMarca = (selectedMarca: Marca) => {
    setMarca(selectedMarca);
    setSearchModelo("");
  };

  const handleSelectModelo = (selectedModelo: Modelo) => {
    setModelo(selectedModelo);
  };

  const handleContinue = () => {
    if (marca && modelo) {
      router.push("/create/specs");
    }
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
      <StepIndicator currentStep={1} totalSteps={4} />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Headline */}
        <View className="items-center mb-6">
          <Text className="text-[24px] font-display-extrabold leading-tight text-slate-900 dark:text-white mb-2 text-center">
            Qual veículo você procura?
          </Text>
          <Text className="text-base text-slate-500 dark:text-slate-400 text-center">
            Selecione a marca e modelo desejados.
          </Text>
        </View>

        {/* Marca Selection */}
        <View className="mb-6">
          <Text className="text-sm font-display-semibold text-slate-700 dark:text-slate-300 mb-3">
            Marca
          </Text>
          <View className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <View className="flex-row items-center px-4 border-b border-slate-100 dark:border-slate-700">
              <MaterialIcons name="search" size={20} color="#94a3b8" />
              <TextInput
                value={searchMarca}
                onChangeText={setSearchMarca}
                placeholder="Buscar marca..."
                placeholderTextColor="#94a3b8"
                className="flex-1 h-12 ml-3 text-base text-slate-900 dark:text-white"
              />
            </View>
            <View className="max-h-48">
              <FlatList
                data={filteredMarcas}
                keyExtractor={(item) => item.codigo}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelectMarca(item)}
                    className={`
                      flex-row items-center justify-between px-4 py-3
                      ${marca?.codigo === item.codigo ? "bg-primary/10" : ""}
                    `}
                  >
                    <Text
                      className={`
                        text-base font-display-medium
                        ${marca?.codigo === item.codigo ? "text-primary" : "text-slate-700 dark:text-slate-300"}
                      `}
                    >
                      {item.nome}
                    </Text>
                    {marca?.codigo === item.codigo && (
                      <MaterialIcons name="check" size={20} color="#137fec" />
                    )}
                  </TouchableOpacity>
                )}
                scrollEnabled={false}
              />
            </View>
          </View>
        </View>

        {/* Modelo Selection */}
        {marca && (
          <View className="mb-6">
            <Text className="text-sm font-display-semibold text-slate-700 dark:text-slate-300 mb-3">
              Modelo
            </Text>
            <View className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <View className="flex-row items-center px-4 border-b border-slate-100 dark:border-slate-700">
                <MaterialIcons name="search" size={20} color="#94a3b8" />
                <TextInput
                  value={searchModelo}
                  onChangeText={setSearchModelo}
                  placeholder="Buscar modelo..."
                  placeholderTextColor="#94a3b8"
                  className="flex-1 h-12 ml-3 text-base text-slate-900 dark:text-white"
                />
              </View>
              <View className="max-h-48">
                <FlatList
                  data={filteredModelos}
                  keyExtractor={(item) => item.codigo}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => handleSelectModelo(item)}
                      className={`
                        flex-row items-center justify-between px-4 py-3
                        ${modelo?.codigo === item.codigo ? "bg-primary/10" : ""}
                      `}
                    >
                      <Text
                        className={`
                          text-base font-display-medium
                          ${modelo?.codigo === item.codigo ? "text-primary" : "text-slate-700 dark:text-slate-300"}
                        `}
                      >
                        {item.nome}
                      </Text>
                      {modelo?.codigo === item.codigo && (
                        <MaterialIcons name="check" size={20} color="#137fec" />
                      )}
                    </TouchableOpacity>
                  )}
                  scrollEnabled={false}
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Button */}
      <View
        className="absolute bottom-0 left-0 right-0 p-4 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <Button
          onPress={handleContinue}
          disabled={!marca || !modelo}
          icon="arrow-forward"
          iconPosition="right"
          fullWidth
          size="lg"
        >
          Continuar
        </Button>
      </View>
    </View>
  );
}



