import { ScrollView, View, Text, useColorScheme } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, useTheme } from '@react-navigation/native'
import { useRoomsData } from '../providers/RoomsDataProvider'
import useHasJobs from '../hooks/useHasJobs'
import RoomsJobList from '../components/RoomsJobList'
import { DarkTheme, LightTheme } from '../theme'

export type RootStackParamList = {
  'To Do': undefined
}
const Stack = createNativeStackNavigator<RootStackParamList>()

export default function HomeStack() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'
  const navTheme = isDark ? DarkTheme : LightTheme
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="To Do">
        <Stack.Screen name="To Do" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function Home() {
  const { colors } = useTheme()
  const { rooms } = useRoomsData()
  const currentDayIndex = new Date().getDay()
  const hasJobs = useHasJobs(currentDayIndex)
  return (
    <ScrollView style={{ margin: 8, display: 'flex', gap: 5 }}>
      <View>
        {!hasJobs && (
          <Text
            style={{
              textAlign: 'center',
              marginTop: 16,
              color: colors.text,
            }}
          >
            All up to date, kick back and relax!
          </Text>
        )}
        {hasJobs && <RoomsJobList rooms={rooms} dayIndex={currentDayIndex} />}
      </View>
    </ScrollView>
  )
}
