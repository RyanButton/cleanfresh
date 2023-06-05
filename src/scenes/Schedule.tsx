import { NavigationContainer, Theme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Stepper from '../components/Stepper'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import {
  Button,
  IconButton,
  Modal,
  Portal,
  Provider,
  Text,
  useTheme,
} from 'react-native-paper'
import ContentBox from '../components/ContentBox'
import { CheckBoxItem } from '../components/JobItem'
import { JobsList } from '../components/JobsList'
import { useRoomsData } from '../providers/RoomsDataProvider'
import { darkTheme } from '../theme'

export type RootStackParamList = {
  Schedule: undefined
}
const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RoomsStack() {
  return (
    <NavigationContainer theme={darkTheme as unknown as Theme}>
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
  const theme = useTheme()
  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        checkbox: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        },
        container: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 8,
          padding: 2,
        },
        modal: {
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          backgroundColor: theme.colors.background,
          padding: 20,
          paddingBottom: 20,
          marginLeft: 20,
          marginRight: 20,
          borderRadius: 8,
        },
      }),
    [theme.colors.background]
  )
  const { rooms, setRooms } = useRoomsData()

  const [selectedRoomsState, setSelectedRoomsState] = React.useState<
    {
      roomName: string
      status: 'checked' | 'unchecked' | 'indeterminate'
    }[]
  >(
    rooms.map((room) => {
      return { roomName: room.name, status: 'unchecked' }
    })
  )

  const [dayMenuState, setDayMenuState] = React.useState<{
    open: boolean[]
    dayToEdit: number
  }>({ open: Array(days.length).fill(false), dayToEdit: -1 })

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

  const checkRoom = React.useCallback(
    (roomName: string) => {
      setSelectedRoomsState(
        selectedRoomsState.map((r) => {
          if (r.roomName === roomName) {
            return {
              roomName,
              status: r.status === 'checked' ? 'unchecked' : 'checked',
            }
          }
          return r
        })
      )
    },
    [selectedRoomsState, setSelectedRoomsState]
  )

  const [jobMenuState, setJobMenuState] = React.useState({
    open: false,
    roomIndex: -1,
    dayIndex: -1,
  })

  const [selectedJobsState, setSelectedJobsState] = React.useState<JobMeta[]>(
    []
  )

  const onJobMenuSave = React.useCallback(
    (dayIndex: number, roomIndex: number) => {
      console.log('selectedJobsState', selectedJobsState)
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

  return (
    <Provider>
      <Portal>
        <ScrollView style={{ margin: 8 }}>
          <Stepper
            onChange={() => console.log('changed')}
            labels={[
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ]}
          />
          {days.map((day, dayIndex) => (
            <View>
              <ContentBox title={day[0]}>
                {rooms.map((room, roomIndex) => (
                  <View>
                    {!!room.schedule[dayIndex].isShowing && (
                      <View>
                        <ContentBox title={room.name}>
                          <JobsList
                            jobs={room.schedule[dayIndex].jobs}
                            color={room.color}
                            roomName={room.name}
                          />
                          <IconButton
                            icon="plus-circle"
                            size={20}
                            onPress={() => {
                              setJobMenuState({
                                open: true,
                                roomIndex,
                                dayIndex,
                              })
                            }}
                          />
                        </ContentBox>
                      </View>
                    )}
                  </View>
                ))}
                <IconButton
                  icon="plus-circle"
                  size={20}
                  onPress={() => {
                    setDayMenuOpen(true, dayIndex)
                  }}
                />
              </ContentBox>
            </View>
          ))}
        </ScrollView>

        <Modal
          visible={jobMenuState.open}
          onDismiss={() =>
            setJobMenuState({ open: false, roomIndex: -1, dayIndex: -1 })
          }
          contentContainerStyle={styles.modal}
        >
          <View>
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.onBackground }}
            >
              Jobs
            </Text>
            <ScrollView>
              <View style={{ display: 'flex', gap: 2, paddingTop: 12 }}>
                {rooms[jobMenuState.roomIndex] &&
                  rooms[jobMenuState.roomIndex].jobMeta.length &&
                  rooms[jobMenuState.roomIndex].jobMeta.map((jobMeta) => (
                    <CheckBoxItem
                      status={
                        selectedJobsState.some((j) => j.name === jobMeta.name)
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() =>
                        setSelectedJobsState([...selectedJobsState, jobMeta])
                      }
                      label={jobMeta.name}
                      color="rgba(73, 69, 79, 0.3)"
                    />
                  ))}
              </View>
            </ScrollView>
            <Button
              onPress={() =>
                onJobMenuSave(jobMenuState.dayIndex, jobMenuState.roomIndex)
              }
            >
              Save
            </Button>
          </View>
        </Modal>

        <Modal
          visible={dayMenuState.open[dayMenuState.dayToEdit]}
          onDismiss={() => setRoomMenuClose()}
          contentContainerStyle={styles.modal}
        >
          <View>
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.onBackground }}
            >
              {(days[dayMenuState.dayToEdit] || [''])[0]}
            </Text>
            <ScrollView>
              <View style={{ display: 'flex', gap: 2, paddingTop: 12 }}>
                {!!rooms.length &&
                  rooms.map((room) => (
                    <CheckBoxItem
                      status={
                        selectedRoomsState.find((s) => s.roomName === room.name)
                          ?.status || 'indeterminate'
                      }
                      onPress={() => checkRoom(room.name)}
                      label={room.name}
                      color="rgba(73, 69, 79, 0.3)"
                    />
                  ))}
                {!rooms.length && <Text>No rooms</Text>}
              </View>
            </ScrollView>
            <Button onPress={() => onDayMenuSave(dayMenuState.dayToEdit)}>
              Save
            </Button>
          </View>
        </Modal>
      </Portal>
    </Provider>
  )
}
