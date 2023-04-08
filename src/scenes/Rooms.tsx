import {
  Card,
  Divider,
  IconButton,
  Menu,
  Portal,
  Provider,
  Text,
} from "react-native-paper";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRoomsData } from "../providers/RoomsDataProvider";
import { RootStackParamList } from "../App";
import TextInputModal from "../components/TextInputModal";

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
    borderRadius: 5,
  },
  addButton: {
    padding: 15,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    borderRadius: 5,
  },
});

export default function Rooms({ navigation, route }: Props) {
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

  console.log("menuOpenState", menuOpenState);
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
                  id={room.name}
                  onPress={() => navigation.navigate("Jobs", { room })}
                  onLongPress={() => setMenuOpen(true, i)}
                >
                  <Card.Content style={styles.card}>
                    <Text
                      variant="titleLarge"
                      style={{
                        textAlign: "center",
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
        <View style={styles.addButton}>
          <IconButton icon="plus-circle" size={60} onPress={showAddRoomModal} />
        </View>
        <TextInputModal
          visible={isAddRoomModalOpen}
          onDismiss={hideAddRoomModal}
          label="Add Room"
          value={newRoomName}
          onChangeText={setNewRoomName}
          error={!!newRoomName}
          mode="outlined"
          onSave={() => {
            addRoom(newRoomName);
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
