import React, { useContext } from "react";
import { PropsWithChildren } from "react";

export interface TRoomsDataContext {
  rooms: Room[];
  addRoom: (name: string, color: Color) => void;
  editRoom: (name: string, newName: string) => void;
  setRooms: (room: Room[]) => void;
  setJobMeta: (roomName: string, jobs: JobMeta[]) => void;
  addJobMetaItem: (roomName: string, job: JobMeta) => void;
  getJobMeta: (roomName: string) => JobMeta[];
  setJobCompleted: (
    roomName: string,
    jobName: string,
    completed: boolean
  ) => void;
}

const RoomsDataContext = React.createContext<TRoomsDataContext>({
  rooms: [],
  addRoom: () => {},
  editRoom: () => {},
  setRooms: () => {},
  setJobMeta: () => {},
  addJobMetaItem: () => {},
  getJobMeta: () => {
    return [];
  },
  setJobCompleted: () => {},
});

export const useRoomsData = function useRoomsData() {
  return useContext(RoomsDataContext);
};

export default function RoomsDataProvider({ children }: PropsWithChildren) {
  const [rooms, setRooms] = React.useState<Room[]>([]);

  const addRoom = React.useCallback(
    (name: string, color: Color) => {
      setRooms([
        ...rooms,
        {
          name,
          jobMeta: [],
          schedule: {
            mon: { isShowing: false, jobs: [] },
            tue: { isShowing: false, jobs: [] },
            wed: { isShowing: false, jobs: [] },
            thur: { isShowing: false, jobs: [] },
            fri: { isShowing: false, jobs: [] },
            sat: { isShowing: false, jobs: [] },
            sun: { isShowing: false, jobs: [] },
          },
          color,
        },
      ]);
    },
    [setRooms, rooms]
  );

  const editRoom = React.useCallback(
    (name: string, newName: string) => {
      const roomIndex = rooms.findIndex((room) => room.name === name);
      setRooms(
        rooms.map((r, i) => {
          if (i === roomIndex) {
            return {
              name: newName,
              jobMeta: r.jobMeta,
              jobs: [],
              color: r.color,
              schedule: r.schedule,
            };
          }
          return r;
        })
      );
    },
    [setRooms, rooms]
  );

  const setJobMeta = React.useCallback(
    (name: string, jobMeta: JobMeta[]) => {
      const roomIndex = rooms.findIndex((room) => room.name === name);
      setRooms(
        rooms.map((r, i) => {
          if (i === roomIndex) {
            return {
              name: r.name,
              jobMeta: jobMeta,
              jobs: [],
              color: r.color,
              schedule: r.schedule,
            };
          }
          return r;
        })
      );
    },
    [setRooms, rooms]
  );

  const addJobMetaItem = React.useCallback(
    (roomName: string, jobMeta: JobMeta) => {
      const roomIndex = rooms.findIndex((room) => room.name === roomName);
      setRooms(
        rooms.map((r, i) => {
          if (i === roomIndex) {
            return {
              name: r.name,
              jobMeta: [...r.jobMeta, jobMeta],
              jobs: [],
              color: r.color,
              schedule: r.schedule,
            };
          }
          return r;
        })
      );
    },
    [setRooms, rooms]
  );

  const setJobCompleted = React.useCallback(
    (roomName: string, jobName: string, completed: boolean) => {
      const roomIndex = rooms.findIndex((room) => room.name === roomName);
      setRooms(
        rooms.map((r, i) => {
          if (i === roomIndex) {
            return {
              name: r.name,
              jobMeta: r.jobMeta.map((j) => {
                if (j.name === jobName) {
                  return { ...j, completed };
                }
                return j;
              }),
              jobs: [],
              color: r.color,
              schedule: r.schedule,
            };
          }
          return r;
        })
      );
    },
    [setRooms, rooms]
  );

  const getJobMeta = React.useCallback(
    (roomName: string) => {
      const room = rooms.find((room) => room.name === roomName);
      return room ? room.jobMeta : [];
    },
    [setRooms]
  );

  return (
    <RoomsDataContext.Provider
      value={{
        rooms,
        addRoom,
        editRoom,
        setRooms,
        setJobMeta,
        addJobMetaItem,
        getJobMeta,
        setJobCompleted,
      }}
    >
      {children}
    </RoomsDataContext.Provider>
  );
}
