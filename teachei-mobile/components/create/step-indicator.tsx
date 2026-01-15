import React from "react";
import { View, Text } from "react-native";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <View className="items-center pt-4 pb-6">
      <View className="flex-row items-center justify-center gap-3">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View
            key={index}
            className={`
              rounded-full transition-all duration-300
              ${
                index < currentStep
                  ? "h-2.5 w-2.5 bg-primary"
                  : index === currentStep
                  ? "h-2.5 w-8 bg-primary"
                  : "h-2.5 w-2.5 bg-slate-300 dark:bg-slate-700"
              }
            `}
          />
        ))}
      </View>
      <Text className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-display-medium">
        Passo {currentStep + 1} de {totalSteps}
      </Text>
    </View>
  );
}



