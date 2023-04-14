interface JobMeta {
  name: string;
}

interface Job {
  meta: JobMeta;
  completed: boolean;
}

interface Room {
  name: string;
  jobMeta: JobMeta[];
  color: Color;
  schedule: Schedule;
}

interface Schedule {
  mon: DaySchedule;
  tue: DaySchedule;
  wed: DaySchedule;
  thur: DaySchedule;
  fri: DaySchedule;
  sat: DaySchedule;
  sun: DaySchedule;
}

interface DaySchedule {
  isShowing: boolean;
  jobs: Job[];
}

interface ScheduleJobList {}

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;
