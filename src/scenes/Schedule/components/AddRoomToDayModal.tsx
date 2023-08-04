import { CheckBoxItem } from 'components/JobItem'
import useDays from 'hooks/useDays'
import React from 'react'
import { Button, Modal, Text } from 'react-native-paper'
import { getTheme } from 'react-native-paper/lib/typescript/src/core/theming'
import { ScrollView, View } from 'react-native/types'
import { DayMenuState, SelectedRoomState } from '..'
import styles from '../styles'

type Props = {
  rooms: Room[]
  dayMenuState: DayMenuState
  selectedRoomsState: SelectedRoomState[]
  setRoomMenuClose: () => void
  setSelectedRoomsState: (
    value: React.SetStateAction<SelectedRoomState[]>
  ) => void
  onDayMenuSave: (dayIndex: number) => void
}
export default function AddRoomToDayModal({
  rooms,
  dayMenuState,
  selectedRoomsState,
  setRoomMenuClose,
  setSelectedRoomsState,
  onDayMenuSave,
}: Props) {
  const theme = getTheme()
  const { dayNames } = useDays()

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

  return (
    <Modal
      visible={dayMenuState.open[dayMenuState.dayToEdit]}
      onDismiss={() => setRoomMenuClose()}
      contentContainerStyle={styles.modal}
    >
      <View>
        <Text variant="bodyMedium" style={{ color: theme.colors.onBackground }}>
          {dayNames[dayMenuState.dayToEdit] || ''}
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
  )
}
