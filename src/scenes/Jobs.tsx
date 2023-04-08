import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, ScrollView } from "react-native";
import { Button, Checkbox, Portal, Provider } from "react-native-paper";
import { RootStackParamList } from "../App";
import JobsList from "../components/JobsList";
import TextInputModal from "../components/TextInputModal";
import { useRoomsData } from "../providers/RoomsDataProvider";

type Props = NativeStackScreenProps<RootStackParamList, "Jobs">;

export default function Jobs({ navigation, route }: Props) {
  const [isAddJobModalOpen, setIsAddJobModalOpen] = React.useState(false);
  const [newJobName, setNewJobName] = React.useState("");
  const showJobModal = () => setIsAddJobModalOpen(true);
  const hideJobModal = () => setIsAddJobModalOpen(false);
  const { addJob, setJobCompleted, rooms } = useRoomsData();
  const roomName = route.params.room.name;

  const saveRoom = React.useCallback(() => {
    addJob(roomName, { name: newJobName, completed: false });
    setNewJobName("");
    hideJobModal();
  }, [newJobName, roomName]);

  const jobs = rooms.find((r) => r.name === roomName)?.jobs;
  console.log("jobs in jobs scene", jobs);

  return (
    <Provider>
      <Portal>
        <ScrollView>
          <JobsList roomName={roomName} jobs={jobs || []} />
        </ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            paddingBottom: 30,
          }}
        >
          <Button icon="trash-can" onPress={() => {}}>
            Delete Room
          </Button>
          <Button icon="plus-circle" onPress={showJobModal}>
            Add job
          </Button>
        </View>
        <TextInputModal
          visible={isAddJobModalOpen}
          onDismiss={hideJobModal}
          label="Job"
          value={newJobName}
          onChangeText={setNewJobName}
          error={!!newJobName}
          mode="outlined"
          onSave={saveRoom}
        />
      </Portal>
    </Provider>
  );
}
