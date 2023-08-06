import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { ScrollView } from 'react-native'
import { Portal, Provider } from 'react-native-paper'
import { RootStackParamList } from '../Rooms'
import { JobMetaList } from '../../components/JobsList'
import { useRoomsData } from '../../providers/RoomsDataProvider'
import AddButton from '../../components/AddButton'
import AddJobModal from './AddJobModal'

type Props = NativeStackScreenProps<RootStackParamList, 'Jobs'>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Jobs({ navigation, route }: Props) {
  const { rooms } = useRoomsData()
  const [isAddJobModalOpen, setIsAddJobModalOpen] = React.useState(false)
  const roomName = route.params.room.name

  const room = rooms.find((r) => r.name === roomName)
  const jobs = room?.jobMeta
  return (
    <Provider>
      <Portal>
        <ScrollView style={{ margin: 8 }}>
          <JobMetaList
            roomName={roomName}
            jobs={jobs || []}
            color={room?.color}
          />
        </ScrollView>
        <AddButton onPress={() => setIsAddJobModalOpen(true)} />
        <AddJobModal
          visible={isAddJobModalOpen}
          roomName={roomName}
          onDismiss={() => setIsAddJobModalOpen(false)}
        />
      </Portal>
    </Provider>
  )
}
