import { NavigationContainer, Theme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  IconButton,
  Modal,
  Portal,
  Provider,
  Text,
  useTheme,
} from "react-native-paper";
import ContentBox from "../components/ContentBox";
import { CheckBoxItem } from "../components/JobItem";
import { JobsList } from "../components/JobsList";
import { useRoomsData } from "../providers/RoomsDataProvider";
import { darkTheme } from "../theme";

export type RootStackParamList = {
  Schedule: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RoomsStack() {
  return (
    <NavigationContainer theme={darkTheme as unknown as Theme}>
      <Stack.Navigator initialRouteName="Schedule">
        <Stack.Screen name="Schedule" component={Schedule} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const days = [
  ["Monday", "mon"],
  ["Tuesday", "tue"],
  ["Wednesday", "wed"],
  ["Thursday", "thur"],
  ["Friday", "fri"],
  ["Saturday", "sat"],
  ["Sunday", "sun"],
];

enum Day {
  longName = 0,
  shortName = 1,
}

const styles = StyleSheet.create({
  checkbox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    padding: 2,
  },
});

function Schedule() {
  const theme = useTheme();
  const { rooms, setRooms } = useRoomsData();

  const [selectedRoomsState, setSelectedRoomsState] = React.useState<
    {
      roomName: string;
      status: "checked" | "unchecked" | "indeterminate";
    }[]
  >(
    rooms.map((room) => {
      return { roomName: room.name, status: "unchecked" };
    })
  );
  const [dayMenuState, setDayOpenState] = React.useState<{
    open: boolean[];
    dayToEdit: number;
  }>({ open: Array(days.length).fill(false), dayToEdit: -1 });

  const clearSelectedRoomState = React.useCallback(() => {
    setSelectedRoomsState(
      rooms.map((room) => {
        return { roomName: room.name, status: "unchecked" };
      })
    );
  }, [setSelectedRoomsState, rooms]);

  const setMenuOpen = React.useCallback(
    (val: boolean, index: number) => {
      setSelectedRoomsState(
        rooms.map((room) => {
          /* @ts-ignore */
          const status = room.schedule[days[index][Day.shortName]].isShowing
            ? "checked"
            : "unchecked";

          return {
            roomName: room.name,
            status,
          };
        })
      );
      setDayOpenState({
        open: dayMenuState.open.map((s, i) => {
          if (i === index) {
            return val;
          }
          return s;
        }),
        dayToEdit: index,
      });
    },
    [setDayOpenState, dayMenuState, setSelectedRoomsState, rooms]
  );

  const setMenuClose = React.useCallback(() => {
    setDayOpenState({
      open: Array(days.length).fill(false),
      dayToEdit: -1,
    });
    clearSelectedRoomState();
  }, [setDayOpenState]);

  const onDayMenuSave = React.useCallback(
    (dayToEdit: number) => {
      setRooms(
        rooms.map((room) => {
          for (const srs of selectedRoomsState) {
            if (srs.roomName === room.name) {
              const newSchedule = room.schedule;
              /* @ts-ignore */
              newSchedule[days[dayToEdit][Day.shortName]].isShowing =
                srs.status === "checked";

              return {
                name: room.name,
                jobMeta: room.jobMeta,
                color: room.color,
                schedule: newSchedule,
              };
            }
          }
          return room;
        })
      );
      clearSelectedRoomState();
      setMenuClose();
    },
    [selectedRoomsState, setRooms, rooms]
  );

  const checkRoom = React.useCallback(
    (roomName: string) => {
      setSelectedRoomsState(
        selectedRoomsState.map((r) => {
          if (r.roomName === roomName) {
            return {
              roomName,
              status: r.status === "checked" ? "unchecked" : "checked",
            };
          }
          return r;
        })
      );
    },
    [selectedRoomsState, setSelectedRoomsState]
  );

  console.log(selectedRoomsState);

  return (
    <Provider>
      <Portal>
        <ScrollView style={{ margin: 8 }}>
          <>
            {days.map((day, i) => (
              <ContentBox title={day[0]}>
                <View>
                  {rooms.map((room, i) => (
                    <View>
                      {/* @ts-ignore */}
                      {!!room.schedule[day[1]].isShowing && (
                        <View>
                          <ContentBox title={room.name}>
                            <JobsList
                              /* @ts-ignore */
                              jobs={room.schedule[day[1]].jobs}
                              color={room.color}
                              roomName={room.name}
                            />
                          </ContentBox>
                        </View>
                      )}
                    </View>
                  ))}
                </View>
                <IconButton
                  icon="plus-circle"
                  size={20}
                  onPress={() => {
                    setMenuOpen(true, i);
                  }}
                />
              </ContentBox>
            ))}
          </>
        </ScrollView>
        <Modal
          visible={dayMenuState.open[dayMenuState.dayToEdit]}
          onDismiss={() => setMenuClose()}
          contentContainerStyle={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            backgroundColor: theme.colors.background,
            padding: 20,
            paddingBottom: 20,
            marginLeft: 20,
            marginRight: 20,
            borderRadius: 8,
          }}
        >
          <View>
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.onBackground }}
            >
              {(days[dayMenuState.dayToEdit] || [""])[0]}
            </Text>
            <ScrollView>
              <>
                {!!rooms.length &&
                  rooms.map((room) => (
                    <CheckBoxItem
                      status={
                        selectedRoomsState.find((s) => s.roomName === room.name)
                          ?.status || "indeterminate"
                      }
                      onPress={() => checkRoom(room.name)}
                      label={room.name}
                    />
                  ))}
                {!rooms.length && <Text>No rooms</Text>}
              </>
            </ScrollView>
            <Button onPress={() => onDayMenuSave(dayMenuState.dayToEdit)}>
              Save
            </Button>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
}
