import React from 'react'
import TextInputModal from '../../components/TextInputModal'
import { useRoomsData } from '../../providers/RoomsDataProvider'

type Props = {
  visible: boolean
  roomName: string
  onDismiss: () => void
  onSave?: () => void
}

export default function AddJobModal({
  visible,
  roomName,
  onDismiss,
  onSave,
}: Props) {
  const { addJobMetaItem } = useRoomsData()
  const [newJobName, setNewJobName] = React.useState('')

  const saveRoom = React.useCallback(() => {
    addJobMetaItem(roomName, {
      name: newJobName,
    })
    setNewJobName('')
    onDismiss()
  }, [addJobMetaItem, newJobName, onDismiss, roomName])

  return (
    <TextInputModal
      visible={visible}
      onDismiss={onDismiss}
      label="Job"
      value={newJobName}
      onChangeText={setNewJobName}
      error={!!newJobName}
      mode="outlined"
      onSave={() => {
        saveRoom()
        if (onSave) {
          onSave()
        }
      }}
    />
  )
}
