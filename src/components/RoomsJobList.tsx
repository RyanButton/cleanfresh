import { View } from 'react-native'
import ContentBox from './ContentBox'
import { JobsList } from './JobsList'

export default function RoomsJobList({
  rooms,
  dayIndex,
}: {
  rooms: Room[]
  dayIndex: number
}) {
  return (
    <>
      {rooms.map((room) => (
        <View style={{ width: '100%' }} key={`${room.name}-view`}>
          {!!room.schedule[dayIndex].isShowing &&
            !!room.schedule[dayIndex].jobs.length && (
              <ContentBox title={room.name} key={`${room.name}-box`}>
                <JobsList
                  jobs={room.schedule[dayIndex].jobs}
                  dayIndex={dayIndex}
                  roomName={room.name}
                  color={room.color}
                  key={room.name}
                />
              </ContentBox>
            )}
        </View>
      ))}
    </>
  )
}
