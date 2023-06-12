import React from 'react'
import { useRoomsData } from '../providers/RoomsDataProvider'

export default function useHasJobs(dayIndex: number) {
  const { rooms } = useRoomsData()

  const hasJobs = React.useMemo(() => {
    for (const room of rooms) {
      const day = room.schedule[dayIndex]
      return !!day.jobs.length
    }
  }, [dayIndex, rooms])

  return hasJobs
}
