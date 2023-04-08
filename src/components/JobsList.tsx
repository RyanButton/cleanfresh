import { View, StyleSheet } from "react-native";
import { Checkbox, Text } from "react-native-paper";
import { useRoomsData } from "../providers/RoomsDataProvider";
import CheckBox from "./CheckBox";

export default function JobsList({
  roomName,
  jobs,
}: {
  roomName: string;
  jobs: Job[];
}) {
  const { setJobCompleted } = useRoomsData();
  const func = () => {
    console.log("pingas");
  };
  return (
    <View>
      {jobs.map((j) => (
        <CheckBox
          status={j.completed ? "checked" : "unchecked"}
          onPress={() => setJobCompleted(roomName, j.name, !j.completed)}
          label={j.name}
        />
      ))}
    </View>
  );
}
