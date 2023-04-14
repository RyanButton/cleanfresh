import { View, StyleSheet } from "react-native";
import { useRoomsData } from "../providers/RoomsDataProvider";
import { JobMetaItem, CheckBoxItem } from "./JobItem";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
});

export function JobsList({
  roomName,
  jobs,
  color,
}: {
  roomName: string;
  jobs: Job[];
  color?: string;
}) {
  const { setJobCompleted } = useRoomsData();
  return (
    <View style={styles.container}>
      {jobs.map((j) => (
        <CheckBoxItem
          status={j.completed ? "checked" : "unchecked"}
          onPress={() => setJobCompleted(roomName, j.meta.name, !j.completed)}
          label={j.meta.name}
          color={color}
        />
      ))}
    </View>
  );
}

export function JobMetaList({
  roomName,
  jobs,
  color,
}: {
  roomName: string;
  jobs: JobMeta[];
  color?: string;
}) {
  return (
    <View style={styles.container}>
      {jobs.map((j) => (
        <JobMetaItem label={j.name} color={color} />
      ))}
    </View>
  );
}
