import React, { useContext } from "react";
import { PropsWithChildren } from "react";

export interface TRoomsDataContext {
  rooms: Room[];
  addRoom: (name: string, color: Color) => void;
  editRoom: (name: string, newName: string) => void;
  setRooms: (room: Room[]) => void;
  setJobs: (roomName: string, jobs: Job[]) => void;
  addJob: (roomName: string, job: Job) => void;
  getJobs: (roomName: string) => Job[];
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
  setJobs: () => {},
  addJob: () => {},
  getJobs: () => {
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
      setRooms([...rooms, { name, jobs: [], color }]);
    },
    [setRooms, rooms]
  );

  const editRoom = React.useCallback(
    (name: string, newName: string) => {
      const roomIndex = rooms.findIndex((room) => room.name === name);
      setRooms(
        rooms.map((r, i) => {
          if (i === roomIndex) {
            return { name: newName, jobs: r.jobs, color: r.color };
          }
          return r;
        })
      );
    },
    [setRooms, rooms]
  );

  const setJobs = React.useCallback(
    (name: string, jobs: Job[]) => {
      const roomIndex = rooms.findIndex((room) => room.name === name);
      setRooms(
        rooms.map((r, i) => {
          if (i === roomIndex) {
            return { name: r.name, jobs, color: r.color };
          }
          return r;
        })
      );
    },
    [setRooms, rooms]
  );

  const addJob = React.useCallback(
    (roomName: string, job: Job) => {
      const roomIndex = rooms.findIndex((room) => room.name === roomName);
      setRooms(
        rooms.map((r, i) => {
          if (i === roomIndex) {
            return { name: r.name, jobs: [...r.jobs, job], color: r.color };
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
              jobs: r.jobs.map((j) => {
                if (j.name === jobName) {
                  return { ...j, completed };
                }
                return j;
              }),
              color: r.color,
            };
          }
          return r;
        })
      );
    },
    [setRooms, rooms]
  );

  const getJobs = React.useCallback(
    (roomName: string) => {
      const room = rooms.find((room) => room.name === roomName);
      return room ? room.jobs : [];
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
        setJobs,
        addJob,
        getJobs,
        setJobCompleted,
      }}
    >
      {children}
    </RoomsDataContext.Provider>
  );
}
