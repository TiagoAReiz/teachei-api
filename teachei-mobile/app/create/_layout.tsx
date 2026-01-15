import React from "react";
import { Stack } from "expo-router";

export default function CreateLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="category" />
      <Stack.Screen name="vehicle" />
      <Stack.Screen name="specs" />
      <Stack.Screen name="review" />
    </Stack>
  );
}



