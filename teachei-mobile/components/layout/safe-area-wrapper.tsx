import React from "react";
import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SafeAreaWrapperProps extends ViewProps {
  edges?: ("top" | "bottom" | "left" | "right")[];
}

export function SafeAreaWrapper({
  children,
  edges = ["top", "bottom"],
  className,
  style,
  ...props
}: SafeAreaWrapperProps) {
  const insets = useSafeAreaInsets();

  const padding = {
    paddingTop: edges.includes("top") ? insets.top : 0,
    paddingBottom: edges.includes("bottom") ? insets.bottom : 0,
    paddingLeft: edges.includes("left") ? insets.left : 0,
    paddingRight: edges.includes("right") ? insets.right : 0,
  };

  return (
    <View
      className={`flex-1 bg-background-light dark:bg-background-dark ${className || ""}`}
      style={[padding, style]}
      {...props}
    >
      {children}
    </View>
  );
}



