import { Card, Menu, Portal, Provider, Text } from "react-native-paper";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useRoomsData } from "../providers/RoomsDataProvider";
import TextInputModal from "../components/TextInputModal";
import Jobs from "./Jobs";
import { NavigationContainer, Theme } from "@react-navigation/native";
import { darkTheme } from "../theme";
import AddButton from "../components/AddButton";

type Props = NativeStackScreenProps<RootStackParamList, "Rooms">;

const CARD_WIDTH = 150;

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    paddingTop: 24,
    flexWrap: "wrap",
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: CARD_WIDTH,
    maxHeight: CARD_WIDTH,
    minWidth: CARD_WIDTH,
    minHeight: CARD_WIDTH,
    borderRadius: 8,
  },
  addButton: {
    padding: 15,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    borderRadius: 8,
  },
});

const colors: Color[] = [
  "rgba(228, 0, 120, 0.4)",
  "rgba(57, 255, 20, 0.4)",
  "rgba(51, 87, 255, 0.4)",
  "rgba(255, 49, 49, 0.4)",
  "rgba(224, 231, 34, 0.4)",
  "rgba(255, 105, 180, 0.4)",
  "rgba(255, 165, 0, 0.4)",
  "rgba(135, 206, 235, 0.4)",
  "rgba(224, 231, 34, 0.4)",
];

export type RootStackParamList = {
  Rooms: undefined;
  Jobs: { room: Room };
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RoomsStack() {
  return (
    <NavigationContainer theme={darkTheme as unknown as Theme}>
      <Stack.Navigator initialRouteName="Rooms">
        <Stack.Screen name="Rooms" component={Rooms} />
        <Stack.Screen
          name="Jobs"
          component={Jobs}
          initialParams={{
            room: {
              name: "",
              jobMeta: [],
              schedule: [
                { isShowing: false, jobs: [] },
                { isShowing: false, jobs: [] },
                { isShowing: false, jobs: [] },
                { isShowing: false, jobs: [] },
                { isShowing: false, jobs: [] },
                { isShowing: false, jobs: [] },
                { isShowing: false, jobs: [] },
              ],
              color: "#fff",
            },
          }}
          options={({ route }) => ({ title: route.params.room.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Rooms({ navigation, route }: Props) {
  const { rooms, addRoom, editRoom } = useRoomsData();
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = React.useState(false);
  const [isEditRoomModalOpen, setIsEditRoomModalOpen] = React.useState(false);
  const [roomToEdit, setRoomToEdit] = React.useState("");
  const [menuOpenState, setMenuOpenState] = React.useState<boolean[]>(
    Array(rooms.length).fill(false)
  );
  function setMenuOpen(val: boolean, index: number) {
    setMenuOpenState(
      menuOpenState.map((s, i) => {
        if (i === index) {
          return val;
        }
        return s;
      })
    );
  }
  const [newRoomName, setNewRoomName] = React.useState("");

  const showAddRoomModal = () => setIsAddRoomModalOpen(true);
  const hideAddRoomModal = () => setIsAddRoomModalOpen(false);
  const showEditRoomModal = () => setIsEditRoomModalOpen(true);
  const hideEditRoomModal = () => setIsEditRoomModalOpen(false);

  return (
    <Provider>
      <Portal>
        <ScrollView contentContainerStyle={styles.cardContainer}>
          {rooms.map((room, i) => (
            <Menu
              visible={menuOpenState[i]}
              onDismiss={() => {
                setMenuOpen(false, i);
                setIsEditRoomModalOpen(false);
                setRoomToEdit("");
                setNewRoomName("");
              }}
              anchor={
                <Card
                  key={room.name}
                  onPress={() => navigation.navigate("Jobs", { room })}
                  onLongPress={() => setMenuOpen(true, i)}
                  style={{ backgroundColor: room.color }}
                >
                  <Card.Content style={styles.card} key={room.name}>
                    <Text
                      variant="titleLarge"
                      style={{
                        textAlign: "center",
                        color: "#fff",
                      }}
                    >
                      {room.name}
                    </Text>
                  </Card.Content>
                </Card>
              }
            >
              <Menu.Item
                onPress={() => {
                  showEditRoomModal();
                  setRoomToEdit(room.name);
                  setNewRoomName(room.name);
                  setMenuOpen(false, i);
                }}
                title="Edit"
                leadingIcon="pencil"
              />
              <Menu.Item
                onPress={() => {}}
                title="Delete"
                leadingIcon="trash-can"
              />
            </Menu>
          ))}
        </ScrollView>
        <AddButton onPress={showAddRoomModal} />
        <TextInputModal
          visible={isAddRoomModalOpen}
          onDismiss={hideAddRoomModal}
          label="Add Room"
          value={newRoomName}
          onChangeText={setNewRoomName}
          error={!!newRoomName}
          mode="outlined"
          onSave={() => {
            addRoom(newRoomName, colors[rooms.length]);
            setIsAddRoomModalOpen(false);
            setNewRoomName("");
            setMenuOpenState([...menuOpenState, false]);
          }}
        />
        <TextInputModal
          visible={isEditRoomModalOpen}
          onDismiss={hideEditRoomModal}
          label="Edit Room"
          value={newRoomName}
          onChangeText={setNewRoomName}
          error={!!newRoomName}
          mode="outlined"
          onSave={() => {
            editRoom(roomToEdit, newRoomName);
            setIsEditRoomModalOpen(false);
            setNewRoomName("");
            setRoomToEdit("");
          }}
        />
      </Portal>
    </Provider>
  );
}
