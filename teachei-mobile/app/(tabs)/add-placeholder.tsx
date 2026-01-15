import React, { useEffect } from "react";
import { View } from "react-native";
import { router } from "expo-router";

// This is a placeholder screen that redirects to the create flow
// The actual navigation is handled in the tab bar
export default function AddPlaceholder() {
  useEffect(() => {
    router.push("/create/category");
  }, []);

  return <View className="flex-1 bg-background-light dark:bg-background-dark" />;
}



