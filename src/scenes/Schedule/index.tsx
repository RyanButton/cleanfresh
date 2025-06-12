import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Stepper from '../../components/Stepper'
import React from 'react'
import { ScrollView, useColorScheme, View } from 'react-native'
import { IconButton, Portal, Provider } from 'react-native-paper'
import ContentBox from '../../components/ContentBox'
import { JobsList } from '../../components/JobsList'
import { useRoomsData } from '../../providers/RoomsDataProvider'
import AddButton from '../../components/AddButton'
import useDays from '../../hooks/useDays'
import AddJobToScheduleModal from './components/AddJobToScheduleModal'
import AddRoomToDayModal from './components/AddRoomToDayModal'
import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavLightTheme,
} from '@react-navigation/native'
import { useTheme } from '@react-navigation/native'

export type RootStackParamList = {
  Schedule: undefined
}

export type JobMenuState = {
  open: boolean
  roomIndex: number
  dayIndex: number
}

export type DayMenuState = {
  open: boolean[]
  dayToEdit: number
}

export type SelectedRoomState = {
  roomName: string
  status: 'checked' | 'unchecked' | 'indeterminate'
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RoomsStack() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'
  const navTheme = isDark ? NavDarkTheme : NavLightTheme
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="Schedule">
        <Stack.Screen name="Schedule" component={Schedule} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const days = [
  ['Monday', 'mon'],
  ['Tuesday', 'tue'],
  ['Wednesday', 'wed'],
  ['Thursday', 'thur'],
  ['Friday', 'fri'],
  ['Saturday', 'sat'],
  ['Sunday', 'sun'],
]

function Schedule() {
  const { colors } = useTheme()
  const { rooms, setRooms } = useRoomsData()
  const { dayNames } = useDays()

  const [selectedRoomsState, setSelectedRoomsState] = React.useState<
    SelectedRoomState[]
  >(
    rooms.map((room) => {
      return { roomName: room.name, status: 'unchecked' }
    })
  )

  const [dayMenuState, setDayMenuState] = React.useState<DayMenuState>({
    open: Array(days.length).fill(false),
    dayToEdit: -1,
  })

  const setDayMenuOpen = React.useCallback(
    (val: boolean, dayIndex: number) => {
      setSelectedRoomsState(
        rooms.map((room) => {
          const status = room.schedule[dayIndex].isShowing
            ? 'checked'
            : 'unchecked'

          return {
            roomName: room.name,
            status,
          }
        })
      )
      setDayMenuState({
        open: dayMenuState.open.map((s, i) => {
          if (i === dayIndex) {
            return val
          }
          return s
        }),
        dayToEdit: dayIndex,
      })
    },
    [setDayMenuState, dayMenuState, setSelectedRoomsState, rooms]
  )

  const clearSelectedRoomState = React.useCallback(() => {
    setSelectedRoomsState(
      rooms.map((room) => {
        return { roomName: room.name, status: 'unchecked' }
      })
    )
  }, [setSelectedRoomsState, rooms])

  const setRoomMenuClose = React.useCallback(() => {
    setDayMenuState({
      open: Array(days.length).fill(false),
      dayToEdit: -1,
    })
    clearSelectedRoomState()
  }, [setDayMenuState, clearSelectedRoomState])

  const onDayMenuSave = React.useCallback(
    (dayToEdit: number) => {
      setRooms(
        rooms.map((room) => {
          for (const srs of selectedRoomsState) {
            if (srs.roomName === room.name) {
              const newSchedule = room.schedule
              room.schedule[dayToEdit].isShowing = srs.status === 'checked'

              return {
                name: room.name,
                jobMeta: room.jobMeta,
                color: room.color,
                schedule: newSchedule,
              }
            }
          }
          return room
        })
      )
      clearSelectedRoomState()
      setRoomMenuClose()
    },
    [
      setRooms,
      rooms,
      clearSelectedRoomState,
      setRoomMenuClose,
      selectedRoomsState,
    ]
  )

  const [jobMenuState, setJobMenuState] = React.useState<JobMenuState>({
    open: false,
    roomIndex: -1,
    dayIndex: -1,
  })

  const [selectedJobsState, setSelectedJobsState] = React.useState<JobMeta[]>(
    []
  )

  const onJobMenuSave = React.useCallback(
    (dayIndex: number, roomIndex: number) => {
      setRooms(
        rooms.map((room, i) => {
          if (roomIndex === i) {
            const newSchedule = room.schedule

            newSchedule[dayIndex].jobs = selectedJobsState.map((j) => {
              return { meta: j, completed: false }
            })

            return { ...room, schedule: newSchedule }
          }

          return room
        })
      )
      setJobMenuState({
        open: false,
        roomIndex: -1,
        dayIndex: -1,
      })
      setSelectedJobsState([])
    },
    [selectedJobsState, setRooms, rooms]
  )

  const [currentDay, setCurrentDay] = React.useState(new Date().getDay())

  console.log('selectedRoomsState', selectedRoomsState)
  return (
    <Provider>
      <Portal>
        <ScrollView style={{ margin: 8, marginBottom: 80 }}>
          <Stepper
            labels={dayNames}
            current={currentDay}
            setCurrent={setCurrentDay}
          />
          <View>
            {rooms.map((room, roomIndex) => (
              <View>
                {!!room.schedule[currentDay].isShowing && (
                  <View>
                    <ContentBox
                      title={room.name}
                      actionBar={
                        <IconButton
                          icon="plus-circle"
                          size={20}
                          onPress={() => {
                            setJobMenuState({
                              open: true,
                              roomIndex,
                              dayIndex: currentDay,
                            })
                          }}
                        />
                      }
                    >
                      <JobsList
                        jobs={room.schedule[currentDay].jobs}
                        color={room.color}
                        roomName={room.name}
                        dayIndex={currentDay}
                      />
                    </ContentBox>
                  </View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>

        <AddJobToScheduleModal
          rooms={rooms}
          jobMenuState={jobMenuState}
          selectedJobsState={selectedJobsState}
          setJobMenuState={setJobMenuState}
          setSelectedJobsState={setSelectedJobsState}
          onJobMenuSave={onJobMenuSave}
        />

        <AddRoomToDayModal
          rooms={rooms}
          dayMenuState={dayMenuState}
          selectedRoomsState={selectedRoomsState}
          setRoomMenuClose={setRoomMenuClose}
          setSelectedRoomsState={setSelectedRoomsState}
          onDayMenuSave={onDayMenuSave}
        />
        <AddButton onPress={() => setDayMenuOpen(true, currentDay)} />
      </Portal>
    </Provider>
  )
}
