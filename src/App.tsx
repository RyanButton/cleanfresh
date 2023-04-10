import { registerRootComponent } from "expo";
import React from "react";
import RoomsDataProvider from "./providers/RoomsDataProvider";
import {
  BottomNavigation,
  MD3Theme,
  Provider as PaperProvider,
} from "react-native-paper";
import Home from "./scenes/Home";
import Rooms from "./scenes/Rooms";
import { darkTheme } from "./theme";

function App() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "todo",
      title: "To Do",
      focusedIcon: "broom",
    },
    { key: "rooms", title: "Rooms", focusedIcon: "home-variant-outline" },
    { key: "schedule", title: "Schedule", focusedIcon: "calendar" },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    todo: Home,
    rooms: Rooms,
    schedule: Rooms, //TODO
  });
  return (
    <PaperProvider theme={darkTheme as unknown as MD3Theme}>
      <RoomsDataProvider>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </RoomsDataProvider>
    </PaperProvider>
  );
}
registerRootComponent(App);
export default App;
