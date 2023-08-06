import React from 'react'
import { Button, Modal, Text, useTheme } from 'react-native-paper'
import { ScrollView, View } from 'react-native'
import { CheckBoxItem } from '../../../components/JobItem'
import useDays from '../../../hooks/useDays'
import { DayMenuState, SelectedRoomState } from '..'
import useStyles from '../useStyles'
import AddRoomModal from '../../../scenes/Rooms/AddRoomModal'

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
  const theme = useTheme()
  const styles = useStyles(theme)
  const { dayNames } = useDays()
  const [addRoomModalOpen, setAddRoomModalOpen] = React.useState(false)

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

  if (addRoomModalOpen) {
    return (
      <AddRoomModal
        visible={addRoomModalOpen}
        onDismiss={() => setAddRoomModalOpen(false)}
      />
    )
  }

  return (
    <Modal
      visible={dayMenuState.open[dayMenuState.dayToEdit]}
      onDismiss={() => setRoomMenuClose()}
      contentContainerStyle={styles.modal}
    >
      <View>
        <Text variant="bodyMedium">
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
                  key={room.name}
                  color={room.color}
                />
              ))}
            {!rooms.length && <Text>No rooms</Text>}
          </View>
        </ScrollView>
        <Button onPress={() => setAddRoomModalOpen(true)}>Add Room</Button>
        <Button onPress={() => onDayMenuSave(dayMenuState.dayToEdit)}>
          Save
        </Button>
      </View>
    </Modal>
  )
}
