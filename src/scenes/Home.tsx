import { IconButton, Text } from "react-native-paper";
import { ScrollView, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, Theme } from "@react-navigation/native";
import { darkTheme } from "../theme";
import React from "react";
import { useRoomsData } from "../providers/RoomsDataProvider";
import { JobsList } from "../components/JobsList";
import ContentBox from "../components/ContentBox";

export type RootStackParamList = {
  "To Do": undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function HomeStack() {
  return (
    <NavigationContainer theme={darkTheme as unknown as Theme}>
      <Stack.Navigator initialRouteName="To Do">
        <Stack.Screen name="To Do" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const currentDay = 0;

function Home() {
  const { rooms } = useRoomsData();
  return (
    <ScrollView style={{ margin: 8, display: "flex", gap: 5 }}>
      <View>
        {rooms.map((room) => {
          return (
            <View style={{ width: "100%" }}>
              {!!room.schedule[currentDay].isShowing && (
                <ContentBox title={room.name}>
                  <JobsList
                    jobs={room.schedule[currentDay].jobs}
                    color={room.color}
                    roomName={room.name}
                  />
                </ContentBox>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
