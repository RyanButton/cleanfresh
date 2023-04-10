import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function ContentBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View
      style={{
        backgroundColor: "rgba(73, 69, 79, 0.3)",
        borderRadius: 8,
        padding: 8,
        marginBottom: 8,
      }}
    >
      <Text variant="titleSmall" style={{ paddingBottom: 2, paddingLeft: 8 }}>
        {title}
      </Text>
      <View style={{ marginTop: 2 }}>{children}</View>
    </View>
  );
}
