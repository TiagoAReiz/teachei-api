import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Anuncio, StatusAnuncio } from "@/types";
import { formatPriceRange, formatYearRange, formatRelativeTime } from "@/utils/format";

interface MyIntentionCardProps {
  intention: Anuncio;
  onEdit?: () => void;
  onMarkComplete?: () => void;
  onPay?: () => void;
}

const statusToBadgeVariant: Record<StatusAnuncio, "active" | "pending" | "finished"> = {
  ATIVO: "active",
  PENDENTE_PAGAMENTO: "pending",
  FINALIZADO: "finished",
  EXPIRADO: "finished",
};

const statusLabels: Record<StatusAnuncio, string> = {
  ATIVO: "Ativo",
  PENDENTE_PAGAMENTO: "Pendente Pagamento",
  FINALIZADO: "Finalizado",
  EXPIRADO: "Expirado",
};

export function MyIntentionCard({
  intention,
  onEdit,
  onMarkComplete,
  onPay,
}: MyIntentionCardProps) {
  const isPending = intention.status === "PENDENTE_PAGAMENTO";
  const isFinished = intention.status === "FINALIZADO" || intention.status === "EXPIRADO";
  const isActive = intention.status === "ATIVO";

  const priceRange = formatPriceRange(intention.precoMinimo, intention.precoMaximo);
  const yearRange = formatYearRange(intention.anoMinimo, intention.anoMaximo);

  return (
    <Card
      variant="elevated"
      className={`${isFinished ? "opacity-75" : ""}`}
    >
      <View className="flex-row justify-between items-start gap-4">
        <View className="flex-1 min-w-0 gap-1.5">
          {/* Status Badge */}
          <View className="flex-row items-center gap-2 mb-1">
            <Badge
              label={statusLabels[intention.status]}
              variant={statusToBadgeVariant[intention.status]}
            />
            {isActive && (
              <Text className="text-xs text-slate-400 dark:text-slate-500 font-display-medium">
                {formatRelativeTime(intention.createdAt)}
              </Text>
            )}
          </View>

          {/* Title */}
          <Text
            className={`
              text-base font-display-bold leading-tight
              ${isFinished ? "text-slate-700 dark:text-slate-300 line-through" : "text-slate-900 dark:text-white"}
            `}
            numberOfLines={1}
          >
            {intention.veiculoInfo.marca} {intention.veiculoInfo.modelo}
          </Text>

          {/* Details */}
          <Text className="text-sm font-display-medium text-slate-500 dark:text-slate-400">
            {priceRange} • {yearRange}
          </Text>
        </View>

        {/* Thumbnail */}
        <View className="h-20 w-24 rounded-xl bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <View className={`h-full w-full bg-slate-200 dark:bg-slate-600 items-center justify-center ${isFinished ? "grayscale" : ""}`}>
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
        </View>
      </View>

      {/* Metrics for active */}
      {isActive && (
        <View className="flex-row items-center gap-4 py-2 border-t border-slate-100 dark:border-slate-700 mt-3">
          <View className="flex-row items-center gap-1.5">
            <MaterialIcons name="visibility" size={18} color="#137fec" />
            <Text className="text-xs font-display-semibold text-slate-600 dark:text-slate-300">
              {intention.visualizacoes} Lojistas viram
            </Text>
          </View>
          {intention.propostas > 0 && (
            <View className="flex-row items-center gap-1.5">
              <MaterialIcons name="chat-bubble" size={18} color="#f59e0b" />
              <Text className="text-xs font-display-semibold text-slate-600 dark:text-slate-300">
                {intention.propostas} Propostas
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Warning for pending payment */}
      {isPending && (
        <View className="flex-row items-start gap-2 py-2 border-t border-slate-100 dark:border-slate-700 mt-3">
          <MaterialIcons name="info" size={18} color="#f59e0b" />
          <Text className="text-xs text-slate-600 dark:text-slate-400 leading-snug flex-1">
            Seu anúncio está oculto. Efetue o pagamento para receber propostas.
          </Text>
        </View>
      )}

      {/* Actions */}
      {isActive && (
        <View className="flex-row gap-2 mt-3">
          <TouchableOpacity
            onPress={onEdit}
            className="flex-1 h-10 flex-row items-center justify-center gap-2 rounded-full bg-slate-100 dark:bg-slate-700"
          >
            <MaterialIcons name="edit" size={18} color="#1e293b" />
            <Text className="text-sm font-display-bold text-slate-900 dark:text-white">
              Editar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onMarkComplete}
            className="flex-1 h-10 flex-row items-center justify-center gap-2 rounded-full bg-slate-100 dark:bg-slate-700"
          >
            <MaterialIcons name="check-circle" size={18} color="#1e293b" />
            <Text className="text-sm font-display-bold text-slate-900 dark:text-white">
              Já comprei
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Pay Now for pending */}
      {isPending && (
        <Button
          variant="warning"
          onPress={onPay}
          icon="arrow-forward"
          iconPosition="right"
          fullWidth
          className="mt-3"
        >
          Pagar Agora
        </Button>
      )}

      {/* View details for finished */}
      {isFinished && (
        <TouchableOpacity
          onPress={() => router.push(`/intention/${intention.id}`)}
          className="flex-row items-center justify-center py-2 border-t border-slate-100 dark:border-slate-700/50 mt-3"
        >
          <Text className="text-sm font-display-semibold text-primary">
            Ver detalhes da compra
          </Text>
          <MaterialIcons name="chevron-right" size={16} color="#137fec" />
        </TouchableOpacity>
      )}
    </Card>
  );
}



