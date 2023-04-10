import { IconButton } from "react-native-paper";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    right: 1,
    bottom: 1,
    borderRadius: 8,
  },
});

export default function AddButton({ onPress }: { onPress: () => void }) {
  return (
    <IconButton
      icon="plus-circle"
      size={60}
      onPress={onPress}
      style={styles.addButton}
    />
  );
}
