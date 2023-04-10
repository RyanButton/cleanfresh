import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView } from "react-native";
import { Portal, Provider } from "react-native-paper";
import { RootStackParamList } from "./Rooms";
import JobsList from "../components/JobsList";
import TextInputModal from "../components/TextInputModal";
import { useRoomsData } from "../providers/RoomsDataProvider";
import AddButton from "../components/AddButton";

type Props = NativeStackScreenProps<RootStackParamList, "Jobs">;

export default function Jobs({ navigation, route }: Props) {
  const [isAddJobModalOpen, setIsAddJobModalOpen] = React.useState(false);
  const [newJobName, setNewJobName] = React.useState("");
  const showJobModal = () => setIsAddJobModalOpen(true);
  const hideJobModal = () => setIsAddJobModalOpen(false);
  const { addJob, rooms } = useRoomsData();
  const roomName = route.params.room.name;

  const saveRoom = React.useCallback(() => {
    addJob(roomName, { name: newJobName, completed: false });
    setNewJobName("");
    hideJobModal();
  }, [newJobName, roomName]);

  const room = rooms.find((r) => r.name === roomName);
  const jobs = room?.jobs;
  console.log("jobs in jobs scene", jobs);

  return (
    <Provider>
      <Portal>
        <ScrollView style={{ margin: 8 }}>
          <JobsList roomName={roomName} jobs={jobs || []} color={room?.color} />
        </ScrollView>
        <AddButton onPress={showJobModal} />
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
