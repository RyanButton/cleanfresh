import { Button, Text } from "react-native-paper";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { ScrollView, View } from "react-native";
import { useRoomsData } from "../providers/RoomsDataProvider";
import JobsList from "../components/JobsList";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: Props) {
  const { rooms } = useRoomsData();
  return (
    <ScrollView>
      {rooms.map((room) => (
        <View>
          <Text
            variant="headlineSmall"
            style={{ paddingTop: 10, paddingLeft: 8, alignSelf: "center" }}
          >
            {room.name}
          </Text>
          {!!room.jobs.length && (
            <JobsList roomName={room.name} jobs={room.jobs} />
          )}
          {!room.jobs.length && (
            <Text
              style={{
                fontStyle: "italic",
                padding: 20,
                alignSelf: "center",
              }}
            >
              No jobs yet
            </Text>
          )}
        </View>
      ))}
      <Button mode="elevated" onPress={() => navigation.navigate("Rooms")}>
        My Rooms
      </Button>
    </ScrollView>
  );
}
