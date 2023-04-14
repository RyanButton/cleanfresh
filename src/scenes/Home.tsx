import { Text } from "react-native-paper";
import { ScrollView } from "react-native";
import { useRoomsData } from "../providers/RoomsDataProvider";
import { JobMetaList } from "../components/JobsList";
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
  // const { rooms } = useRoomsData();
  // const hasJobs = React.useMemo(
  //   () => rooms.some((room) => room.schedule.length >= 0),
  //   [rooms]
  // );
  return (
    <ScrollView style={{ margin: 8, display: "flex", gap: 5 }}>
      <Text style={{ alignSelf: "center", paddingTop: 30 }}>
        All up to date, kick back and relax!
      </Text>
      {/* {hasJobs && (
        <>
          {rooms.map((room, i) => (
            <>
              {!!room.jobMeta.length && (
                <ContentBox title={room.name}>
                  <JobMetaList
                    roomName={room.name}
                    jobs={room.jobMeta}
                    color={room.color}
                    key={room.name}
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
      )} */}
    </ScrollView>
  );
}
