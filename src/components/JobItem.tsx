import { Checkbox, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";

export default function JobItem({
  status,
  label,
  onPress,
  color,
}: {
  status: "checked" | "unchecked" | "indeterminate";
  label: string;
  onPress: () => void;
  color?: string;
}) {
  const styles = StyleSheet.create({
    checkbox: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: color ?? "rgba(228, 0, 120, 0.4)",
      borderRadius: 8,
      padding: 2,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.checkbox}>
        <Checkbox.Android
          status={status}
          onPress={onPress}
          color="rgb(147, 143, 153)"
        />
        <Text style={{ color: "white", paddingLeft: 2 }} variant="labelLarge">
          {label}
        </Text>
      </View>
    </View>
  );
}
