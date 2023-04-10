import { Text } from "react-native-paper";
import { ScrollView } from "react-native";
import { useRoomsData } from "../providers/RoomsDataProvider";
import JobsList from "../components/JobsList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, Theme } from "@react-navigation/native";
import { darkTheme } from "../theme";
import React from "react";
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

function Home() {
  const { rooms } = useRoomsData();
  const [hasJobs] = React.useState(
    rooms.some((room) => !!room.jobs.length === true)
  ); //TODO this is broken
  return (
    <ScrollView style={{ margin: 8, display: "flex", gap: 5 }}>
      {hasJobs && (
        <>
          {rooms.map((room, i) => (
            <>
              {!!room.jobs.length && (
                <ContentBox title={room.name}>
                  <JobsList
                    roomName={room.name}
                    jobs={room.jobs}
                    color={room.color}
                  />
                </ContentBox>
              )}
            </>
          ))}
        </>
      )}
      {!hasJobs && (
        <Text style={{ alignSelf: "center", paddingTop: 30 }}>
          All up to date, kick back and relax!
        </Text>
      )}
    </ScrollView>
  );
}
