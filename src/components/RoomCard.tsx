import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    borderRadius: 5,
  },
});

function Room({ name }: { name: string }) {
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
    </View>
  );
}

export default Room;
