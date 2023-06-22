import React from 'react'
import { useRoomsData } from '../providers/RoomsDataProvider'

export default function useHasJobs(dayIndex: number) {
  const { rooms } = useRoomsData()

  const hasJobs = React.useMemo(() => {
    for (const room of rooms) {
      const day = room.schedule[dayIndex]
      if (!!day.jobs.length) {
        return true
      }
    }
    return false
  }, [dayIndex, rooms])

  return hasJobs
}
