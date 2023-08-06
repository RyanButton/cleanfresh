import React from 'react'
import TextInputModal from '../../components/TextInputModal'
import { useRoomsData } from '../../providers/RoomsDataProvider'
import { colors } from './index'

type Props = {
  visible: boolean
  onDismiss: () => void
  onSave?: () => void
}

export default function AddRoomModal({ visible, onDismiss, onSave }: Props) {
  const { rooms, addRoom } = useRoomsData()
  const [newRoomName, setNewRoomName] = React.useState('')

  return (
    <TextInputModal
      visible={visible}
      onDismiss={onDismiss}
      label="Add Room"
      value={newRoomName}
      onChangeText={setNewRoomName}
      error={!!newRoomName}
      mode="outlined"
      onSave={() => {
        addRoom(newRoomName, colors[rooms.length])
        setNewRoomName('')
        if (onSave) {
          onSave()
        }
        onDismiss()
      }}
    />
  )
}
