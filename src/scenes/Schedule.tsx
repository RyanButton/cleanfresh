import { NavigationContainer, Theme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView } from "react-native";
import ContentBox from "../components/ContentBox";
import JobsList from "../components/JobsList";
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
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function Schedule() {
  const { rooms } = useRoomsData();
  return (
    <ScrollView style={{ margin: 8 }}>
      {days.map((day) => (
        <ContentBox title={day}>
          <>
            {rooms.map((room) => (
              <ContentBox title={room.name}>
                <JobsList
                  jobs={room.jobs}
                  color={room.color}
                  roomName={room.name}
                />
              </ContentBox>
            ))}
          </>
        </ContentBox>
      ))}
    </ScrollView>
  );
}
