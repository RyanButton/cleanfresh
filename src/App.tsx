import { registerRootComponent } from "expo";
import React from "react";
import {
  NavigationContainer,
  Theme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RoomsDataProvider from "./providers/RoomsDataProvider";
import { MD3Theme, Provider as PaperProvider } from "react-native-paper";
import Home from "./scenes/Home";
import Rooms from "./scenes/Rooms";
import Jobs from "./scenes/Jobs";
import { darkTheme, defaultTheme } from "./theme";

export type RootStackParamList = {
  Home: undefined;
  Rooms: undefined;
  Jobs: { room: Room };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  console.log("theme", darkTheme);
  return (
    <PaperProvider theme={darkTheme as MD3Theme}>
      <RoomsDataProvider>
        <NavigationContainer theme={darkTheme as unknown as Theme}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Rooms" component={Rooms} />
            <Stack.Screen
              name="Jobs"
              component={Jobs}
              initialParams={{ room: { name: "", jobs: [] } }}
              options={({ route }) => ({ title: route.params.room.name })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RoomsDataProvider>
    </PaperProvider>
  );
}
registerRootComponent(App);
export default App;
