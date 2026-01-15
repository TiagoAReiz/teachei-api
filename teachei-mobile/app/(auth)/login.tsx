import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import { Link } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/use-auth";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { mutate: login, isPending, error } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Image / Brand Area */}
          <View className="relative w-full h-60">
            <View className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background-light dark:to-background-dark" />
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800" }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <LinearGradient
              colors={["transparent", "rgba(246, 247, 248, 1)"]}
              className="absolute inset-0"
            />
            {/* Logo Floating */}
            <View className="absolute bottom-4 left-0 right-0 items-center">
              <View className="bg-white/90 dark:bg-background-dark/90 px-6 py-2 rounded-full shadow-sm border border-slate-100 dark:border-slate-800">
                <View className="flex-row items-center gap-2">
                  <MaterialIcons name="directions-car" size={24} color="#137fec" />
                  <Text className="text-primary font-display-extrabold text-xl tracking-tight">
                    TeAchei
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Content */}
          <View className="flex-1 px-6 pb-8">
            {/* Headlines */}
            <View className="items-center mt-2 mb-8">
              <Text className="text-[28px] font-display-bold leading-tight text-slate-900 dark:text-white mb-2 text-center">
                Bem-vindo ao TeAchei
              </Text>
              <Text className="text-slate-500 dark:text-slate-400 text-base font-display-medium leading-relaxed text-center">
                A maneira mais fácil de encontrar seu próximo veículo.
              </Text>
            </View>

            {/* Social Buttons */}
            <View className="gap-3">
              <TouchableOpacity
                className="flex-row items-center justify-center gap-3 w-full h-[52px] rounded-full bg-black dark:bg-white active:scale-[0.98]"
                activeOpacity={0.8}
              >
                <MaterialIcons name="apple" size={20} color="white" />
                <Text className="text-base font-display-bold text-white dark:text-black tracking-wide">
                  Continuar com Apple
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center justify-center gap-3 w-full h-[52px] rounded-full bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 active:scale-[0.98]"
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri: "https://www.google.com/favicon.ico" }}
                  className="w-5 h-5"
                />
                <Text className="text-base font-display-bold text-slate-900 dark:text-white tracking-wide">
                  Continuar com Google
                </Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View className="flex-row items-center py-8">
              <View className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
              <Text className="mx-4 text-slate-400 dark:text-slate-500 text-sm font-display-medium">
                Ou continue com email
              </Text>
              <View className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
            </View>

            {/* Email Form */}
            <View className="gap-4">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    icon="mail"
                    placeholder="Endereço de Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.email?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="senha"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    icon="lock"
                    placeholder="Senha"
                    secureTextEntry
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.senha?.message}
                  />
                )}
              />

              <View className="flex-row justify-end pt-1">
                <TouchableOpacity>
                  <Text className="text-sm font-display-semibold text-primary">
                    Esqueceu a senha?
                  </Text>
                </TouchableOpacity>
              </View>

              {error && (
                <View className="bg-red-50 dark:bg-red-900/20 p-3 rounded-xl">
                  <Text className="text-red-600 dark:text-red-400 text-sm text-center">
                    Email ou senha incorretos
                  </Text>
                </View>
              )}

              <Button
                onPress={handleSubmit(onSubmit)}
                loading={isPending}
                icon="arrow-forward"
                iconPosition="right"
                fullWidth
                size="lg"
                className="mt-2"
              >
                Entrar
              </Button>
            </View>

            {/* Footer Links */}
            <View className="mt-8 items-center">
              <Text className="text-slate-500 dark:text-slate-400 text-sm">
                Não tem uma conta?{" "}
                <Link href="/(auth)/register" asChild>
                  <Text className="text-primary font-display-bold">Criar conta</Text>
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}



