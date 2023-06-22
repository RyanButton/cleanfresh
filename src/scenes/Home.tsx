import { ScrollView, View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { useRoomsData } from '../providers/RoomsDataProvider'
import useHasJobs from '../hooks/useHasJobs'
import RoomsJobList from '../components/RoomsJobList'

export type RootStackParamList = {
  'To Do': undefined
}
const Stack = createNativeStackNavigator<RootStackParamList>()

export default function HomeStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="To Do">
        <Stack.Screen name="To Do" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function Home() {
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
