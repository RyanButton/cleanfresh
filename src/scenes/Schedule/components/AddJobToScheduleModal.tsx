import { CheckBoxItem } from 'components/JobItem'
import { Button, Modal, Text } from 'react-native-paper'
import { getTheme } from 'react-native-paper/lib/typescript/src/core/theming'
import { ScrollView, View } from 'react-native/types'
import { JobMenuState } from '..'
import styles from '../styles'

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
  const theme = getTheme()
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
            {!!rooms[jobMenuState.roomIndex] &&
              !!rooms[jobMenuState.roomIndex].jobMeta.length &&
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
                  key={`${jobMeta.name}-${jobMenuState.roomIndex}`}
                />
              ))}
          </View>
        </ScrollView>
        <Button
          mode="text"
          onPress={() =>
            onJobMenuSave(jobMenuState.dayIndex, jobMenuState.roomIndex)
          }
        >
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
