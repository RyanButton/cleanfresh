import React, { useContext } from 'react'
import { PropsWithChildren } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface TRoomsDataContext {
  rooms: Room[]
  addRoom: (name: string, color: Color) => void
  editRoom: (name: string, newName: string) => void
  deleteRoom: (roomName: string) => void
  setRooms: (room: Room[]) => void
  setJobMeta: (roomName: string, jobs: JobMeta[]) => void
  addJobMetaItem: (roomName: string, job: JobMeta) => void
  getJobMeta: (roomName: string) => JobMeta[]
  setJobCompleted: (
    roomName: string,
    jobName: string,
    dayIndex: number,
    completed: boolean
  ) => void
  getSchedule: (roomName: string, dayIndex: number) => DaySchedule | undefined
}

const RoomsDataContext = React.createContext<TRoomsDataContext>({
  rooms: [],
  addRoom: () => {},
  editRoom: () => {},
  deleteRoom: () => {},
  setRooms: () => {},
  setJobMeta: () => {},
  addJobMetaItem: () => {},
  getJobMeta: () => {
    return []
  },
  setJobCompleted: () => {},
  getSchedule: () => {
    return undefined
  },
})

export const useRoomsData = function useRoomsData() {
  return useContext(RoomsDataContext)
}

const storeObject = async (key: string, obj: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(obj))
  } catch (e) {
    console.log('Error saving object', e)
  }
}

const getObject = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return JSON.parse(value)
    }
  } catch (e) {
    console.log('Error reading object', e)
  }
}

export default function RoomsDataProvider({ children }: PropsWithChildren) {
  const [rooms, setRooms] = React.useState<Room[]>([])
  const loadRooms = React.useCallback(async () => {
    const rooms = await getObject('rooms')
    setRooms(rooms ?? [])
  }, [])

  React.useEffect(() => {
    loadRooms()
  }, [loadRooms])

  const addRoom = React.useCallback(
    (name: string, color: Color) => {
      setRooms([
        ...rooms,
        {
          name: name.trim(),
          jobMeta: [],
          schedule: [
            { isShowing: false, jobs: [] },
            { isShowing: false, jobs: [] },
            { isShowing: false, jobs: [] },
            { isShowing: false, jobs: [] },
            { isShowing: false, jobs: [] },
            { isShowing: false, jobs: [] },
            { isShowing: false, jobs: [] },
          ],
          color,
        },
      ])
      storeObject('rooms', rooms)
    },
    [setRooms, rooms]
  )

  const editRoom = React.useCallback(
    (name: string, newName: string) => {
      const roomIndex = rooms.findIndex((room) => room.name === name)
      setRooms(
        rooms.map((r, i) => {
          if (i === roomIndex) {
            return {
              name: newName,
              jobMeta: r.jobMeta,
              jobs: [],
              color: r.color,
              schedule: r.schedule,
            }
          }
          return r
        })
      )
      storeObject('rooms', rooms)
    },
    [setRooms, rooms]
  )

  const deleteRoom = React.useCallback(
    (roomName: string) => {
      const roomIndex = rooms.findIndex((r) => r.name === roomName)
      if (rooms[roomIndex]) {
        const updatedRooms = rooms.filter((r) => r.name !== roomName)
        setRooms(updatedRooms)
        storeObject('rooms', updatedRooms)
      }
    },
    [rooms]
  )

  const setJobMeta = React.useCallback(
    (name: string, jobMeta: JobMeta[]) => {
      const roomIndex = rooms.findIndex((room) => room.name === name)
      setRooms(
        rooms.map((r, i) => {
          if (i === roomIndex) {
            return {
              name: r.name,
              jobMeta: jobMeta,
              jobs: [],
              color: r.color,
              schedule: r.schedule,
            }
          }
          return r
        })
      )
      storeObject('rooms', rooms)
    },
    [setRooms, rooms]
  )

  const addJobMetaItem = React.useCallback(
    (roomName: string, jobMeta: JobMeta) => {
      const roomIndex = rooms.findIndex((room) => room.name === roomName)
      setRooms(
        rooms.map((r, i) => {
          if (i === roomIndex) {
            return {
              name: r.name,
              jobMeta: [...r.jobMeta, jobMeta],
              jobs: [],
              color: r.color,
              schedule: r.schedule,
            }
          }
          return r
        })
      )
      storeObject('rooms', rooms)
    },
    [setRooms, rooms]
  )

  const setJobCompleted = React.useCallback(
    (
      roomName: string,
      jobName: string,
      dayIndex: number,
      completed: boolean
    ) => {
      const roomIndex = rooms.findIndex((room) => room.name === roomName)
      setRooms(
        rooms.map((r, i) => {
          if (i === roomIndex) {
            const newJobs = r.schedule[dayIndex].jobs.map((j) => {
              if (j.meta.name === jobName) {
                return { ...j, completed }
              }
              return j
            })
            const updatedSchedule = r.schedule
            updatedSchedule[dayIndex].jobs = newJobs
            return {
              name: r.name,
              jobMeta: r.jobMeta,
              color: r.color,
              schedule: updatedSchedule,
            }
          }
          return r
        })
      )
      storeObject('rooms', rooms)
    },
    [setRooms, rooms]
  )

  const getJobMeta = React.useCallback(
    (roomName: string) => {
      const room = rooms.find((room) => room.name === roomName)
      return room ? room.jobMeta : []
    },
    [rooms]
  )

  const getSchedule = React.useCallback(
    (roomName: string, dayIndex: number) => {
      return rooms.find((r) => r.name === roomName)?.schedule[dayIndex]
    },
    [rooms]
  )

  return (
    <RoomsDataContext.Provider
      value={{
        rooms,
        addRoom,
        editRoom,
        deleteRoom,
        setRooms,
        setJobMeta,
        addJobMetaItem,
        getJobMeta,
        setJobCompleted,
        getSchedule,
      }}
    >
      {children}
    </RoomsDataContext.Provider>
  )
}
