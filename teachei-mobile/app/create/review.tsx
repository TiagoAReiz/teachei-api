import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { StepIndicator } from "@/components/create/step-indicator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { useCreateIntentionStore } from "@/stores/create-intention-store";
import { useCreateIntention } from "@/hooks/use-intentions";
import { paymentsService } from "@/services/payments";
import { formatCurrency, formatYearRange } from "@/utils/format";

interface SpecRowProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value: string;
}

function SpecRow({ icon, label, value }: SpecRowProps) {
  return (
    <View className="flex-row items-center py-3 border-b border-slate-100 dark:border-slate-800">
      <View className="h-10 w-10 rounded-full bg-primary/10 items-center justify-center mr-4">
        <MaterialIcons name={icon} size={20} color="#137fec" />
      </View>
      <View className="flex-1">
        <Text className="text-xs text-slate-500 dark:text-slate-400 font-display-medium">
          {label}
        </Text>
        <Text className="text-base font-display-bold text-slate-900 dark:text-white">
          {value}
        </Text>
      </View>
    </View>
  );
}

export default function ReviewScreen() {
  const insets = useSafeAreaInsets();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync: createIntention } = useCreateIntention();
  
  const {
    tipoVeiculo, marca, modelo,
    anoMinimo, anoMaximo, cores, precoMinimo, precoMaximo,
    transmissao, combustivel, observacoes,
    reset,
  } = useCreateIntentionStore();

  const handleSubmit = async () => {
    if (!tipoVeiculo || !marca || !modelo) {
      Alert.alert("Erro", "Dados incompletos. Por favor, volte e preencha todos os campos.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Create the intention
      const intention = await createIntention({
        tipoVeiculo,
        marca: marca.nome,
        modelo: modelo.nome,
        anoMinimo: anoMinimo || undefined,
        anoMaximo: anoMaximo || undefined,
        cores,
        precoMinimo: precoMinimo || undefined,
        precoMaximo: precoMaximo || undefined,
        transmissao: transmissao || undefined,
        combustivel: combustivel || undefined,
        observacoes: observacoes || undefined,
      });

      // Create payment and redirect
      const payment = await paymentsService.createPayment(intention.id);
      await paymentsService.openPaymentUrl(payment.paymentUrl);

      // Reset store and navigate
      reset();
      router.replace("/my-intentions");
    } catch (error) {
      console.error("Error creating intention:", error);
      Alert.alert(
        "Erro",
        "Não foi possível criar sua intenção. Por favor, tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // For demo purposes, simulate success
  const handleDemoSubmit = () => {
    Alert.alert(
      "Sucesso! 🎉",
      "Sua intenção de compra foi criada com sucesso! Em um app real, você seria redirecionado para o pagamento.",
      [
        {
          text: "OK",
          onPress: () => {
            reset();
            router.replace("/(tabs)");
          },
        },
      ]
    );
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
      <StepIndicator currentStep={3} totalSteps={4} />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Headline */}
        <View className="items-center mb-6">
          <Text className="text-[24px] font-display-extrabold leading-tight text-slate-900 dark:text-white mb-2 text-center">
            Revise sua intenção
          </Text>
          <Text className="text-base text-slate-500 dark:text-slate-400 text-center">
            Confira os detalhes antes de publicar.
          </Text>
        </View>

        {/* Vehicle Card */}
        <Card variant="elevated" className="mb-6">
          <View className="items-center pb-4 border-b border-slate-100 dark:border-slate-800">
            <View className="h-16 w-16 rounded-full bg-primary/10 items-center justify-center mb-3">
              <MaterialIcons
                name={
                  tipoVeiculo === "MOTO"
                    ? "two-wheeler"
                    : tipoVeiculo === "CAMINHAO"
                    ? "local-shipping"
                    : "directions-car"
                }
                size={32}
                color="#137fec"
              />
            </View>
            <Text className="text-xl font-display-bold text-slate-900 dark:text-white">
              {marca?.nome} {modelo?.nome}
            </Text>
            <Text className="text-sm text-slate-500 dark:text-slate-400 capitalize">
              {tipoVeiculo?.toLowerCase()}
            </Text>
          </View>

          {/* Specs */}
          <View className="pt-2">
            {(anoMinimo || anoMaximo) && (
              <SpecRow
                icon="calendar-today"
                label="Ano"
                value={formatYearRange(anoMinimo || undefined, anoMaximo || undefined)}
              />
            )}
            
            {cores.length > 0 && (
              <SpecRow
                icon="palette"
                label="Cores"
                value={cores.join(", ")}
              />
            )}
            
            {transmissao && (
              <SpecRow
                icon="settings"
                label="Transmissão"
                value={transmissao}
              />
            )}
            
            {combustivel && (
              <SpecRow
                icon="local-gas-station"
                label="Combustível"
                value={combustivel}
              />
            )}
            
            {(precoMinimo || precoMaximo) && (
              <SpecRow
                icon="attach-money"
                label="Faixa de Preço"
                value={
                  precoMinimo && precoMaximo
                    ? `${formatCurrency(precoMinimo)} - ${formatCurrency(precoMaximo)}`
                    : precoMaximo
                    ? `Até ${formatCurrency(precoMaximo)}`
                    : `A partir de ${formatCurrency(precoMinimo!)}`
                }
              />
            )}
          </View>
        </Card>

        {/* Notes */}
        {observacoes && (
          <Card variant="default" className="mb-6">
            <View className="flex-row items-start gap-3">
              <MaterialIcons name="format-quote" size={24} color="#f59e0b" />
              <Text className="flex-1 text-slate-700 dark:text-slate-300 text-sm leading-relaxed italic">
                "{observacoes}"
              </Text>
            </View>
          </Card>
        )}

        {/* Price Info */}
        <View className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl border border-green-100 dark:border-green-900/30">
          <View className="flex-row items-center mb-2">
            <MaterialIcons name="verified" size={20} color="#16a34a" />
            <Text className="text-green-700 dark:text-green-400 font-display-bold text-base ml-2">
              Taxa de publicação
            </Text>
          </View>
          <Text className="text-green-700 dark:text-green-300 text-2xl font-display-bold">
            R$ 19,90
          </Text>
          <Text className="text-green-600 dark:text-green-400 text-sm mt-1">
            Pagamento único • Anúncio fica ativo por 30 dias
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View
        className="absolute bottom-0 left-0 right-0 p-4 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <Button
          onPress={handleDemoSubmit}
          loading={isSubmitting}
          icon="payment"
          iconPosition="left"
          fullWidth
          size="lg"
        >
          Publicar e Pagar R$ 19,90
        </Button>
        <Text className="text-xs text-slate-400 text-center mt-3">
          Pagamento seguro via Mercado Pago
        </Text>
      </View>
    </View>
  );
}



