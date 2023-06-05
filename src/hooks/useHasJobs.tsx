import React from 'react'
import { useRoomsData } from '../providers/RoomsDataProvider'

export default function useHasJobs() {
  const { rooms } = useRoomsData()

  const hasJobs = React.useMemo(() => {
    for (const room of rooms) {
      for (const day of room.schedule) {
        if (!!day.jobs.length) {
          return true
        }
      }
    }
    return false
  }, [rooms])

  return hasJobs
}
