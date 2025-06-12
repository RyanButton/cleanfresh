import { registerRootComponent } from 'expo'
import React from 'react'
import RoomsDataProvider from './providers/RoomsDataProvider'
import {
  BottomNavigation,
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
} from 'react-native-paper'

import Home from './scenes/Home'
import Rooms from './scenes/Rooms'
import Schedule from './scenes/Schedule'
import { useColorScheme } from 'react-native'



function App() {
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    {
      key: 'todo',
      title: 'To Do',
      focusedIcon: 'broom',
    },
    { key: 'rooms', title: 'Rooms', focusedIcon: 'home-variant-outline' },
    { key: 'schedule', title: 'Schedule', focusedIcon: 'calendar' },
  ])
  const renderScene = BottomNavigation.SceneMap({
    todo: Home,
    rooms: Rooms,
    schedule: Schedule,
  })

  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  const paperTheme = isDark ? MD3DarkTheme : MD3LightTheme

  return (
    <PaperProvider theme={paperTheme}>
        <RoomsDataProvider>
          <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
          />
        </RoomsDataProvider>
    </PaperProvider>
  )
}

export default registerRootComponent(App)
