import { Text } from "react-native-paper";
import { ScrollView, View } from "react-native";
import { useRoomsData } from "../providers/RoomsDataProvider";
import JobsList from "../components/JobsList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, Theme } from "@react-navigation/native";
import { darkTheme } from "../theme";

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
  return (
    <ScrollView style={{ margin: 8, display: "flex", gap: 5 }}>
      {rooms.map((room, i) => (
        <View
          style={{
            backgroundColor: "rgba(73, 69, 79, 0.3)",
            borderRadius: 8,
            padding: 8,
            marginBottom: 8,
          }}
        >
          <Text
            variant="titleSmall"
            style={{ paddingBottom: 2, paddingLeft: 8 }}
          >
            {room.name}
          </Text>
          {!!room.jobs.length && (
            <View style={{ marginTop: 2 }}>
              <JobsList
                roomName={room.name}
                jobs={room.jobs}
                color={room.color}
              />
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
