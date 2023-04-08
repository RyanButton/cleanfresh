import { Checkbox, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  checkbox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default function CheckBox({
  status,
  label,
  onPress,
}: {
  status: "checked" | "unchecked" | "indeterminate";
  label: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.checkbox}>
      <Checkbox.Android status={status} onPress={onPress} />
      <Text>{label}</Text>
    </View>
  );
}
