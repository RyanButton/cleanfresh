import { View, StyleSheet } from 'react-native'
import { useRoomsData } from '../providers/RoomsDataProvider'
import { JobMetaItem, CheckBoxItem } from './JobItem'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
})

export function JobsList({
  roomName,
  jobs,
  dayIndex,
  color,
}: {
  roomName: string
  jobs: Job[]
  dayIndex: number
  color?: string
}) {
  const { setJobCompleted } = useRoomsData()
  console.log('jobs', jobs)
  return (
    <View style={styles.container}>
      {jobs.map((j) => (
        <CheckBoxItem
          status={j.completed ? 'checked' : 'unchecked'}
          onPress={() =>
            setJobCompleted(roomName, j.meta.name, dayIndex, !j.completed)
          }
          label={j.meta.name}
          color={color}
          key={`${roomName}-${j.meta.name}`}
        />
      ))}
    </View>
  )
}

export function JobMetaList({
  jobs,
  color,
}: {
  roomName: string
  jobs: JobMeta[]
  color?: string
}) {
  return (
    <View style={styles.container}>
      {jobs.map((j) => (
        <JobMetaItem label={j.name} color={color} />
      ))}
    </View>
  )
}
