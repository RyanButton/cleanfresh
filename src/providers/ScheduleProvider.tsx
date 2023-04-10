import React, { useContext } from "react";
import { PropsWithChildren } from "react";

export interface TScheduleDataContext {
  schedule: Schedule;
  setSchedule: (schedule: Schedule) => void;
}

const ScheduleDataContext = React.createContext<TScheduleDataContext>({
  schedule: {
    mon: [],
    tue: [],
    wed: [],
    thur: [],
    fri: [],
    sat: [],
    sun: [],
  },
  setSchedule: () => {},
});

export const useScheduleData = function useScheduleData() {
  return useContext(ScheduleDataContext);
};

export default function ScheduleDataProvider({ children }: PropsWithChildren) {
  const [schedule, setSchedule] = React.useState<Schedule>({
    mon: [],
    tue: [],
    wed: [],
    thur: [],
    fri: [],
    sat: [],
    sun: [],
  });

  return (
    <ScheduleDataContext.Provider
      value={{
        schedule,
        setSchedule,
      }}
    >
      {children}
    </ScheduleDataContext.Provider>
  );
}
