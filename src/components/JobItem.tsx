import { Checkbox, Text, useTheme } from "react-native-paper";
import { View, StyleSheet } from "react-native";

export function CheckBoxItem({
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
  const theme = useTheme();
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
      backgroundColor: color ?? theme.colors.background,
      borderRadius: 8,
      padding: 2,
    },
  });

  return (
    <View style={styles.container} key={label}>
      <View style={styles.checkbox}>
        <Checkbox.Android status={status} onPress={onPress} />
        <Text style={{ color: "white", paddingLeft: 2 }} variant="labelLarge">
          {label}
        </Text>
      </View>
    </View>
  );
}

export function JobMetaItem({
  label,
  color,
}: {
  label: string;
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
      <Text style={{ color: "white", padding: 8 }} variant="labelLarge">
        {label}
      </Text>
    </View>
  );
}
