import { ScrollView, View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, Theme } from '@react-navigation/native'
import { darkTheme } from '../theme'
import { useRoomsData } from '../providers/RoomsDataProvider'
import { JobsList } from '../components/JobsList'
import ContentBox from '../components/ContentBox'
import useHasJobs from '../hooks/useHasJobs'

export type RootStackParamList = {
  'To Do': undefined
}
const Stack = createNativeStackNavigator<RootStackParamList>()

export default function HomeStack() {
  return (
    <NavigationContainer theme={darkTheme as unknown as Theme}>
      <Stack.Navigator initialRouteName="To Do">
        <Stack.Screen name="To Do" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function Home() {
  const { rooms } = useRoomsData()
  const hasJobs = useHasJobs()
  const currentDayIndex = new Date().getDay()

  return (
    <ScrollView style={{ margin: 8, display: 'flex', gap: 5 }}>
      <View>
        {!hasJobs && (
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              marginTop: 16,
            }}
          >
            All up to date, kick back and relax!
          </Text>
        )}
        {rooms.map((room) => {
          return (
            <View style={{ width: '100%' }}>
              {hasJobs &&
                !!room.schedule[currentDayIndex].isShowing &&
                !!room.schedule[currentDayIndex].jobs.length && (
                  <ContentBox title={room.name}>
                    <JobsList
                      jobs={room.schedule[currentDayIndex].jobs}
                      color={room.color}
                      roomName={room.name}
                    />
                  </ContentBox>
                )}
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}
