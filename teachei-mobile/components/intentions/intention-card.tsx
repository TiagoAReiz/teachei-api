import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Chip } from "@/components/ui/chip";
import { Button } from "@/components/ui/button";
import { Anuncio } from "@/types";
import { formatPriceRange, formatYearRange, formatRelativeTime } from "@/utils/format";

interface IntentionCardProps {
  intention: Anuncio;
  showActions?: boolean;
}

export function IntentionCard({ intention, showActions = true }: IntentionCardProps) {
  const handlePress = () => {
    router.push(`/intention/${intention.id}`);
  };

  const handleRespond = () => {
    router.push(`/intention/${intention.id}`);
  };

  const yearRange = formatYearRange(intention.anoMinimo, intention.anoMaximo);
  const priceRange = formatPriceRange(intention.precoMinimo, intention.precoMaximo);

  return (
    <Card variant="elevated" className="flex flex-col gap-4">
      {/* Header User Info */}
      <View className="flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => router.push(`/user/${intention.usuarioId}`)}
          className="flex-row items-center gap-3"
        >
          <Avatar
            source={intention.usuario?.avatarUrl}
            name={intention.usuario?.nome}
            size="md"
          />
          <View>
            <Text className="text-sm font-display-bold text-slate-900 dark:text-white">
              {intention.usuario?.nome || "Usuário"}
            </Text>
            <Text className="text-xs text-slate-500 dark:text-slate-400">
              {formatRelativeTime(intention.createdAt)}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="p-2">
          <MaterialIcons name="more-horiz" size={24} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
        <Text className="text-xl font-display-bold text-slate-900 dark:text-white mb-1 leading-tight">
          <Text className="text-primary">Procuro: </Text>
          {intention.veiculoInfo.marca} {intention.veiculoInfo.modelo}
        </Text>

        {/* Chips */}
        <View className="flex-row flex-wrap gap-2 mt-3 mb-4">
          {yearRange !== "Qualquer ano" && (
            <Chip label={yearRange} />
          )}
          {intention.cores && intention.cores.length > 0 && (
            <Chip label={intention.cores.join(", ")} />
          )}
          {intention.transmissao && (
            <Chip label={intention.transmissao} />
          )}
        </View>

        {/* Budget Highlight */}
        {(intention.precoMinimo || intention.precoMaximo) && (
          <View className="flex-row items-center gap-2 mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-900/30">
            <View className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-800 items-center justify-center">
              <MaterialIcons name="attach-money" size={18} color="#16a34a" />
            </View>
            <View>
              <Text className="text-xs text-green-700 dark:text-green-400 font-display-medium uppercase tracking-wide">
                Budget Máximo
              </Text>
              <Text className="text-lg font-display-bold text-green-700 dark:text-green-300">
                {priceRange}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>

      {/* Action */}
      {showActions && (
        <Button onPress={handleRespond} fullWidth>
          Responder Oferta
        </Button>
      )}
    </Card>
  );
}



