import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Tabs, router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColorScheme } from "@/hooks/use-color-scheme";

type TabBarIconProps = {
  name: keyof typeof MaterialIcons.glyphMap;
  focused: boolean;
};

function TabBarIcon({ name, focused }: TabBarIconProps) {
  return (
    <MaterialIcons
      name={name}
      size={24}
      color={focused ? "#137fec" : "#94a3b8"}
    />
  );
}

function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View
      className={`
        flex-row justify-around items-center h-16
        bg-surface-light dark:bg-surface-dark
        border-t border-slate-200 dark:border-slate-800
      `}
      style={{ paddingBottom: insets.bottom > 0 ? insets.bottom : 8 }}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // FAB in the middle
        if (index === 2) {
          return (
            <View key={route.key} className="relative -top-6">
              <TouchableOpacity
                onPress={() => router.push("/create/category")}
                activeOpacity={0.9}
                className={`
                  flex items-center justify-center w-14 h-14 rounded-full
                  ${isDark ? "bg-white shadow-white/20" : "bg-slate-900 shadow-slate-900/20"}
                  shadow-xl
                `}
              >
                <MaterialIcons
                  name="add"
                  size={28}
                  color={isDark ? "#1e293b" : "white"}
                />
              </TouchableOpacity>
            </View>
          );
        }

        let iconName: keyof typeof MaterialIcons.glyphMap;
        switch (route.name) {
          case "index":
            iconName = "home";
            break;
          case "favorites":
            iconName = "favorite";
            break;
          case "chat":
            iconName = "chat-bubble";
            break;
          case "profile":
            iconName = "person";
            break;
          default:
            iconName = "circle";
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            className="flex-col items-center justify-center w-16 h-full gap-1"
          >
            <MaterialIcons
              name={iconName}
              size={24}
              color={isFocused ? "#137fec" : "#94a3b8"}
            />
            <Text
              className={`text-[10px] font-display-medium ${
                isFocused ? "text-primary" : "text-slate-400 dark:text-slate-500"
              }`}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Salvos",
          tabBarLabel: "Salvos",
        }}
      />
      <Tabs.Screen
        name="add-placeholder"
        options={{
          title: "",
          tabBarLabel: "",
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.push("/create/category");
          },
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarLabel: "Chat",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarLabel: "Perfil",
        }}
      />
    </Tabs>
  );
}
