import React from "react";
import { ScrollView, View } from "react-native";
import { Chip } from "@/components/ui/chip";
import { MaterialIcons } from "@expo/vector-icons";
import { TipoVeiculo } from "@/types";

interface FilterChipsProps {
  selectedType: TipoVeiculo | null;
  onSelectType: (type: TipoVeiculo | null) => void;
}

const VEHICLE_TYPES: { type: TipoVeiculo | null; label: string; icon?: keyof typeof MaterialIcons.glyphMap }[] = [
  { type: null, label: "Todos" },
  { type: "CARRO", label: "Carros", icon: "directions-car" },
  { type: "MOTO", label: "Motos", icon: "two-wheeler" },
  { type: "CAMINHAO", label: "Caminhões", icon: "local-shipping" },
];

export function FilterChips({ selectedType, onSelectType }: FilterChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
      className="py-4"
    >
      {VEHICLE_TYPES.map((item) => (
        <Chip
          key={item.type || "all"}
          label={item.label}
          icon={item.icon}
          variant="filter"
          selected={selectedType === item.type}
          onPress={() => onSelectType(item.type)}
        />
      ))}
    </ScrollView>
  );
}



