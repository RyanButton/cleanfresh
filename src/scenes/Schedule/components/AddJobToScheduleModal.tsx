import React from 'react'
import { CheckBoxItem } from '../../../components/JobItem'
import { Button, Modal, Text, useTheme } from 'react-native-paper'
import { ScrollView, View } from 'react-native'
import { JobMenuState } from '..'
import useStyles from '../useStyles'
import AddJobModal from '../../../scenes/Jobs/AddJobModal'

type Props = {
  rooms: Room[]
  jobMenuState: JobMenuState
  selectedJobsState: JobMeta[]
  setJobMenuState: (value: React.SetStateAction<JobMenuState>) => void
  setSelectedJobsState: (value: React.SetStateAction<JobMeta[]>) => void
  onJobMenuSave: (dayIndex: number, roomIndex: number) => void
}
export default function AddJobToScheduleModal({
  rooms,
  jobMenuState,
  selectedJobsState,
  setJobMenuState,
  setSelectedJobsState,
  onJobMenuSave,
}: Props) {
  const theme = useTheme()
  const styles = useStyles(theme)
  const [addJobModalOpen, setAddJobModalOpen] = React.useState(false)
  const room = React.useMemo(() => {
    return rooms[jobMenuState.roomIndex] ?? undefined
  }, [jobMenuState.roomIndex, rooms])

  if (addJobModalOpen) {
    return (
      <AddJobModal
        visible={addJobModalOpen}
        roomName={room.name}
        onDismiss={() => setAddJobModalOpen(false)}
      />
    )
  }

  return (
    <Modal
      visible={jobMenuState.open}
      onDismiss={() =>
        setJobMenuState({ open: false, roomIndex: -1, dayIndex: -1 })
      }
      contentContainerStyle={styles.modal}
    >
      <View>
        <Text variant="bodyMedium" style={{ color: theme.colors.onBackground }}>
          Jobs
        </Text>
        <ScrollView>
          <View style={{ display: 'flex', gap: 2, paddingTop: 12 }}>
            {!!room &&
              !!room.jobMeta.length &&
              room.jobMeta.map((jobMeta) => (
                <CheckBoxItem
                  status={
                    selectedJobsState.some((j) => j.name === jobMeta.name)
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() =>
                    setSelectedJobsState([...selectedJobsState, jobMeta])
                  }
                  color={room.color}
                  label={jobMeta.name}
                  key={`${jobMeta.name}-${jobMenuState.roomIndex}`}
                />
              ))}
          </View>
        </ScrollView>
        <Button mode="text" onPress={() => setAddJobModalOpen(true)}>
          Add new job
        </Button>
        <Button
          onPress={() =>
            onJobMenuSave(jobMenuState.dayIndex, jobMenuState.roomIndex)
          }
        >
          Save
        </Button>
      </View>
    </Modal>
  )
}
